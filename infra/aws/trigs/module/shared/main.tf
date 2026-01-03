# Shared Module - Orchestrates network and other service modules

# Network Module
module "network" {
  source = "../network"
  product     = var.product
  env    = var.env
}
