# Variables for Network Module

variable "env" {
  description = "Environment name (dev/stg/qa/prod)"
  type        = string
}

variable "product" {
  description = "Product name (used in resource naming)"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnets" {
  description = "サブネット設定のマップ。キーはサブネット名、値は CIDR、AZ、public フラグを含むオブジェクトです"
  type = map(object({
    cidr   = string # サブネットのCIDRブロック（例: "10.0.1.0/24"）
    az     = string # 可用性ゾーン（例: "ap-northeast-1a"）
    public = bool   # Public サブネットの場合は true、Private の場合は false
  }))
  default = {
    public-1a = {
      cidr   = "10.0.1.0/24"
      az     = "ap-northeast-1a"
      public = true
    }
    public-1c = {
      cidr   = "10.0.2.0/24"
      az     = "ap-northeast-1c"
      public = true
    }
    public-1d = {
      cidr   = "10.0.3.0/24"
      az     = "ap-northeast-1d"
      public = true
    }
    private-1a = {
      cidr   = "10.0.11.0/24"
      az     = "ap-northeast-1a"
      public = false
    }
    private-1c = {
      cidr   = "10.0.12.0/24"
      az     = "ap-northeast-1c"
      public = false
    }
    private-1d = {
      cidr   = "10.0.13.0/24"
      az     = "ap-northeast-1d"
      public = false
    }
  }
}

variable "tags" {
  description = "Additional tags to apply to resources"
  type        = map(string)
  default     = {}
}
