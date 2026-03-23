variable "instanceName" {
  type = string
}

variable "instanceType" {
  type    = string
  default = "e2-standard-2"
}

variable "useSpotInstances" {
  type    = bool
  default = true
}

variable "serverType" {
  type    = string
  default = "PAPER"
}

variable "minecraftVersion" {
  type = string
  default = "LATEST"
}

variable "motd" {
  type    = string
  default = "An ebrouwer.dev Minecraft Server"
}

variable "difficulty" {
  type    = string
  default = "hard"
}

variable "icon" {
  type    = string
  default = ""
}

variable "maxPlayers" {
  type    = number
  default = 20
}

variable "maxWorldSize" {
  type    = number
  default = 20000
}

variable "enableCommandBlock" {
  type    = bool
  default = false
}

variable "hardcore" {
  type    = bool
  default = false
}

variable "viewDistance" {
  type    = number
  default = 16
}

variable "seed" {
  type    = string
  default = ""
}

variable "mode" {
  type    = string
  default = "SURVIVAL"
}

variable "pvp" {
  type    = bool
  default = true
}

variable "levelType" {
  type    = string
  default = "normal"
}

variable "generatorSettings" {
  type    = string
  default = ""
}

variable "serverName" {
  type = string
}

variable "ops" {
  type    = string
  default = ""
}

variable "whitelist" {
  type    = string
  default = ""
}

variable "mods" {
  type = string
  default = ""
}

variable "resourcePackZip" {
  type = string
  default = ""
}

variable "resourcePackSha" {
  type = string
  default = ""
}

variable "datapacksZip" {
  type = string
  default = ""
}

variable "vanillaTweaksSharecode" {
  type = string
  default = ""
}
