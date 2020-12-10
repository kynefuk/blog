from datetime import datetime
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute, NumberAttribute
from pynamodb.models import Model
from pynamodb.indexes import GlobalSecondaryIndex, KeysOnlyProjection


class BlogIndex(GlobalSecondaryIndex):
    class Meta:
        projection = KeysOnlyProjection()
        read_capacity_units = 1
        write_capacity_units = 1

    is_published = NumberAttribute(hash_key=True)
    created_at = UTCDateTimeAttribute(range_key=True)


class BlogTable(Model):
    class Meta:
        table_name = "Blogs"
        region = "ap-northeast-1"
        host = "http://dynamodb:8081"

    title = UnicodeAttribute(hash_key=True, null=False)
    content = UnicodeAttribute(null=False, default="")
    created_at = UTCDateTimeAttribute(null=False, default=datetime.now())
    updated_at = UTCDateTimeAttribute(null=False, default=datetime.now())
    is_published = NumberAttribute(default=0, null=False)
    by_is_published = BlogIndex()

    def to_dict(self):
        ret_dict = {}
        for key in self.attribute_values:
            ret_dict[key] = getattr(self, key)
        return ret_dict
