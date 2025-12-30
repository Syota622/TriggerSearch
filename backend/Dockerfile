# ベースイメージ: Python 3.11の軽量版を使用
FROM python:3.11-slim

# コンテナ内の作業ディレクトリを /app に設定
WORKDIR /app

# requirements.txt（依存パッケージのリスト）をコンテナにコピー
COPY requirements.txt .

# pipを使ってPythonパッケージをインストール
# --no-cache-dir: キャッシュを残さずイメージサイズを小さくする
RUN pip install --no-cache-dir -r requirements.txt

# カレントディレクトリの全ファイルをコンテナの /app にコピー
COPY . .

# ポート8000を外部に公開（このポートでアプリケーションが動作）
EXPOSE 8000

# コンテナ起動時に実行するコマンド
# uvicorn: FastAPIアプリケーションを実行するWebサーバー
# main:app: main.pyファイルのappオブジェクトを指定
# --host 0.0.0.0: すべてのネットワークインターフェースで受け付ける
# --port 8000: ポート8000で起動
# --reload: コード変更時に自動再起動（開発時に便利）
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
