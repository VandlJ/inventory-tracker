from pydantic import BaseModel
from typing import Optional

class Item(BaseModel):
    id: Optional[str]  # MongoDB generuje ID automaticky, nemusíš jej zadávat
    name: str
    category: str  # Například "koupit", "opravit"
    price: float
    status: str  # Stav: "pending", "completed"
    notes: Optional[str] = None  # Volitelné poznámky
