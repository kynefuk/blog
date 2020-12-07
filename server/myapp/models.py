from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute
from pynamodb.models import Model


class BlogTable(Model):
    class Meta:
        table_name = "blogs"
        region = "ap-northeast-1"
        host = "http://dynamodb:8081"

    title = UnicodeAttribute(hash_key=True)
    content = UnicodeAttribute()
    created_at = UTCDateTimeAttribute(range_key=True)
