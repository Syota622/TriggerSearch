# データベースのテーブル定義（モデル）

from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base


# Userテーブルのモデル
class User(Base):
    """
    ユーザー情報を保存するテーブル
    """
    # テーブル名
    __tablename__ = "users"

    # カラム定義
    # id: 主キー、自動採番
    id = Column(Integer, primary_key=True, index=True)
    # name: ユーザー名
    name = Column(String, nullable=False)
    # email: メールアドレス、重複不可
    email = Column(String, unique=True, nullable=False, index=True)
    # created_at: 作成日時
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        """オブジェクトの文字列表現"""
        return f"<User(id={self.id}, name={self.name}, email={self.email})>"
