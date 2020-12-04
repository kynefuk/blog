app = myapp.main:app
port := 7000

dev:
		export PYTHONPATH=/opt/server && uvicorn $(app) --host 0.0.0.0 --port $(port) --workers 4 --reload

alembic:
		export PYTHONPATH=/opt/app && alembic upgrade head