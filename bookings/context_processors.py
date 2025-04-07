from .models import Table
from bookings.models import Booking

def table_list(request):
    return {'tables': Table.objects.all()}

def global_context(request):
    if request.user.is_authenticated:
        bookings = Booking.objects.filter(user=request.user)
    else:
        bookings = None
    return {'bookings': bookings}