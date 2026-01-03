# module call
module "shared" {
  source = "../../module/shared"
  env  = local.env
  pj = local.pj
}
