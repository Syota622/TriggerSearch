# Subnets (Public and Private)
resource "aws_subnet" "main" {
  for_each = var.subnets

  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az

  # Public サブネットの場合のみ自動割り当て IP を有効化
  map_public_ip_on_launch = each.value.public

  tags = merge(
    {
      Name = "${var.env}-${var.product}-${each.key}"
      Type = each.value.public ? "public" : "private"
    },
    var.tags
  )
}