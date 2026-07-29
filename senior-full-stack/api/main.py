from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from api.database import create_schema, session_scope
from api.routes.services import router as services_router
from api.seed import seed_database


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    create_schema()
    with session_scope() as session:
        seed_database(session)
    yield


app = FastAPI(title="Relay API", version="1.0.0", lifespan=lifespan)
app.include_router(services_router, prefix="/api")


@app.get("/health", tags=["system"])
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "runtime": "python"}
