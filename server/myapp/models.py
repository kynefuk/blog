from datetime import datetime, timezone, timedelta
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute, NumberAttribute
from pynamodb.models import Model
from pynamodb.indexes import GlobalSecondaryIndex, KeysOnlyProjection


# class BlogIndex(GlobalSecondaryIndex):
#     class Meta:
#         projection = KeysOnlyProjection()
#         read_capacity_units = 1
#         write_capacity_units = 1

#     is_published = NumberAttribute(hash_key=True)
#     created_at = UTCDateTimeAttribute(range_key=True)


class BlogTable(Model):
    class Meta:
        table_name: str
        region: str
        host: str

    title = UnicodeAttribute(hash_key=True, null=False)
    content = UnicodeAttribute(null=False, default="")
    created = UTCDateTimeAttribute(
        null=False, default=datetime.now(timezone(timedelta(hours=+9), "JST"))
    )
    updated = UTCDateTimeAttribute(
        null=False, default=datetime.now(timezone(timedelta(hours=+9), "JST"))
    )

    def to_dict(self):
        ret_dict = {}
        for key in self.attribute_values:
            if key == "created" or "updated":
                ret_dict[key] = str(getattr(self, key))
                continue
            ret_dict[key] = getattr(self, key)
        return ret_dict
