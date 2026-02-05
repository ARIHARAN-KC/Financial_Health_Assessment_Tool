from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import engine, Base

# Routers
from app.routers import health,auth, upload, analysis, ai, reports, banking_mock, gst_mock, compliance


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG,
        version="1.0.0",
        description="AI-powered Financial Health Assessment Platform for SMEs",
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    app.include_router(health.router, prefix="/health", tags=["Health"])
    app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
    app.include_router(upload.router, prefix="/api/upload", tags=["Upload"])
    app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])
    app.include_router(ai.router, prefix="/api/ai", tags=["AI"])
    app.include_router(compliance.router, prefix="/api/compliance", tags=["Compliance"])
    app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
    app.include_router(banking_mock.router, prefix="/api/banking", tags=["Banking"])
    app.include_router(gst_mock.router, prefix="/api/gst", tags=["GST"])

    return app


app = create_app()


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
