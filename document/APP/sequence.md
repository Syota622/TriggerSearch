# TriggerSearch（trigs）シーケンス図・画面遷移図（v3）

---

## 1. シーケンス図

### 1.1 今日の記録を登録する

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: アプリを開く
    App->>User: ホーム画面を表示
    
    User->>App: 「今日の記録」ボタンを押す
    App->>API: GET /api/weather
    App->>API: GET /api/temperatures
    App->>API: GET /api/foods
    App->>API: GET /api/custom-items/{user_id}
    API-->>App: 各種マスタデータ + カスタム項目
    App->>User: 記録画面を表示

    User->>App: 症状（あり/なし）を選択
    User->>App: 睡眠時間（スライダー）を選択
    User->>App: 天気（アイコン）を選択
    User->>App: 気温（アイコン）を選択
    User->>App: 食事（アイコン）を複数選択
    User->>App: 「保存する」ボタンを押す
    
    App->>API: POST /api/records
    Note over App,API: {has_headache, has_allergy,<br/>sleep_hours, weather_id,<br/>temperature_id, food_ids}
    API->>DB: INSERT daily_records
    API->>DB: INSERT record_foods（複数）
    DB-->>API: 登録完了
    API-->>App: 成功レスポンス
    
    App->>User: ホーム画面に戻る
```

---

### 1.2 カレンダーから過去の記録を確認・編集する

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: 「カレンダー」ボタンを押す
    
    App->>API: GET /api/records/{user_id}/calendar/2025/12
    API->>DB: SELECT daily_records WHERE month = 12
    DB-->>API: 月の記録サマリー
    API-->>App: カレンダーデータ
    
    App->>User: カレンダー画面を表示
    Note over User: 記録済みの日に緑の枠<br/>症状アイコン（🤕🤧）表示
    
    User->>App: 12月25日をタップ
    
    App->>API: GET /api/records/{user_id}/2025-12-25
    API->>DB: SELECT daily_records, record_foods
    DB-->>API: 該当日の記録
    API-->>App: 記録データ
    
    App->>User: 記録画面（入力済み）を表示
    Note over User: 「✓ 記録済み（編集中）」と表示
    
    User->>App: 内容を修正
    User->>App: 「更新する」ボタンを押す
    
    App->>API: PUT /api/records/{id}
    API->>DB: UPDATE daily_records
    API->>DB: DELETE/INSERT record_foods
    DB-->>API: 更新完了
    API-->>App: 成功レスポンス
    
    App->>User: カレンダー画面に戻る
```

---

### 1.3 記録を削除する

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: カレンダーから日付を選択
    App->>User: 記録画面（入力済み）を表示
    
    User->>App: 「この記録を削除」ボタンを押す
    App->>User: 確認ダイアログを表示
    User->>App: 「削除する」を選択
    
    App->>API: DELETE /api/records/{id}
    API->>DB: DELETE record_foods WHERE record_id = ?
    API->>DB: DELETE daily_records WHERE id = ?
    DB-->>API: 削除完了
    API-->>App: 成功レスポンス
    
    App->>User: カレンダー画面に戻る
```

---

### 1.4 カスタム項目を追加する

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: 記録画面を開く
    App->>User: 記録画面を表示
    
    User->>App: 食べ物の「＋」ボタンを押す
    App->>User: 追加フォームを表示
    
    User->>App: アイコン「🍕」を選択
    User->>App: 名前「ピザ」を入力
    User->>App: 「追加する」ボタンを押す
    
    App->>API: POST /api/custom-items/{user_id}
    Note over App,API: {category: "food",<br/>name: "ピザ", icon: "🍕"}
    API->>DB: INSERT custom_items
    DB-->>API: 登録完了
    API-->>App: 成功レスポンス
    
    App->>User: 食べ物リストに「🍕」を追加表示
    Note over User: カスタム項目として選択可能に
```

---

### 1.5 カスタム項目を削除する

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース

    User->>App: 「設定」ボタンを押す
    
    App->>API: GET /api/custom-items/{user_id}
    API->>DB: SELECT custom_items
    DB-->>API: カスタム項目一覧
    API-->>App: カスタム項目データ
    
    App->>User: 設定画面を表示
    Note over User: 📝 追加した項目<br/>🍕 ピザ ×
    
    User->>App: 「×」ボタンを押す
    
    App->>API: DELETE /api/custom-items/{user_id}/{item_id}
    API->>DB: DELETE custom_items WHERE id = ?
    DB-->>API: 削除完了
    API-->>App: 成功レスポンス
    
    App->>User: リストから項目を削除
```

---

### 1.6 トリガー分析結果を見る（データ十分）

```mermaid
sequenceDiagram
    autonumber
    actor User as ユーザー
    participant App as アプリ
    participant API as REST API
    participant DB as データベース
    participant Analyzer as 分析エンジン

    User->>App: 「原因を見る」ボタンを押す
    
    App->>API: GET /api/analysis/{user_id}
    API->>DB: SELECT daily_records (過去30日)
    API->>DB: SELECT record_foods (関連する食品)
    DB-->>API: 記録データ一覧
    
    API->>Analyzer: データを渡す
    Analyzer->>Analyzer: 相関を計算
    Note over Analyzer: 頭痛と睡眠時間の相関<br/>頭痛と気温の相関<br/>アレルギーと食品の相関
    Analyzer-->>API: トリガー候補リスト
    
    API-->>App: 分析結果（has_enough_data: true）
    App->>User: 結果画面を表示
    Note over User: 😴 睡眠不足<br/>6時間未満の日は頭痛になりやすい<br/><br/>🥶 寒い日<br/>寒い日は頭痛になりやすい
```

---

### 1.7 トリガー分析結果を見る（データ不足）

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

### 1.8 通知設定を変更する

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
    
    App->>API: PUT /api/settings/{user_id}
    Note over App,API: {notify_enabled: true,<br/>notify_time: "22:00"}
    API->>DB: UPDATE user_settings
    DB-->>API: 更新完了
    API-->>App: 成功レスポンス
```

---

### 1.9 夜の通知を受け取る

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

### 1.10 ユーザー登録

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

## 2. 画面遷移図

```mermaid
flowchart TD
    A[アプリ起動] --> B{初回起動?}
    B -->|はい| C[ユーザー登録画面]
    C --> D[ホーム画面]
    B -->|いいえ| D
    
    D --> E[「今日の記録」ボタン]
    D --> F[「カレンダー」ボタン]
    D --> G[「原因を見る」ボタン]
    D --> H[「設定」ボタン]
    
    E --> I[記録画面（新規）]
    I --> J[保存する]
    J --> D
    
    F --> K[カレンダー画面]
    K --> L[日付をタップ]
    L --> M[記録画面（編集）]
    M --> N[更新する]
    M --> O[削除する]
    N --> K
    O --> K
    K --> P[戻る]
    P --> D
    
    G --> Q{データ7日以上?}
    Q -->|はい| R[結果画面]
    Q -->|いいえ| S[データ不足画面]
    R --> T[戻る]
    S --> T
    T --> D
    
    H --> U[設定画面]
    U --> V[戻る]
    V --> D
    
    W[夜の通知] -.->|タップ| I
```

---

## 3. データフロー図

```mermaid
flowchart LR
    subgraph 入力
        A[症状<br/>頭痛/アレルギー]
        B[睡眠時間]
        C[天気]
        D[気温]
        E[食事<br/>アイコン選択]
    end
    
    subgraph 保存
        F[(daily_records)]
        G[(record_foods)]
    end
    
    subgraph 分析
        H[分析エンジン]
        I[相関計算]
        J{7日以上?}
    end
    
    subgraph 出力
        K[トリガー候補]
        L[データ不足<br/>メッセージ]
    end
    
    A --> F
    B --> F
    C --> F
    D --> F
    E --> G
    
    F --> H
    G --> H
    H --> I
    I --> J
    J -->|はい| K
    J -->|いいえ| L
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
    H -->|特定の天気に多い| I[天気がトリガー候補]
    
    E --> J{気温を比較}
    J -->|特定の気温に多い| K[気温がトリガー候補]
    
    E --> L{食品を比較}
    L -->|特定食品が多い| M[食品がトリガー候補]
    
    G --> N[スコア順にソート]
    I --> N
    K --> N
    M --> N
    
    N --> O[上位3件を表示]
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

## 6. カスタム項目フロー

```mermaid
flowchart TD
    A[記録画面を開く] --> B[デフォルト項目を表示]
    B --> C[カスタム項目を表示]
    C --> D{追加したい?}
    
    D -->|はい| E[「＋」ボタンを押す]
    E --> F[追加フォームを表示]
    F --> G[アイコンを選択]
    G --> H[名前を入力]
    H --> I[「追加する」を押す]
    I --> J[APIでカスタム項目を保存]
    J --> K[リストに追加表示]
    
    D -->|いいえ| L[項目を選択して記録]
    K --> L
```

---

以上
