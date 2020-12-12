from fastapi import FastAPI
from mangum import Mangum

from .settings import init_ddb_local, app_setting
from .views import router

app = FastAPI(**app_setting.to_dict())
init_ddb_local(
    table_name=app.extra["table_name"],
    region=app.extra["aws_region"],
    host=app.extra.get("db_host", None),
)
app.include_router(router)

handler = Mangum(app)
