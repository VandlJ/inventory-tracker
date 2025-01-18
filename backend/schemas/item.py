from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from enum import Enum

class StatusEnum(str, Enum):
    on_stock = "on_stock"
    ordered = "ordered"
    planned = "planned"

class ItemBase(BaseModel):
    name: str
    price: float
    status: StatusEnum

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    status: Optional[StatusEnum] = None

class Item(ItemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 