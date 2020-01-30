terraform {
  required_version = ">= 0.12"
}

terraform {
  backend "s3" {}
}

provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_s3_bucket" "config" {
  bucket = "${var.bucket}"
  acl    = "private"

  tags = {
    Billing = "${var.project}"
    Project = "${var.project}"
    Application = "${var.app}"
    Name = "${var.app}-bucket"
  }
}
