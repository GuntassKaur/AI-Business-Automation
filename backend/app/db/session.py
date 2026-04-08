from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

# Support modern psycopg driver while keeping compatibility with plain postgres URLs.
database_url = settings.database_url
if database_url.startswith("postgresql://"):
    database_url = database_url.replace("postgresql://", "postgresql+psycopg://", 1)

engine = create_engine(database_url, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def run_schema_bootstrap() -> None:
    # Base create for fresh databases.
    Base.metadata.create_all(bind=engine)

    # Lightweight migration path for existing SQLite dev DBs.
    if not database_url.startswith("sqlite"):
        return

    with engine.begin() as conn:
        columns = conn.execute(text("PRAGMA table_info(users)")).fetchall()
        names = {row[1] for row in columns}
        if "role" not in names:
            conn.execute(text("ALTER TABLE users ADD COLUMN role VARCHAR NOT NULL DEFAULT 'admin'"))
