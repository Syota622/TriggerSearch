# TriggerSearch（trigs）REST API設計（v3）

---

## エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | /api/users | ユーザー登録 |
| GET | /api/users/{id} | ユーザー情報取得 |
| POST | /api/records | 毎日の記録を登録 |
| GET | /api/records/{user_id} | 記録一覧取得 |
| GET | /api/records/{user_id}/{date} | 特定日の記録取得 |
| PUT | /api/records/{id} | 記録を更新 |
| DELETE | /api/records/{id} | 記録を削除 |
| GET | /api/records/{user_id}/calendar/{year}/{month} | 月別カレンダーデータ取得 |
| GET | /api/analysis/{user_id} | トリガー分析結果取得 |
| GET | /api/weather | 天気一覧取得 |
| GET | /api/temperatures | 気温一覧取得 |
| GET | /api/foods | 食品一覧取得 |
| GET | /api/settings/{user_id} | ユーザー設定取得 |
| PUT | /api/settings/{user_id} | ユーザー設定更新 |
| GET | /api/custom-items/{user_id} | カスタム項目一覧取得 |
| POST | /api/custom-items/{user_id} | カスタム項目追加 |
| DELETE | /api/custom-items/{user_id}/{item_id} | カスタム項目削除 |

---

## API詳細

### POST /api/users（ユーザー登録）

**リクエスト**
```json
{
  "name": "田中太郎",
  "email": "tanaka@example.com"
}
```

**レスポンス（成功）**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "田中太郎",
    "email": "tanaka@example.com",
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

---

### POST /api/records（毎日の記録を登録）

**リクエスト**
```json
{
  "user_id": 1,
  "record_date": "2025-01-15",
  "has_headache": true,
  "has_allergy": false,
  "sleep_hours": 6.5,
  "weather_id": "rainy",
  "temperature_id": "cold",
  "food_ids": ["bread", "milk", "coffee"],
  "memo": ""
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| user_id | INT | ユーザーID |
| record_date | DATE | 記録日（YYYY-MM-DD） |
| has_headache | BOOLEAN | 頭痛あり？ |
| has_allergy | BOOLEAN | アレルギーあり？ |
| sleep_hours | DECIMAL | 睡眠時間（0〜12） |
| weather_id | STRING | 天気ID |
| temperature_id | STRING | 気温ID |
| food_ids | STRING[] | 食品IDの配列 |
| memo | TEXT | メモ（任意） |

**レスポンス（成功）**
```json
{
  "status": "success",
  "data": {
    "id": 123,
    "record_date": "2025-01-15",
    "message": "記録しました"
  }
}
```

---

### GET /api/records/{user_id}/{date}（特定日の記録取得）

**レスポンス**
```json
{
  "status": "success",
  "data": {
    "id": 123,
    "user_id": 1,
    "record_date": "2025-01-15",
    "has_headache": true,
    "has_allergy": false,
    "sleep_hours": 6.5,
    "weather": {
      "id": "rainy",
      "name": "雨",
      "icon": "🌧️"
    },
    "temperature": {
      "id": "cold",
      "name": "寒い",
      "icon": "🥶"
    },
    "foods": [
      { "id": "bread", "name": "パン・小麦", "icon": "🍞" },
      { "id": "milk", "name": "乳製品", "icon": "🥛" },
      { "id": "coffee", "name": "コーヒー", "icon": "☕" }
    ],
    "memo": "",
    "created_at": "2025-01-15T21:30:00Z"
  }
}
```

---

### PUT /api/records/{id}（記録を更新）

**リクエスト**
```json
{
  "has_headache": false,
  "has_allergy": true,
  "sleep_hours": 7.0,
  "weather_id": "sunny",
  "temperature_id": "cool",
  "food_ids": ["rice", "fish", "vegetable"],
  "memo": "夜に鼻水が出た"
}
```

**レスポンス（成功）**
```json
{
  "status": "success",
  "data": {
    "id": 123,
    "record_date": "2025-01-15",
    "message": "更新しました"
  }
}
```

---

### DELETE /api/records/{id}（記録を削除）

**レスポンス（成功）**
```json
{
  "status": "success",
  "data": {
    "id": 123,
    "message": "削除しました"
  }
}
```

---

### GET /api/records/{user_id}/calendar/{year}/{month}（月別カレンダーデータ）

**レスポンス**
```json
{
  "status": "success",
  "data": {
    "year": 2025,
    "month": 12,
    "records": [
      {
        "date": "2025-12-23",
        "has_headache": false,
        "has_allergy": false
      },
      {
        "date": "2025-12-24",
        "has_headache": false,
        "has_allergy": true
      },
      {
        "date": "2025-12-25",
        "has_headache": true,
        "has_allergy": false
      }
    ]
  }
}
```

---

### GET /api/analysis/{user_id}（トリガー分析）

#### レスポンス（データ十分な場合）

```json
{
  "status": "success",
  "data": {
    "user_id": 1,
    "analyzed_at": "2025-01-15T10:00:00Z",
    "total_records": 30,
    "has_enough_data": true,
    "triggers": [
      {
        "symptom": "頭痛",
        "trigger": "睡眠不足",
        "icon": "😴",
        "message": "6時間未満の日は頭痛になりやすい"
      },
      {
        "symptom": "頭痛",
        "trigger": "寒い日",
        "icon": "🥶",
        "message": "寒い日は頭痛になりやすい"
      },
      {
        "symptom": "アレルギー",
        "trigger": "乳製品",
        "icon": "🥛",
        "message": "乳製品を食べた日はアレルギーが出やすい"
      }
    ]
  }
}
```

#### レスポンス（データ不足の場合）

```json
{
  "status": "success",
  "data": {
    "user_id": 1,
    "total_records": 5,
    "has_enough_data": false,
    "required_records": 7,
    "remaining_records": 2,
    "message": "もう少し記録がたまると原因がわかります"
  }
}
```

---

### GET /api/weather（天気一覧取得）

**レスポンス**
```json
{
  "status": "success",
  "data": {
    "default": [
      { "id": "sunny", "name": "晴れ", "icon": "☀️" },
      { "id": "cloudy", "name": "曇り", "icon": "☁️" },
      { "id": "rainy", "name": "雨", "icon": "🌧️" },
      { "id": "snowy", "name": "雪", "icon": "❄️" }
    ],
    "custom": [
      { "id": "custom_123", "name": "台風", "icon": "🌪️" }
    ]
  }
}
```

---

### GET /api/temperatures（気温一覧取得）

**レスポンス**
```json
{
  "status": "success",
  "data": {
    "default": [
      { "id": "hot", "name": "暑い", "icon": "🥵" },
      { "id": "warm", "name": "暖かい", "icon": "😊" },
      { "id": "cool", "name": "涼しい", "icon": "🧥" },
      { "id": "cold", "name": "寒い", "icon": "🥶" }
    ],
    "custom": []
  }
}
```

---

### GET /api/foods（食品一覧取得）

**レスポンス**
```json
{
  "status": "success",
  "data": {
    "default": [
      { "id": "bread", "name": "パン・小麦", "icon": "🍞", "category": "穀物" },
      { "id": "milk", "name": "乳製品", "icon": "🥛", "category": "乳製品" },
      { "id": "egg", "name": "卵", "icon": "🥚", "category": "卵" },
      { "id": "meat", "name": "肉", "icon": "🍖", "category": "肉類" },
      { "id": "fish", "name": "魚", "icon": "🐟", "category": "魚介類" },
      { "id": "rice", "name": "ごはん", "icon": "🍚", "category": "穀物" },
      { "id": "noodle", "name": "麺類", "icon": "🍜", "category": "穀物" },
      { "id": "vegetable", "name": "野菜", "icon": "🥬", "category": "野菜" },
      { "id": "fruit", "name": "果物", "icon": "🍎", "category": "果物" },
      { "id": "sweets", "name": "お菓子", "icon": "🍰", "category": "菓子" },
      { "id": "coffee", "name": "コーヒー", "icon": "☕", "category": "飲料" },
      { "id": "alcohol", "name": "お酒", "icon": "🍺", "category": "飲料" }
    ],
    "custom": [
      { "id": "custom_456", "name": "ピザ", "icon": "🍕", "category": "カスタム" }
    ]
  }
}
```

---

### GET /api/settings/{user_id}（ユーザー設定取得）

**レスポンス**
```json
{
  "status": "success",
  "data": {
    "user_id": 1,
    "notify_enabled": true,
    "notify_time": "21:00"
  }
}
```

---

### PUT /api/settings/{user_id}（ユーザー設定更新）

**リクエスト**
```json
{
  "notify_enabled": true,
  "notify_time": "22:00"
}
```

**レスポンス（成功）**
```json
{
  "status": "success",
  "data": {
    "notify_enabled": true,
    "notify_time": "22:00",
    "message": "設定を保存しました"
  }
}
```

---

### GET /api/custom-items/{user_id}（カスタム項目一覧取得）

**レスポンス**
```json
{
  "status": "success",
  "data": {
    "weather": [
      { "id": "custom_123", "name": "台風", "icon": "🌪️" }
    ],
    "temperature": [
      { "id": "custom_124", "name": "蒸し暑い", "icon": "💨" }
    ],
    "food": [
      { "id": "custom_456", "name": "ピザ", "icon": "🍕" }
    ]
  }
}
```

---

### POST /api/custom-items/{user_id}（カスタム項目追加）

**リクエスト**
```json
{
  "category": "food",
  "name": "ピザ",
  "icon": "🍕"
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| category | STRING | カテゴリ（weather / temperature / food） |
| name | STRING | 項目名 |
| icon | STRING | 絵文字アイコン |

**レスポンス（成功）**
```json
{
  "status": "success",
  "data": {
    "id": "custom_456",
    "category": "food",
    "name": "ピザ",
    "icon": "🍕",
    "message": "追加しました"
  }
}
```

---

### DELETE /api/custom-items/{user_id}/{item_id}（カスタム項目削除）

**レスポンス（成功）**
```json
{
  "status": "success",
  "data": {
    "id": "custom_456",
    "message": "削除しました"
  }
}
```

---

## エラーレスポンス

### 共通エラーフォーマット

```json
{
  "status": "error",
  "error": {
    "code": "NOT_FOUND",
    "message": "指定されたリソースが見つかりません"
  }
}
```

### エラーコード一覧

| コード | HTTPステータス | 説明 |
|--------|---------------|------|
| VALIDATION_ERROR | 400 | 入力値が不正 |
| NOT_FOUND | 404 | リソースが見つからない |
| ALREADY_EXISTS | 409 | 既に存在する |
| SERVER_ERROR | 500 | サーバーエラー |

---

## トリガー分析ロジック

### 分析の仕組み

```
1. 過去30日分のデータを取得
2. 記録が7日未満の場合、データ不足レスポンスを返す
3. 症状が「あり」の日と「なし」の日を分類
4. 各要素（食事・睡眠・天気・気温）との相関を計算
5. 相関が高い順に「トリガー候補」として表示
```

### 分析に必要な最低データ数

| 条件 | 理由 |
|------|------|
| 最低7日分 | 1週間の傾向を見るため |
| 推奨30日分 | より正確な分析のため |

---

## 通知機能

### 通知の仕様

| 項目 | 内容 |
|------|------|
| 通知メッセージ | 「今日の調子はどうでしたか？」 |
| 選択可能時間 | 20:00 / 21:00 / 22:00 |
| デフォルト | ON（21:00） |
| 実装 | Firebase Cloud Messaging |

---

以上
