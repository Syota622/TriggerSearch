## データベース設計

### テーブル一覧

```
users           - ユーザー情報
daily_records   - 毎日の記録（メイン）
symptoms        - 症状マスタ
foods           - 食品マスタ
weather_types   - 天気マスタ
```

### テーブル詳細

#### users（ユーザー）
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | INT | 主キー |
| name | VARCHAR(100) | ユーザー名 |
| email | VARCHAR(255) | メールアドレス |
| created_at | TIMESTAMP | 登録日時 |

#### daily_records（毎日の記録）
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | INT | 主キー |
| user_id | INT | ユーザーID（外部キー） |
| record_date | DATE | 記録日 |
| has_headache | BOOLEAN | 頭痛あり？ |
| has_allergy | BOOLEAN | アレルギーあり？ |
| sleep_hours | DECIMAL(3,1) | 睡眠時間（例: 7.5） |
| weather_id | INT | 天気ID（外部キー） |
| breakfast | VARCHAR(500) | 朝食の内容 |
| lunch | VARCHAR(500) | 昼食の内容 |
| dinner | VARCHAR(500) | 夕食の内容 |
| memo | TEXT | メモ（任意） |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |

#### symptoms（症状マスタ）
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | INT | 主キー |
| name | VARCHAR(50) | 症状名（頭痛、アレルギー等） |

#### foods（食品マスタ）
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | INT | 主キー |
| name | VARCHAR(100) | 食品名 |
| category | VARCHAR(50) | カテゴリ（乳製品、小麦等） |

#### weather_types（天気マスタ）
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | INT | 主キー |
| name | VARCHAR(20) | 天気名 |

```
初期データ:
1: 晴れ
2: 曇り
3: 雨
4: 雪
```

## ER図

```
┌─────────────┐       ┌─────────────────┐
│   users     │       │  daily_records  │
├─────────────┤       ├─────────────────┤
│ id (PK)     │──┐    │ id (PK)         │
│ name        │  │    │ user_id (FK)    │←─┐
│ email       │  └───→│ record_date     │  │
│ created_at  │       │ has_headache    │  │
└─────────────┘       │ has_allergy     │  │
                      │ sleep_hours     │  │
┌─────────────┐       │ weather_id (FK) │←─┼─┐
│weather_types│       │ breakfast       │  │ │
├─────────────┤       │ lunch           │  │ │
│ id (PK)     │───────│ dinner          │  │ │
│ name        │       │ memo            │  │ │
└─────────────┘       │ created_at      │  │ │
                      │ updated_at      │  │ │
┌─────────────┐       └─────────────────┘  │ │
│   foods     │                            │ │
├─────────────┤                            │ │
│ id (PK)     │                            │ │
│ name        │                            │ │
│ category    │                            │ │
└─────────────┘                            │ │
                                           │ │
┌─────────────┐                            │ │
│  symptoms   │                            │ │
├─────────────┤                            │ │
│ id (PK)     │                            │ │
│ name        │                            │ │
└─────────────┘                            │ │
```