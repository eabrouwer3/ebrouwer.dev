provider "google" {}

locals {
  minecraft_image = "itzg/minecraft-server:latest"
  minecraft_port = 25565
  simple_voice_chat_port = 24454
  hc9_instance_name   = "hc9-server"
}

module "hc9-container" {
  source  = "terraform-google-modules/container-vm/google"
  version = "~> 3.0"

  container = {
    image = local.minecraft_image

    env = [
      {
        name  = "EULA",
        value = "TRUE"
      },
      {
        name = "TYPE",
        value = "FABRIC"
      },
      {
        name = "WORLD",
        value = "https://storage.googleapis.com/ebrouwer-dev-cdn/minecraft/hc9-world.zip"
      },
      {
        name = "MODRINTH_PROJECTS",
        # Gonna see if I can get away with just listing the slugs and see if it gets the right versions
        # value = "lithium:ZSNsJrPI,simple-voice-chat:r5GmfR2B,sodium:4OZL6q9h,peek:nRdWc1r4,coord-finder:JMOufqew,carpet:K0Wj117C,audioplayer:AaHt4ziE,fabric-api:YblXfKtI"
        value = "lithium,simple-voice-chat,sodium,peek,coord-finder,carpet,audioplayer,fabric-api"
      },
      {
        name = "VERSION",
        value = "1.20.1"
      },
      {
        name = "MEMORY",
        value = ""
      },
      {
        name = "JVM_XX_OPTS",
        value = "-XX:MaxRAMPercentage=75"
      },
      {
        name = "ENABLE_ROLLING_LOGS",
        value = "true"
      },
      {
        name = "TZ",
        value = "America/Denver"
      },
      {
        name = "RESOURCE_PACK",
        value = "https://storage.googleapis.com/ebrouwer-dev-cdn/minecraft/hc9-resources.zip"
      },
      {
        name = "RESOURCE_PACK_SHA1",
        value = "eb17202ea28f673fb590e0ee805ba9de7135ba87"
      },
      {
        name = "MOTD",
        value = "A Block Paper Scissors Server"
      },
      {
        name = "DIFFICULTY",
        value = "hard"
      },
      {
        name = "WHITELIST",
        value = "IAmAlpaca,DeSpook"
      },
      {
        name = "EXISTING_WHITELIST_FILE",
        value = "SYNCHRONIZE"
      },
      {
        name = "ENFORCE_WHITELIST",
        value = "true"
      },
      {
        name = "OPS",
        value = "IAmAlpaca"
      },
      {
        name = "ALLOW_NETHER",
        value = "true"
      },
      {
        name = "ANNOUNCE_PLAYER_ACHIEVEMENTS",
        value = "true"
      },
      {
        name = "GENERATE_STRUCTURES",
        value = "true"
      },
      {
        name = "SPAWN_ANIMALS",
        value = "true"
      },
      {
        name = "SPAWN_MONSTERS",
        value = "true"
      },
      {
        name = "SPAWN_NPCS",
        value = "true"
      },
      {
        name = "VIEW_DISTANCE",
        value = "16"
      },
      {
        name = "SEED",
        value = "-3609821817241206192"
      },
      {
        name = "SERVER_NAME",
        value = "HC9 Server"
      },
      {
        name = "GENERIC_PACK",
        value = "https://storage.googleapis.com/ebrouwer-dev-cdn/minecraft/hc9-config.zip"
      }
    ]

    # Declare volumes to be mounted
    # This is similar to how Docker volumes are mounted
    volumeMounts = [
      {
        mountPath = "/data"
        name      = "data-disk-0"
        readOnly  = false
      },
    ]
  }

  # Declare the volumes
  volumes = [
    {
      name = "data-disk-0"

      gcePersistentDisk = {
        pdName = "data-disk-0"
        fsType = "ext4"
      }
    },
  ]
}

resource "google_compute_disk" "hc9-pd" {
  name    = "${local.hc9_instance_name}-data-disk"
  type    = "pd-ssd"
  size    = 10
}

resource "google_service_account" "default" {
  account_id   = "vm-sa"
  display_name = "Custom SA for VM Instance"
}

resource "google_compute_instance" "hc9-vm" {
  name         = local.hc9_instance_name

  # 4 vCPUs, 16 GB memory - https://cloud.google.com/compute/all-pricing#n2d_machine_types
  machine_type = "n2d-standard-4"

  scheduling {
    preemptible = true
    automatic_restart = false
    provisioning_model = "SPOT"
  }

  boot_disk {
    initialize_params {
      image = module.hc9-container.source_image
    }
  }

  attached_disk {
    source      = google_compute_disk.hc9-pd.self_link
    device_name = "data-disk-0"
    mode        = "READ_WRITE"
  }

  network_interface {
    network = "default"
    access_config {
      network_tier = "STANDARD"
    }
  }

  metadata = { "gce-container-declaration" = module.hc9-container.metadata_value }

  labels = {
    container-vm = module.hc9-container.vm_container_label
  }

  tags = ["hc9-instance"]

  service_account {
    email = google_service_account.default.email
    scopes = ["cloud-platform"]
  }
}

resource "google_compute_firewall" "hc9-http-access" {
  name    = "${local.hc9_instance_name}-http"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = [local.minecraft_port]
  }

  allow {
    protocol = "udp"
    ports    = [local.simple_voice_chat_port]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["hc9-instance"]
}