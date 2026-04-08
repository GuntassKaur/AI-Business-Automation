from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.db.session import run_schema_bootstrap
from app.routes import auth, chat, invoice, orders

run_schema_bootstrap()

app = FastAPI(title="AI Business Automation OS API", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ValueError)
async def value_error_handler(_: Request, exc: ValueError):
    return JSONResponse(status_code=400, content={"detail": str(exc)})


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-business-automation-os-api", "version": "1.1.0"}


@app.get("/")
def root():
    return {"status": "ok", "message": "AI Business Automation OS backend online"}


app.include_router(auth.router)
app.include_router(orders.router)
app.include_router(invoice.router)
app.include_router(chat.router)
