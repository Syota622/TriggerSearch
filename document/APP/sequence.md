# TriggerSearch（trigs）シーケンス図・画面遷移図（更新版）

---

## 1. シーケンス図

### 1.1 毎日の記録を登録する

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: アプリを開く
    App->>User: ホーム画面を表示
    
    User->>App: 「記録する」ボタンを押す
    App->>API: GET /api/foods
    API->>DB: 食品一覧を取得
    DB-->>API: 食品データ
    API-->>App: 食品一覧
    App->>API: GET /api/weather
    API->>DB: 天気一覧を取得
    DB-->>API: 天気データ
    API-->>App: 天気一覧
    App->>User: 記録画面を表示

    User->>App: 症状（あり/なし）を選択
    User->>App: 食事（アイコン）を複数選択
    User->>App: 睡眠時間（スライダー）を選択
    User->>App: 天気（アイコン）を選択
    User->>App: 「保存する」ボタンを押す
    
    App->>API: POST /api/records
    Note over App,API: {has_headache, has_allergy,<br/>sleep_hours, weather_id, food_ids}
    API->>DB: INSERT daily_records
    API->>DB: INSERT record_foods（複数）
    DB-->>API: 登録完了
    API-->>App: 成功レスポンス
    
    App->>User: ホーム画面に戻る
```

---

### 1.2 トリガー分析結果を見る（データ十分）

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース
    participant Analyzer as 分析エンジン

    User->>App: アプリを開く
    App->>User: ホーム画面を表示
    
    User->>App: 「原因を見る」ボタンを押す
    
    App->>API: GET /api/analysis/{user_id}
    API->>DB: SELECT daily_records (過去30日)
    API->>DB: SELECT record_foods (関連する食品)
    DB-->>API: 記録データ一覧
    
    API->>Analyzer: データを渡す
    Analyzer->>Analyzer: 相関を計算
    Note over Analyzer: 頭痛と睡眠時間の相関<br/>アレルギーと食品の相関<br/>症状と天気の相関
    Analyzer-->>API: トリガー候補リスト
    
    API-->>App: 分析結果（has_enough_data: true）
    App->>User: 結果画面を表示
    Note over User: 😴 睡眠不足<br/>6時間未満の日は頭痛になりやすい
```

---

### 1.3 トリガー分析結果を見る（データ不足）

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: 「原因を見る」ボタンを押す
    
    App->>API: GET /api/analysis/{user_id}
    API->>DB: SELECT COUNT(*) FROM daily_records
    DB-->>API: 記録数: 5件
    
    Note over API: 7件未満のためデータ不足と判定
    
    API-->>App: データ不足レスポンス
    Note over API,App: {has_enough_data: false,<br/>total_records: 5,<br/>remaining_records: 2}
    
    App->>User: データ不足画面を表示
    Note over User: 📊 もう少し記録がたまると<br/>原因がわかります<br/><br/>現在 5日分の記録<br/>あと 2日分で分析できます
```

---

### 1.4 ユーザー登録

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: アプリを初回起動
    App->>User: ユーザー登録画面を表示
    
    User->>App: 名前・メールアドレスを入力
    User->>App: 「登録」ボタンを押す
    
    App->>API: POST /api/users
    API->>DB: INSERT users
    API->>DB: INSERT user_settings（デフォルト値）
    Note over DB: notify_enabled: true<br/>notify_time: 21:00
    DB-->>API: 登録完了（user_id発行）
    API-->>App: 成功レスポンス（user_id）
    
    App->>App: user_idをローカルに保存
    App->>User: ホーム画面に遷移
```

---

### 1.5 通知設定を変更する

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: 「設定」ボタンを押す
    
    App->>API: GET /api/settings/{user_id}
    API->>DB: SELECT user_settings
    DB-->>API: 設定データ
    API-->>App: 現在の設定
    
    App->>User: 設定画面を表示
    Note over User: 🔔 リマインダー: ON<br/>通知時間: 21:00
    
    User->>App: 通知時間を「22:00」に変更
    User->>App: 設定が自動保存される
    
    App->>API: PUT /api/settings/{user_id}
    Note over App,API: {notify_enabled: true,<br/>notify_time: "22:00"}
    API->>DB: UPDATE user_settings
    DB-->>API: 更新完了
    API-->>App: 成功レスポンス
```

---

### 1.6 夜の通知を受け取る

```mermaid
sequenceDiagram
    autonumber
    participant Scheduler as スケジューラー
    participant Push as プッシュ通知
    participant App as アプリ
    actor User as ユーザー

    Scheduler->>Scheduler: 設定時刻になった（例: 21:00）
    Scheduler->>Push: 通知を送信
    Push->>User: 「今日の調子はどうでしたか？」
    
    User->>App: 通知をタップ
    App->>User: 記録画面を表示
```

---

### 1.7 過去の記録を修正する

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: ホーム画面で日付を選択
    
    App->>API: GET /api/records/{user_id}/{date}
    API->>DB: SELECT daily_records WHERE date = ?
    API->>DB: SELECT record_foods WHERE record_id = ?
    DB-->>API: 該当日の記録
    API-->>App: 記録データ（食品含む）
    
    App->>User: 記録画面（入力済み）を表示
    
    User->>App: 内容を修正
    User->>App: 「保存する」ボタンを押す
    
    App->>API: PUT /api/records/{id}
    API->>DB: UPDATE daily_records
    API->>DB: DELETE record_foods WHERE record_id = ?
    API->>DB: INSERT record_foods（新しい食品）
    DB-->>API: 更新完了
    API-->>App: 成功レスポンス
    
    App->>User: ホーム画面に戻る
```

---

## 2. 画面遷移図

```mermaid
flowchart TD
    A[アプリ起動] --> B{初回起動?}
    B -->|はい| C[ユーザー登録画面]
    C --> D[ホーム画面]
    B -->|いいえ| D
    
    D --> E[「記録する」ボタン]
    D --> F[「原因を見る」ボタン]
    D --> G[「設定」ボタン]
    
    E --> H[記録画面]
    H --> I[保存する]
    I --> D
    
    F --> J{データ7日以上?}
    J -->|はい| K[結果画面]
    J -->|いいえ| L[データ不足画面]
    K --> M[戻る]
    L --> M
    M --> D
    
    G --> N[設定画面]
    N --> O[戻る]
    O --> D
    
    P[夜の通知] -.->|タップ| H
```

---

## 3. データフロー図

```mermaid
flowchart LR
    subgraph 入力
        A[症状<br/>頭痛/アレルギー]
        B[食事<br/>アイコン選択]
        C[睡眠時間]
        D[天気]
    end
    
    subgraph 保存
        E[(daily_records)]
        F[(record_foods)]
    end
    
    subgraph 分析
        G[分析エンジン]
        H[相関計算]
        I{7日以上?}
    end
    
    subgraph 出力
        J[トリガー候補]
        K[データ不足<br/>メッセージ]
    end
    
    A --> E
    B --> F
    C --> E
    D --> E
    
    E --> G
    F --> G
    G --> H
    H --> I
    I -->|はい| J
    I -->|いいえ| K
```

---

## 4. 分析ロジックフロー

```mermaid
flowchart TD
    A[過去30日の記録を取得] --> B{7日以上ある?}
    
    B -->|いいえ| C[データ不足メッセージを返す]
    
    B -->|はい| D[症状ありの日を抽出]
    D --> E[症状なしの日を抽出]
    
    E --> F{睡眠時間を比較}
    F -->|差が大きい| G[睡眠がトリガー候補]
    
    E --> H{天気を比較}
    H -->|雨の日に多い| I[天気がトリガー候補]
    
    E --> J{食品を比較}
    J -->|特定食品が多い| K[食品がトリガー候補]
    
    G --> L[スコア順にソート]
    I --> L
    K --> L
    
    L --> M[上位3件を表示]
```

---

## 5. 通知フロー

```mermaid
flowchart TD
    A[スケジューラー起動] --> B[ユーザー設定を確認]
    B --> C{通知ON?}
    
    C -->|いいえ| D[何もしない]
    
    C -->|はい| E{設定時刻?}
    E -->|いいえ| D
    
    E -->|はい| F{今日の記録あり?}
    F -->|はい| D
    
    F -->|いいえ| G[プッシュ通知を送信]
    G --> H[「今日の調子はどうでしたか？」]
```

---
