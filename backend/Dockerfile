# ベースイメージ: Python 3.11の軽量版を使用
FROM python:3.11-slim

# コンテナ内の作業ディレクトリを /app に設定
WORKDIR /app

# uvをインストール
# uv: Rust製の高速Pythonパッケージマネージャー（pipの代替）
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# 依存関係ファイルをコピー
# requirements.txt: 依存パッケージのリスト
COPY requirements.txt ./

# 依存関係をインストール
# uv pip install: uvを使ってpipコマンドを実行（高速）
# --system: システムのPython環境に直接インストール（仮想環境を作らない）
# -r requirements.txt: requirements.txtから依存関係を読み込み
RUN uv pip install --system -r requirements.txt

# アプリケーションコードをコピー
COPY . .

# 環境変数を設定
# Pythonの出力をバッファリングせずに表示
ENV PYTHONUNBUFFERED=1

# ポート8000を外部に公開（このポートでアプリケーションが動作）
EXPOSE 8000

# コンテナ起動時に実行するコマンド
# uvicorn: FastAPIアプリケーションを実行するWebサーバー
# main:app: main.pyファイルのappオブジェクトを指定
# --host 0.0.0.0: すべてのネットワークインターフェースで受け付ける
# --port 8000: ポート8000で起動
# --reload: コード変更時に自動再起動（開発時に便利）
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
