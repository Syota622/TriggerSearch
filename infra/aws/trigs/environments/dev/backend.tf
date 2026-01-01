# Terraform Backend Configuration for Dev Environment
# S3バケットにTerraformの状態ファイルを保存

terraform {
  backend "s3" {
    bucket         = "common-trigs-785772044528-tfstate"
    key            = "dev/terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    profile        = "dev-trigs"
  }
}
