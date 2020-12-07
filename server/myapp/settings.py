from .models import BlogTable


def init_ddb_local():
    """ Create DDB Table """
    if BlogTable.Meta.host and not BlogTable.exists():
        BlogTable.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)
