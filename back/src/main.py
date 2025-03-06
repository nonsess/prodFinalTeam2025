from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from fastapi.staticfiles import StaticFiles

from src.admin import get_admin
from src.api import router
from src.core.config import settings
from src.core.lifespan import lifespan
from src.utils.error_example_factory import error_example_factory

app = FastAPI(
    default_response_class=ORJSONResponse,
    lifespan=lifespan,
    title="Authorization API template",
    responses={
        status.HTTP_422_UNPROCESSABLE_ENTITY: {
            "description": "Validation error.",
            "content": error_example_factory([{"loc": ["string", 0], "msg": "string", "type": "string"}]),
        },
    },
)

app.mount(
    "/static",
    StaticFiles(
        directory=settings.upload_dir,
    ),
    name="static",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
        # "http://prod-team-16-qi3lk0el.final.prodcontest.ru",
        # "localhost",
        # "http://localhost",
        # "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

admin = get_admin(app)

app.include_router(router)
