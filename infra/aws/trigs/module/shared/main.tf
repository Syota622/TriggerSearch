# Shared Module - Orchestrates network and other service modules

# Network Module
module "network" {
  source = "../network"
  pj     = var.pj
  env    = var.env
}
