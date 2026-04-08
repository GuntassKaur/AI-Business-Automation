from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    refresh_token_expire_minutes: int = 10080
    openai_api_key: str = ""
    gemini_api_key: str = ""
    anthropic_api_key: str = ""
    groq_api_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
