module "hc9-server" {
  source = "./modules/minecraft-server"

  databaseName = google_firestore_database.database.name

  instanceName = "hc9-server"
  serverName = "Hermitcraft Season 9"
  subdomain = "hc9"

  serverType = "FABRIC"
  worldZip = "https://storage.googleapis.com/ebrouwer-dev-cdn/minecraft/hc9-world.zip"
  mods = "lithium:ZSNsJrPI,simple-voice-chat:r5GmfR2B,sodium:4OZL6q9h,peek:nRdWc1r4,coord-finder:JMOufqew,carpet:K0Wj117C,audioplayer:AaHt4ziE,fabric-api:YblXfKtI"
  minecraftVersion = "1.20.1"
  resourcePackZip = "https://storage.googleapis.com/ebrouwer-dev-cdn/minecraft/hc9-resources.zip"
  resourcePackSha = "eb17202ea28f673fb590e0ee805ba9de7135ba87"
  seed = "-3609821817241206192"
  genericPack = "https://storage.googleapis.com/ebrouwer-dev-cdn/minecraft/hc9-config.zip"
}

module "kaitlyn-solo-server" {
  source = "./modules/minecraft-server"

  databaseName = google_firestore_database.database.name

  instanceName = "kaitlyn-solo-server"
  serverName = "Kaitlyn Solo"
  subdomain = "ksolo"

  serverType = "VANILLA"
  worldZip = "https://storage.googleapis.com/ebrouwer-dev-cdn/minecraft/kaitlyn-solo.zip"
  minecraftVersion = "1.20.4"
  seed = "-8192088114183889613"
  datapacksZip = "https://storage.googleapis.com/ebrouwer-dev-cdn/minecraft/vanilla-tweaks.zip"
}
