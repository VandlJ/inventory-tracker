from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routers import items

app = FastAPI()

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
