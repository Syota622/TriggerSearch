# 変数名
{product}: trigs

## 命名規則の基本形

```
{env}-{product}-{role}-{usage}
```

- ケバブケース（kebab-case）を使用
- 小文字のみ
- AWSサービス名は含めない

---

## 1つ目：dev環境用のECSサービス名（モバイルアプリのバックエンド）

S3バケットの命名規則 `{env}-{product}-{usage}` に倣い、ECSサービスの規則 `{env}-{product}-{role}-{usage}` を適用すると：

```
dev-trigs-api-mobile-backend
```

**構成要素：**
| 要素 | 値 | 説明 |
|------|-----|------|
| env | dev | 開発環境 |
| product | trigs | 製品名・システム名 |
| role | api | Web APIを提供する役割 |
| usage | mobile-backend | モバイルアプリのバックエンド |

その他の例：
- `dev-trigs-api-auth`（認証API）
- `dev-trigs-web-frontend`（フロントエンド）

---

## 2つ目：S3用のTerraform Backend

S3バケットの命名規則 `{env}-{product}-{usage}` を適用：

```
dev-trigs-tfstate
```

または環境横断で使う場合：

```
common-trigs-tfstate
```

**構成要素：**
| 要素 | 値 | 説明 |
|------|-----|------|
| env | dev または common | 環境識別子 |
| product | trigs | 製品名・システム名 |
| usage | tfstate | Terraformの状態管理用途 |

