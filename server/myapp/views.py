from datetime import datetime
from fastapi import APIRouter, status, HTTPException
from pynamodb.exceptions import DoesNotExist

from .schemas import Blog, BlogCreate, BlogList, BlogUpdate
from .models import BlogTable, BlogIndex

router = APIRouter()


def get_object_or_404(blog_title: str):
    try:
        updated_blog = BlogTable.get(blog_title)
    except DoesNotExist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="blog not found."
        )
    return updated_blog


@router.get("/blogs", response_model=BlogList)
def list_blog():
    blog_list = BlogIndex.query(1)
    blog_l = []
    for blog in blog_list:
        b = Blog(**blog.to_dict())
        blog_l.append(b)
    return blog_l


@router.post("/blogs", response_model=Blog)
def create_blog(blog: BlogCreate):
    created = BlogTable(blog.title, content=blog.content, is_published=1)
    created.save()
    d = created.to_dict()
    blog = Blog(**d)
    return blog


@router.patch("/blog/{blog_title}", response_model=Blog, status_code=201)
def update_blog(blog_title: str, data: BlogUpdate):
    # titleを更新する場合は、既存のItemを削除して新しく作る
    target = get_object_or_404(blog_title)

    if data.title != blog_title:
        created = BlogTable(data.title, content=data.content, is_published=1)
        target.delete()
        created.save()
        return Blog(**created.to_dict())

    target.update(
        actions=[
            BlogTable.content.set(data.content),
            BlogTable.updated_at.set(datetime.now()),
        ]
    )
    blog = Blog(**target.to_dict())
    return blog


@router.delete("/blog/{blog_title}")
def delete_blog(blog_title: str):
    target = get_object_or_404(blog_title)
    target.delete()
    return status.HTTP_204_NO_CONTENT
