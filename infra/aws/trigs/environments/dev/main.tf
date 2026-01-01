# Main Terraform Configuration for Dev Environment

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
  region  = var.aws_region
  profile = "dev-trigs"

  default_tags {
    tags = {
      Environment = var.environment
      Product     = var.product_name
      ManagedBy   = "Terraform"
    }
  }
}

# Future resources will be defined here
# Example: VPC, ECS, RDS, etc.
