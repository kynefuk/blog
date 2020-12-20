from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional


class Blog(BaseModel):
    title: str
    content: str
    created: str
    updated: str


class BlogCreate(BaseModel):
    title: str
    content: str


class BlogUpdate(BaseModel):
    title: Optional[str] = ""
    content: Optional[str] = ""
