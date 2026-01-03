# module call
module "shared" {
  source = "../../module/shared"
  env  = local.env
  product = local.product
}
