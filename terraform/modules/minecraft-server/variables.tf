variable "instanceName" {
  type = string
}

variable "serverName" {
  type = string
}

variable "subdomain" {
  type = string
}

variable "databaseName" {
  type = string
}

variable "serverType" {
  type = string
  default = "VANILLA"
}

variable "worldZip" {
  type = string
  default = ""
}

variable "mods" {
  type = string
  default = ""
}

variable "minecraftVersion" {
  type = string
  default = "LATEST"
}

variable "resourcePackZip" {
  type = string
  default = ""
}

variable "resourcePackSha" {
  type = string
  default = ""
}

variable "seed" {
  type = string
  default = ""
}

variable "genericPackZip" {
  type = string
  default = ""
}

variable "datapacksZip" {
  type = string
  default = ""
}
