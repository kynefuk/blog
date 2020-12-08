from datetime import datetime
from fastapi import APIRouter, Depends
from typing import List

from .schemas import Blog, BlogCreate, BlogList
from .models import BlogTable

router = APIRouter()


@router.post("/")
def create_blog(blog: BlogCreate):
    print(f"blog: {blog}")
    created = BlogTable(1, title=blog.title, content=blog.content)
    created.save()
    # print(created)
    return "ok"


@router.get("/", response_model=List)
# @router.get("/")
def list_blog():
    blog_list = BlogTable.query(1)
    # print(type(list(blog_list)))
    # for b in list(blog_list):
    #     print(b.__dict__)
    return list(blog_list)
