from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routers import items
from database.database import init_db
import uvicorn

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to Inventory Tracker API!"}

if __name__ == "__main__":
    uvicorn.run(
	app,
	host="0.0.0.0",
	port=8000,
	ssl_keyfile="/etc/letsencrypt/live/storagegrid.eu/privkey.pem",
	ssl_certfile="/etc/letsencrypt/live/storagegrid.eu/fullchain.pem"
    )
