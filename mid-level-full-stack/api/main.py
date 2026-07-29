from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from api.database import create_schema, session_scope
from api.routes.dashboard import router as dashboard_router
from api.routes.expenses import router as expenses_router
from api.seed import seed_database


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    create_schema()
    with session_scope() as session:
        seed_database(session)
    yield


app = FastAPI(title="Ledger API", version="1.0.0", lifespan=lifespan)
app.include_router(dashboard_router, prefix="/api")
app.include_router(expenses_router, prefix="/api")


@app.get("/health", tags=["system"])
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "runtime": "python"}
