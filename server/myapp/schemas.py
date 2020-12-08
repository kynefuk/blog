from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional


class Blog(BaseModel):
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    is_published: int


class BlogList(BaseModel):
    blogs: List[Blog]


class BlogCreate(BaseModel):
    title: str
    content: str


class BlogUpdate(BaseModel):
    title: Optional[str] = ""
    content: Optional[str] = ""
