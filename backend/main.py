from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routers import items
from database.database import verify_connection, init_db

app = FastAPI()

@app.on_event("startup")
async def startup_db_client():
    await verify_connection()
    await init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for testing purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to Motorcycle Inventory Tracker API!"}
