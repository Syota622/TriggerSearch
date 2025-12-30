# FastAPIをインポート（WebAPIを作成するためのフレームワーク）
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

# データベース関連のインポート
from database import engine, get_db, Base
from models import User

# FastAPIアプリケーションのインスタンスを作成
app = FastAPI()


# アプリケーション起動時の処理
@app.on_event("startup")
async def startup():
    """
    アプリケーション起動時にデータベーステーブルを作成
    """
    async with engine.begin() as conn:
        # 全てのモデルに対応するテーブルを作成
        # すでに存在する場合はスキップ
        await conn.run_sync(Base.metadata.create_all)


# ルートパス（http://localhost:8000/）にGETリクエストが来たときの処理
@app.get("/")
def read_root():
    # JSON形式でHello Worldメッセージを返す
    return {"message": "Hello World"}


# ヘルスチェック用エンドポイント（http://localhost:8000/health）
# アプリケーションが正常に動作しているか確認するために使用
@app.get("/health")
def health_check():
    # ステータスOKを返す
    return {"status": "ok"}


# ユーザー一覧を取得するエンドポイント
@app.get("/users")
async def get_users(db: AsyncSession = Depends(get_db)):
    """
    データベースから全ユーザーを取得

    Args:
        db: データベースセッション（依存性注入で自動的に渡される）

    Returns:
        ユーザーのリスト
    """
    # SELECTクエリを作成
    result = await db.execute(select(User))
    # 結果を全て取得
    users = result.scalars().all()

    # 辞書形式に変換して返す
    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "created_at": user.created_at.isoformat(),
        }
        for user in users
    ]


# ユーザーを作成するエンドポイント
@app.post("/users")
async def create_user(name: str, email: str, db: AsyncSession = Depends(get_db)):
    """
    新しいユーザーをデータベースに追加

    Args:
        name: ユーザー名
        email: メールアドレス
        db: データベースセッション

    Returns:
        作成されたユーザー情報
    """
    # 新しいUserオブジェクトを作成
    new_user = User(name=name, email=email)

    # セッションに追加
    db.add(new_user)
    # データベースにコミット（保存）
    await db.commit()
    # 最新の状態を取得（IDなどが自動採番される）
    await db.refresh(new_user)

    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "created_at": new_user.created_at.isoformat(),
    }
