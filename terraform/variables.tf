variable "project" {
  description = "Project in which the app is in. Should be defined in ENV variable"
}

variable "aws_region" {
  description = "Region AWS"
  default     = "us-east-1"
}

variable "app" {
  description = "App name. Should be the same as the project repository name"
}

variable "bucket" {
  description = "Bucket for the project"
}
