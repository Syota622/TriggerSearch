terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# AWS Provider Configuration
provider "aws" {
  region  = local.aws_region
  profile = "dev-trigs"

  default_tags {
    tags = {
      Environment = local.env
      Product     = local.pj
      ManagedBy   = "Terraform"
    }
  }
}