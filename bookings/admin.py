from django.contrib import admin
from .models import Table, Booking, ContactMessage
# Register your models here.

class BookingInline(admin.TabularInline):
    model = Booking
    extra = 0
    readonly_fields = ('guest_name', 'guest_email', 'date_time', 'number_of_guests', 'created_at')
    ordering = ['date_time']

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('guest_name', 'guest_email', 'date_time', 'number_of_guests', 'created_at')
    search_fields = ('guest_name', 'guest_email')
    list_filter = ('date_time',)

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('table_number',)
    inlines = [BookingInline]

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'submitted_at')
    search_fields = ('name', 'email', 'message')