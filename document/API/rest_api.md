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

## トリガー分析ロジック

### 分析の仕組み

```
1. 過去30日分のデータを取得
2. 症状が「あり」の日と「なし」の日を分類
3. 各要素（食事・睡眠・天気）との相関を計算
4. 相関が高い順に「トリガー候補」として表示
```

### 相関計算の例

```
【頭痛と睡眠時間の相関】

頭痛あり（10日間）の平均睡眠: 5.2時間
頭痛なし（20日間）の平均睡眠: 7.8時間

→ 差が大きい = 睡眠不足がトリガーの可能性が高い
```

### 分析に必要な最低データ数

| 条件 | 理由 |
|------|------|
| 最低7日分 | 1週間の傾向を見るため |
| 推奨30日分 | より正確な分析のため |

---

## 技術スタック（推奨）

| レイヤー | 技術 |
|---------|------|
| フロントエンド | React Native または Flutter |
| バックエンド | Node.js + Express または Python + FastAPI |
| データベース | PostgreSQL または SQLite（軽量版） |
| ホスティング | Vercel, Railway, または AWS |

---

## 今後の拡張案（将来）

| 機能 | 説明 |
|------|------|
| プッシュ通知 | 毎日の記録リマインダー |
| 天気自動取得 | 位置情報から天気を自動入力 |
| 症状の追加 | 頭痛・アレルギー以外も追加可能に |
| AIによる分析強化 | より高度なパターン認識 |
| 医師への共有機能 | 記録データをPDFで出力 |

---

## 開発フェーズ

| フェーズ | 内容 | 期間目安 |
|---------|------|---------|
| Phase 1 | DB設計・API基本実装 | 1週間 |
| Phase 2 | 記録機能（入力画面） | 1週間 |
| Phase 3 | 分析機能 | 1週間 |
| Phase 4 | UI調整・テスト | 1週間 |
