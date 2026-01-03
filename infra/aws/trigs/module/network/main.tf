# # Network Module - VPC and Networking Resources

# # Get availability zones
# data "aws_availability_zones" "available" {
#   state = "available"
# }

# # VPC
# resource "aws_vpc" "main" {
#   cidr_block           = var.vpc_cidr
#   enable_dns_hostnames = var.enable_dns_hostnames
#   enable_dns_support   = var.enable_dns_support

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-vpc"
#     },
#     var.tags
#   )
# }

# # Internet Gateway
# resource "aws_internet_gateway" "main" {
#   vpc_id = aws_vpc.main.id

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-igw"
#     },
#     var.tags
#   )
# }

# # Public Subnets
# resource "aws_subnet" "public" {
#   count = length(var.availability_zones)

#   vpc_id                  = aws_vpc.main.id
#   cidr_block              = var.public_subnet_cidrs[count.index]
#   availability_zone       = var.availability_zones[count.index]
#   map_public_ip_on_launch = true

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-public-${substr(var.availability_zones[count.index], -1, 1)}"
#       Type = "public"
#     },
#     var.tags
#   )
# }

# # Private Subnets
# resource "aws_subnet" "private" {
#   count = length(var.availability_zones)

#   vpc_id            = aws_vpc.main.id
#   cidr_block        = var.private_subnet_cidrs[count.index]
#   availability_zone = var.availability_zones[count.index]

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-private-${substr(var.availability_zones[count.index], -1, 1)}"
#       Type = "private"
#     },
#     var.tags
#   )
# }

# # Elastic IPs for NAT Instances
# resource "aws_eip" "nat" {
#   count = var.enable_nat_gateway ? length(var.availability_zones) : 0

#   domain = "vpc"

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-nat-eip-${substr(var.availability_zones[count.index], -1, 1)}"
#     },
#     var.tags
#   )

#   depends_on = [aws_internet_gateway.main]
# }

# # Get Amazon Linux 2023 AMI for NAT Instance
# data "aws_ami" "amazon_linux" {
#   count = var.enable_nat_gateway ? 1 : 0

#   most_recent = true
#   owners      = ["amazon"]

#   filter {
#     name   = "name"
#     values = ["al2023-ami-*-x86_64"]
#   }

#   filter {
#     name   = "virtualization-type"
#     values = ["hvm"]
#   }
# }

# # Security Group for NAT Instances
# resource "aws_security_group" "nat" {
#   count = var.enable_nat_gateway ? 1 : 0

#   name        = "${var.environment}-${var.product_name}-network-nat-sg"
#   description = "Security group for NAT instances"
#   vpc_id      = aws_vpc.main.id

#   ingress {
#     description = "Allow all traffic from private subnets"
#     from_port   = 0
#     to_port     = 65535
#     protocol    = "-1"
#     cidr_blocks = [var.vpc_cidr]
#   }

#   egress {
#     description = "Allow all outbound traffic"
#     from_port   = 0
#     to_port     = 65535
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-nat-sg"
#     },
#     var.tags
#   )
# }

# # NAT Instances
# resource "aws_instance" "nat" {
#   count = var.enable_nat_gateway ? length(var.availability_zones) : 0

#   ami                         = data.aws_ami.amazon_linux[0].id
#   instance_type               = "t3.nano"
#   subnet_id                   = aws_subnet.public[count.index].id
#   vpc_security_group_ids      = [aws_security_group.nat[0].id]
#   associate_public_ip_address = true
#   source_dest_check           = false

#   user_data = <<-EOF
#     #!/bin/bash
#     # Enable IP forwarding
#     echo 'net.ipv4.ip_forward = 1' >> /etc/sysctl.conf
#     sysctl -p

#     # Install iptables if not present
#     dnf install -y iptables iptables-services

#     # Configure iptables for NAT
#     iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
#     iptables-save > /etc/sysconfig/iptables

#     # Enable and start iptables service
#     systemctl enable iptables
#     systemctl start iptables
#   EOF

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-nat-${substr(var.availability_zones[count.index], -1, 1)}"
#     },
#     var.tags
#   )

#   depends_on = [aws_internet_gateway.main]
# }

# # Associate Elastic IP with NAT Instances
# resource "aws_eip_association" "nat" {
#   count = var.enable_nat_gateway ? length(var.availability_zones) : 0

#   instance_id   = aws_instance.nat[count.index].id
#   allocation_id = aws_eip.nat[count.index].id
# }

# # Route Table for Public Subnets
# resource "aws_route_table" "public" {
#   vpc_id = aws_vpc.main.id

#   route {
#     cidr_block = "0.0.0.0/0"
#     gateway_id = aws_internet_gateway.main.id
#   }

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-public-rt"
#     },
#     var.tags
#   )
# }

# # Route Table Associations for Public Subnets
# resource "aws_route_table_association" "public" {
#   count = length(var.availability_zones)

#   subnet_id      = aws_subnet.public[count.index].id
#   route_table_id = aws_route_table.public.id
# }

# # Route Tables for Private Subnets
# resource "aws_route_table" "private" {
#   count = var.enable_nat_gateway ? length(var.availability_zones) : 0

#   vpc_id = aws_vpc.main.id

#   route {
#     cidr_block           = "0.0.0.0/0"
#     network_interface_id = aws_instance.nat[count.index].primary_network_interface_id
#   }

#   tags = merge(
#     {
#       Name = "${var.environment}-${var.product_name}-network-private-rt-${substr(var.availability_zones[count.index], -1, 1)}"
#     },
#     var.tags
#   )
# }

# # Route Table Associations for Private Subnets
# resource "aws_route_table_association" "private" {
#   count = length(var.availability_zones)

#   subnet_id      = aws_subnet.private[count.index].id
#   route_table_id = var.enable_nat_gateway ? aws_route_table.private[count.index].id : aws_route_table.public.id
# }
