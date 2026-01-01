# Variables for Dev Environment

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "product_name" {
  description = "Product name (used in resource naming)"
  type        = string
  default     = "trigs"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

# Add more variables as needed for your infrastructure
