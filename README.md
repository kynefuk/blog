# My blog

## Setup DynamoDB

```
docker run -p 8000:8000 -d amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin --port 8002
```
