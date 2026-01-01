# Outputs for Dev Environment

output "environment" {
  description = "Environment name"
  value       = var.environment
}

output "product_name" {
  description = "Product name"
  value       = var.product_name
}

output "aws_region" {
  description = "AWS region"
  value       = var.aws_region
}

# Add more outputs as resources are created
