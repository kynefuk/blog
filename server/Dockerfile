FROM python:3.8-buster as builder
WORKDIR /opt/server
COPY requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

FROM python:3.8-buster as dev
COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn
RUN apt update && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY myapp /opt/server/myapp
WORKDIR /opt/server/myapp

FROM python:3.8-slim-buster as runner
COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn
RUN apt update && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY myapp /opt/server/myapp
WORKDIR /opt/server/myapp

ENV PYTHONBUFFERED=TRUE
EXPOSE 7000
ENV PYTHONPATH=$PYTHONPATH:/opt/server
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7000" ]
