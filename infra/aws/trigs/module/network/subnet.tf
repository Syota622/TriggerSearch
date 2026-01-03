# Public Subnets
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = merge(
    {
      Name = "${var.env}-${var.pj}-public-${substr(var.availability_zones[count.index], -1, 1)}"
      Type = "public"
    },
    var.tags
  )
}

# Private Subnets
resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = merge(
    {
      Name = "${var.env}-${var.pj}-private-${substr(var.availability_zones[count.index], -1, 1)}"
      Type = "private"
    },
    var.tags
  )
}