FROM python:3.8-buster as builder
WORKDIR /opt/server
ENV PYTHONPATH=$PYTHONPATH:/opt/server
ENV POETRY_HOME=/etc/poetry
RUN apt update && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
ENV PATH=$PATH:$POETRY_HOME/bin
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-dev


FROM builder as dev
WORKDIR /opt/server
ENV PYTHONPATH=$PYTHONPATH:/opt/server
RUN apt update && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN poetry install
COPY myapp /opt/server/myapp


FROM python:3.8-slim-buster as runner
WORKDIR /opt/server/myapp
RUN apt update && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn
COPY myapp /opt/server/myapp
ENV PYTHONBUFFERED=TRUE
EXPOSE 7000
ENV PYTHONPATH=$PYTHONPATH:/opt/server
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7000" ]
