# データベース接続の設定ファイル

import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# 環境変数からデータベース接続URLを取得
# デフォルト値として開発環境用のURLを設定
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:password@localhost:5432/triggerdb"
)

# 非同期データベースエンジンを作成
# echo=True: SQLのログを出力（デバッグ用）
engine = create_async_engine(DATABASE_URL, echo=True)

# 非同期セッションの作成
# セッション: データベースとのやり取りを管理するオブジェクト
AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,  # コミット後もオブジェクトを使用可能にする
)

# モデルのベースクラス
# このクラスを継承してテーブルモデルを定義
Base = declarative_base()


# データベースセッションを取得する関数（依存性注入用）
async def get_db():
    """
    FastAPIのエンドポイントで使用するデータベースセッションを提供

    使い方:
    @app.get("/items")
    async def get_items(db: AsyncSession = Depends(get_db)):
        # dbを使ってデータベース操作
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session  # セッションを提供
        finally:
            await session.close()  # 処理後にセッションをクローズ
