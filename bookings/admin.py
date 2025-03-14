from django.contrib import admin
from .models import Table, Booking
# Register your models here.

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('guest_name', 'guest_email', 'date_time', 'number_of_guests', 'created_at')
    search_fields = ('guest_name', 'guest_email')
    list_filter = ('date_time',)

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('table_number', 'capacity')