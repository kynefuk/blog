import os

from pydantic import BaseSettings
from typing import List

from .models import BlogTable


def init_ddb_local(table_name, region, host=None):
    """ Create DDB Table """
    BlogTable.Meta.table_name = table_name
    BlogTable.Meta.region = region
    if host is None and not BlogTable.exists():
        BlogTable.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)

    BlogTable.Meta.host = host
    if host and not BlogTable.exists():
        BlogTable.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)


class AppSetting(BaseSettings):
    title: str = "blog"
    debug: bool = os.environ.get("DEBUG", False)
    cors_allowed_origin: List[str] = [
        os.environ.get("CORS_ALLOWED_ORIGIN", "http://localhost:3000")
    ]
    docs_url: str = os.environ.get("DOCS_URL", "/docs")
    redoc_url: str = os.environ.get("REDOC_URL", "/redoc")
    openapi_url: str = os.environ.get("OPENAPI_URL", "/openapi.json")
    aws_region: str = os.environ.get("AWS_DEFAULT_REGION", "ap-northeast-1")
    db_host: str = os.environ.get("DB_HOST")
    table_name: str = os.environ.get("TABLE_NAME", "Blogs")

    class Config:
        case_sensitive = True
        env_file = ".env"

    def to_dict(self):
        return self.__dict__


app_setting = AppSetting()
