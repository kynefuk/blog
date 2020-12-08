from fastapi import FastAPI
from mangum import Mangum

from .settings import init_ddb_local
from .views import router

init_ddb_local()
app = FastAPI()
app.include_router(router)

handler = Mangum(app)
