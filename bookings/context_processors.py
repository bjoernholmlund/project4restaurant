from .models import Table

def table_list(request):
    return {'tables': Table.objects.all()}