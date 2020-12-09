from datetime import datetime
from fastapi import APIRouter, Depends
from typing import List

from .schemas import Blog, BlogCreate, BlogList, BlogUpdate
from .models import BlogTable, BlogIndex

router = APIRouter()


@router.get("/", response_model=list)
def list_blog():
    blog_list = BlogIndex.query(1)
    return list(blog_list)


@router.post("/", response_model=Blog)
def create_blog(blog: BlogCreate):
    created = BlogTable(blog.title, content=blog.content, is_published=1)
    created.save()
    d = created.to_dict()
    blog = Blog(**d)
    return blog


@router.patch("/{blog_title}", response_model=Blog)
def update_blog(blog_title: str, data: BlogUpdate):
    # titleを更新する場合は、既存のItemを削除して新しく作る
    updated_blog = BlogTable.get(1, blog_title)
    print(updated_blog)
    updated_blog.update(
        actions=[
            # BlogTable.title.set(data.title),
            BlogTable.content.set(data.content),
            BlogTable.updated_at.set(datetime.now()),
        ]
    )
    return updated_blog
