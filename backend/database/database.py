import os
from motor.motor_asyncio import AsyncIOMotorClient
from loguru import logger

# Get MongoDB URI from environment variable, fallback to default if not set
MONGO_DETAILS = os.getenv("MONGODB_URI", "mongodb://localhost:27017")

try:
    client = AsyncIOMotorClient(MONGO_DETAILS)
    database = client["motorcycle_inventory"]
    item_collection = database.get_collection("items")
except Exception as e:
    logger.error(f"Failed to initialize MongoDB connection: {e}")
    raise

async def verify_connection():
    try:
        await client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
    except Exception as e:
        logger.error(f"Could not connect to MongoDB: {e}")
        raise

async def init_db():
    try:
        # Create indexes if needed
        await item_collection.create_index("name", unique=True)
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        raise
