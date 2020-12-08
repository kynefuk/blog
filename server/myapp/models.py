from datetime import datetime
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute, NumberAttribute
from pynamodb.models import Model


class BlogTable(Model):
    class Meta:
        table_name = "Blogs"
        region = "ap-northeast-1"
        host = "http://dynamodb:8081"

    title = UnicodeAttribute(null=False)
    content = UnicodeAttribute(null=False)
    created_at = UTCDateTimeAttribute(
        range_key=True, null=False, default=datetime.now()
    )
    updated_at = UTCDateTimeAttribute(null=False, default=datetime.now())
    is_published = NumberAttribute(hash_key=True, default=0, null=False)
