from fastapi import APIRouter, HTTPException, FastAPI
from models.itemModel import Item  # Importuj datový model
from database.database import item_collection
from bson import ObjectId

router = APIRouter()

# Převod ObjectId na string (pro MongoDB)
def item_helper(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "category": item["category"],
        "price": item["price"],
        "status": item["status"],
        "notes": item.get("notes"),
    }

# Vytvoření položky
@router.post("/items")
async def create_item(item: Item):
    new_item = await item_collection.insert_one(item.dict())
    created_item = await item_collection.find_one({"_id": new_item.inserted_id})
    return item_helper(created_item)

# Získání všech položek
@router.get("/items")
async def get_items():
    items = []
    async for item in item_collection.find():
        items.append(item_helper(item))
    return items

# Aktualizace položky
@router.put("/items/{id}")
async def update_item(id: str, item: Item):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    updated = await item_collection.update_one({"_id": ObjectId(id)}, {"$set": item.dict()})
    if updated.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item updated successfully"}

# Smazání položky
@router.delete("/items/{id}")
async def delete_item(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    deleted = await item_collection.delete_one({"_id": ObjectId(id)})
    if deleted.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}

app = FastAPI()
app.include_router(router, prefix="/api")