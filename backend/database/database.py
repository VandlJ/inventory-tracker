from motor.motor_asyncio import AsyncIOMotorClient

# Připojení k databázi
MONGO_DETAILS = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client["motorcycle_inventory"]

item_collection = database.get_collection("items")
