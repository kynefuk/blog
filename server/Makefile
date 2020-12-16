app = myapp.main:app
port := 7000

dev:
		export PYTHONPATH=/opt/server && poetry run uvicorn $(app) --host 0.0.0.0 --port $(port) --workers 4 --reload