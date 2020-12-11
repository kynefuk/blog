import os

from pydantic import BaseSettings
from typing import List

from .models import BlogTable


def init_ddb_local(table_name, region, host):
    """ Create DDB Table """
    if BlogTable.Meta.host and not BlogTable.exists():
        BlogTable.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)
        BlogTable.Meta['table_name'] = table_name
        BlogTable.Meta['region'] = region
        BlogTable.Meta['host'] = host


class AppSetting(BaseSettings):
    title: str = "blog"
    debug: bool = os.environ.get("DEBUG", False)
    cors_allowed_origin: List[str] = [
        os.environ.get("CORS_ALLOWED_ORIGIN", "http://localhost:3000")
    ]
    docs_url: str = os.environ.get("DOCS_URL", "/docs")
    redoc_url: str = os.environ.get("REDOC_URL", "/redoc")
    openapi_url: str = os.environ.get("OPENAPI_URL", "/openapi.json")
    db_url: str = os.environ.get("DB_URL", "http://dynamodb:8081")
    table_name: str = os.environ.get("TABLE_NAME", "Blogs")
    aws_access_key_id: str = os.environ.get("AWS_ACCESS_KEY_ID", "xxxx")
    aws_secret_access_key: str = os.environ.get("AWS_SECRET_ACCESS_KEY", "xxxx")
    aws_region: str = os.environ.get("AWS_REGION", "ap-northeast-1")

    class Config:
        case_sensitive = True
        env_file = ".env"

    def to_dict(self):
        return self.__dict__


app_setting = AppSetting()
