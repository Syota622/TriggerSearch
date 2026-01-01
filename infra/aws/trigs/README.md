# TriggerSearch Infrastructure (Terraform)

このディレクトリには、TriggerSearchプロジェクトのAWSインフラストラクチャをTerraformで管理するための設定ファイルが含まれています。

## ディレクトリ構成

```
infra/trigs/
├── README.md
├── .gitignore
└── environments/
    ├── dev/      # 開発環境
    ├── stg/      # ステージング環境
    ├── qa/       # QA環境
    └── prod/     # 本番環境
```

各環境ディレクトリには以下のファイルがあります:
- `backend.tf` - Terraformの状態ファイルを保存するS3バックエンドの設定
- `main.tf` - メインのTerraform設定（プロバイダー、リソース定義）
- `variables.tf` - 変数定義
- `outputs.tf` - 出力定義
- `terraform.tfvars` - 環境固有の変数値（.gitignoreで除外）

## 前提条件

### 1. Terraformのインストール

```bash
# macOS (Homebrew)
brew install terraform

# バージョン確認
terraform version
```

必要なバージョン: >= 1.5.0

### 2. AWS認証情報の設定

```bash
# AWS CLIで認証情報を設定
aws configure

# または環境変数を設定
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="ap-northeast-1"
```

### 3. S3バケットとDynamoDBテーブルの準備

Terraformの状態ファイル管理用に、以下が必要です:
- S3バケット: `common-trigs-mgmt-tfstate`
- DynamoDBテーブル: `common-trigs-mgmt-tfstate-lock`

DynamoDBテーブルの作成（初回のみ）:
```bash
aws dynamodb create-table \
  --table-name common-trigs-mgmt-tfstate-lock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-northeast-1
```

## 使い方

### 初期化（初回のみ、または設定変更時）

```bash
# 環境ディレクトリに移動
cd infra/trigs/environments/dev

# Terraformを初期化
terraform init
```

### 環境の切り替え

各環境は独立したディレクトリで管理されています。使用したい環境のディレクトリに移動してください。

```bash
# Dev環境
cd infra/trigs/environments/dev

# Staging環境
cd infra/trigs/environments/stg

# QA環境
cd infra/trigs/environments/qa

# Production環境
cd infra/trigs/environments/prod
```

### 基本的なTerraformコマンド

```bash
# 1. フォーマットチェック
terraform fmt -check

# 2. フォーマット適用
terraform fmt

# 3. 構文チェック
terraform validate

# 4. 実行計画の確認（何が作成/変更/削除されるか）
terraform plan

# 5. 実行計画を保存
terraform plan -out=tfplan

# 6. 変更を適用
terraform apply

# または保存した実行計画を適用
terraform apply tfplan

# 7. リソース一覧
terraform state list

# 8. 特定のリソースの詳細表示
terraform state show <resource_name>

# 9. 出力の表示
terraform output

# 10. リソースの削除（注意！）
terraform destroy
```

### 開発ワークフロー

1. **環境の選択**
   ```bash
   cd infra/trigs/environments/dev
   ```

2. **初期化（初回のみ）**
   ```bash
   terraform init
   ```

3. **変更の計画**
   ```bash
   terraform plan
   ```

4. **変更の適用**
   ```bash
   terraform apply
   ```

5. **確認**
   ```bash
   terraform output
   ```

## 命名規則

このプロジェクトでは、以下の命名規則を使用しています（詳細は `document/infra/name.md` を参照）:

```
{env}-{product}-{role}-{usage}
```

例:
- ECSサービス: `dev-trigs-api-mobile-backend`
- S3バケット: `dev-trigs-tfstate`

## 環境変数

各環境で以下の変数を設定できます（`terraform.tfvars`）:

- `environment` - 環境名（dev/stg/qa/prod）
- `product_name` - プロダクト名（trigs）
- `aws_region` - AWSリージョン（デフォルト: ap-northeast-1）

## トラブルシューティング

### `terraform init` が失敗する

- AWS認証情報が正しく設定されているか確認
- S3バケット `common-trigs-mgmt-tfstate` が存在するか確認
- DynamoDBテーブル `common-trigs-mgmt-tfstate-lock` が存在するか確認

### ロックエラーが発生する

別のプロセスがTerraformを実行中の可能性があります。

```bash
# ロック解除（注意: 他のプロセスが実行中でないことを確認してから）
terraform force-unlock <LOCK_ID>
```

### 状態ファイルの確認

```bash
# S3に保存されている状態ファイルの確認
aws s3 ls s3://common-trigs-mgmt-tfstate/

# 特定の環境の状態ファイル
aws s3 cp s3://common-trigs-mgmt-tfstate/dev/terraform.tfstate - | jq .
```

## 次のステップ

現在、各環境は基本的な設定のみです。以下のリソースを追加していく予定です:

1. VPC とネットワーク設定
2. ECS クラスターとサービス
3. RDS（PostgreSQL）
4. Application Load Balancer
5. セキュリティグループ
6. IAM ロールとポリシー
7. CloudWatch ログ
8. その他必要なリソース

## 参考資料

- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [TriggerSearch Design Documents](../../document/)
