locals {
  minecraft_image        = "itzg/minecraft-server:latest"
  minecraft_port         = 25565
  simple_voice_chat_port = 24454
}

module "container" {
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
        name  = "TYPE",
        value = var.serverType
      },
      {
        name  = "WORLD",
        value = var.worldZip
      },
      {
        name  = "MODRINTH_PROJECTS",
        value = var.mods
      },
      {
        name  = "VERSION",
        value = var.minecraftVersion
      },
      {
        name  = "MEMORY",
        value = ""
      },
      {
        name  = "JVM_XX_OPTS",
        value = "-XX:MaxRAMPercentage=75"
      },
      {
        name  = "ENABLE_ROLLING_LOGS",
        value = "true"
      },
      {
        name  = "TZ",
        value = "America/Denver"
      },
      {
        name  = "RESOURCE_PACK",
        value = var.resourcePackZip
      },
      {
        name  = "RESOURCE_PACK_SHA1",
        value = var.resourcePackSha
      },
      {
        name  = "MOTD",
        value = "A Block Paper Scissors Server"
      },
      {
        name  = "DIFFICULTY",
        value = "hard"
      },
      {
        name  = "WHITELIST",
        value = "IAmAlpaca,DeSpook"
      },
      {
        name  = "EXISTING_WHITELIST_FILE",
        value = "SYNCHRONIZE"
      },
      {
        name  = "ENFORCE_WHITELIST",
        value = "true"
      },
      {
        name  = "OPS",
        value = "IAmAlpaca"
      },
      {
        name  = "ALLOW_NETHER",
        value = "true"
      },
      {
        name  = "ANNOUNCE_PLAYER_ACHIEVEMENTS",
        value = "true"
      },
      {
        name  = "GENERATE_STRUCTURES",
        value = "true"
      },
      {
        name  = "SPAWN_ANIMALS",
        value = "true"
      },
      {
        name  = "SPAWN_MONSTERS",
        value = "true"
      },
      {
        name  = "SPAWN_NPCS",
        value = "true"
      },
      {
        name  = "VIEW_DISTANCE",
        value = "16"
      },
      {
        name  = "SEED",
        value = var.seed
      },
      {
        name  = "SERVER_NAME",
        value = var.serverName
      },
      {
        name  = "GENERIC_PACK",
        value = var.genericPackZip
      },
      {
        name  = "DATAPACKS"
        value = var.datapacksZip
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

resource "google_firestore_document" "server" {
  database    = var.databaseName
  document_id = var.instanceName
  collection  = "game-server"

  fields = jsonencode({
    game = {
      stringValue = "Minecraft"
    }
    name = {
      stringValue = var.serverName
    }
    subdomain = {
      stringValue = var.subdomain
    }
    instanceName = {
      stringValue = google_compute_instance.vm.name
    }
  })
}

resource "google_compute_disk" "pd" {
  name = "${var.instanceName}-data-disk"
  type = "pd-ssd"
  size = 10
}

resource "google_compute_instance" "vm" {
  name = var.instanceName

  # 4 vCPUs, 16 GB memory - https://cloud.google.com/compute/all-pricing#n2d_machine_types
  machine_type = "n2d-standard-4"

  scheduling {
    preemptible                 = true
    automatic_restart           = false
    provisioning_model          = "SPOT"
    instance_termination_action = "STOP"
  }

  boot_disk {
    initialize_params {
      image = module.container.source_image
    }
  }

  attached_disk {
    source      = google_compute_disk.pd.self_link
    device_name = "data-disk-0"
    mode        = "READ_WRITE"
  }

  network_interface {
    network = "default"
    access_config {
      network_tier = "STANDARD"
    }
  }

  metadata = { "gce-container-declaration" = module.container.metadata_value }

  labels = {
    container-vm = module.container.vm_container_label
  }

  tags = [var.instanceName]
}

resource "google_compute_firewall" "http-access" {
  name    = "${var.instanceName}-http"
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
  target_tags   = [var.instanceName]
}