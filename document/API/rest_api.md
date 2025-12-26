## REST API設計

### エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | /api/users | ユーザー登録 |
| GET | /api/users/{id} | ユーザー情報取得 |
| POST | /api/records | 毎日の記録を登録 |
| GET | /api/records/{user_id} | 記録一覧取得 |
| GET | /api/records/{user_id}/{date} | 特定日の記録取得 |
| PUT | /api/records/{id} | 記録を更新 |
| GET | /api/analysis/{user_id} | トリガー分析結果取得 |
| GET | /api/weather | 天気一覧取得 |
| GET | /api/foods | 食品一覧取得 |

### API詳細

#### POST /api/records（毎日の記録を登録）

**リクエスト**
```json
{
  "user_id": 1,
  "record_date": "2025-01-15",
  "has_headache": true,
  "has_allergy": false,
  "sleep_hours": 6.5,
  "weather_id": 3,
  "breakfast": "パン、牛乳",
  "lunch": "ラーメン",
  "dinner": "カレーライス",
  "memo": ""
}
```

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

#### GET /api/analysis/{user_id}（トリガー分析）

**レスポンス**
```json
{
  "status": "success",
  "data": {
    "user_id": 1,
    "analyzed_at": "2025-01-15T10:00:00Z",
    "total_records": 30,
    "triggers": [
      {
        "symptom": "頭痛",
        "trigger": "睡眠不足（6時間未満）",
        "correlation": 0.85,
        "message": "睡眠が6時間未満の日は、頭痛が起きやすいです"
      },
      {
        "symptom": "頭痛",
        "trigger": "雨の日",
        "correlation": 0.72,
        "message": "雨の日は頭痛が起きやすいです"
      },
      {
        "symptom": "アレルギー",
        "trigger": "乳製品",
        "correlation": 0.68,
        "message": "乳製品を食べた日はアレルギーが出やすいです"
      }
    ]
  }
}
```
