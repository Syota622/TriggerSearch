# TriggerSearch（trigs）ER図（更新版）

## ER図

```mermaid
erDiagram
    users ||--o{ daily_records : "1人が複数の記録を持つ"
    users ||--|| user_settings : "1人に1つの設定"
    weather_types ||--o{ daily_records : "天気を参照"
    daily_records ||--o{ record_foods : "1つの記録に複数の食品"
    foods ||--o{ record_foods : "食品を参照"
    
    users {
        int id PK
        varchar name
        varchar email
        timestamp created_at
    }
    
    daily_records {
        int id PK
        int user_id FK
        date record_date
        boolean has_headache
        boolean has_allergy
        decimal sleep_hours
        int weather_id FK
        text memo
        timestamp created_at
        timestamp updated_at
    }
    
    record_foods {
        int id PK
        int record_id FK
        int food_id FK
    }
    
    foods {
        int id PK
        varchar name
        varchar icon
        varchar category
    }
    
    weather_types {
        int id PK
        varchar name
        varchar icon
    }
    
    symptoms {
        int id PK
        varchar name
        varchar icon
    }
    
    user_settings {
        int id PK
        int user_id FK
        boolean notify_enabled
        time notify_time
        timestamp updated_at
    }
```

---

## テーブル関連図（シンプル版）

```mermaid
flowchart LR
    subgraph ユーザー関連
        A[users]
        B[user_settings]
    end
    
    subgraph 記録関連
        C[daily_records]
        D[record_foods]
    end
    
    subgraph マスタ
        E[foods]
        F[weather_types]
        G[symptoms]
    end
    
    A -->|1:1| B
    A -->|1:N| C
    C -->|1:N| D
    D -->|N:1| E
    C -->|N:1| F
```

---

## 食品マスタ（foods）初期データ

| id | name | icon | category |
|----|------|------|----------|
| 1 | パン・小麦 | 🍞 | 穀物 |
| 2 | 乳製品 | 🥛 | 乳製品 |
| 3 | 卵 | 🥚 | 卵 |
| 4 | 肉 | 🍖 | 肉類 |
| 5 | 魚 | 🐟 | 魚介類 |
| 6 | ごはん | 🍚 | 穀物 |
| 7 | 麺類 | 🍜 | 穀物 |
| 8 | 野菜 | 🥬 | 野菜 |
| 9 | 果物 | 🍎 | 果物 |
| 10 | お菓子 | 🍰 | 菓子 |
| 11 | コーヒー | ☕ | 飲料 |
| 12 | お酒 | 🍺 | 飲料 |

---

## 天気マスタ（weather_types）初期データ

| id | name | icon |
|----|------|------|
| 1 | 晴れ | ☀️ |
| 2 | 曇り | ☁️ |
| 3 | 雨 | 🌧️ |
| 4 | 雪 | ❄️ |

---

## 症状マスタ（symptoms）初期データ

| id | name | icon |
|----|------|------|
| 1 | 頭痛 | 🤕 |
| 2 | アレルギー | 🤧 |

---

## ユーザー設定（user_settings）デフォルト値

| カラム | デフォルト値 |
|--------|-------------|
| notify_enabled | true |
| notify_time | 21:00 |