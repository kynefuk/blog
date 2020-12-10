from datetime import datetime
from fastapi import APIRouter, status, HTTPException
from pynamodb.exceptions import DoesNotExist

from .schemas import Blog, BlogCreate, BlogList, BlogUpdate
from .models import BlogTable, BlogIndex

router = APIRouter()


@router.get("/", response_model=BlogList)
def list_blog():
    blog_list = BlogIndex.query(1)
    blog_l = []
    for blog in blog_list:
        b = Blog(**blog.to_dict())
        blog_l.append(b)
    return blog_l


@router.post("/", response_model=Blog)
def create_blog(blog: BlogCreate):
    created = BlogTable(blog.title, content=blog.content, is_published=1)
    created.save()
    d = created.to_dict()
    blog = Blog(**d)
    return blog


@router.patch("/{blog_title}", response_model=Blog, status_code=201)
def update_blog(blog_title: str, data: BlogUpdate):
    # titleを更新する場合は、既存のItemを削除して新しく作る
    try:
        updated_blog = BlogTable.get(blog_title)
    except DoesNotExist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="blog not found."
        )

    if data.title != blog_title:
        created = BlogTable(data.title, content=data.content, is_published=1)
        updated_blog.delete()
        created.save()
        return Blog(**created.to_dict())

    updated_blog.update(
        actions=[
            BlogTable.content.set(data.content),
            BlogTable.updated_at.set(datetime.now()),
        ]
    )
    blog = Blog(**updated_blog.to_dict())
    return blog


@router.delete("/{blog_title}")
def delete_blog(blog_title: str):
    try:
        target = BlogTable.get(blog_title)
        target.delete()
    except DoesNotExist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="blog not found."
        )
    return status.HTTP_204_NO_CONTENT
