from django.db import models # type: ignore
from django.contrib.auth.models import User # type: ignore
from django.utils import timezone


class Table(models.Model):
    table_number = models.IntegerField(unique=True)
    capacity = models.IntegerField()

    def __str__(self):
        return f"Table {self.table_number} (Capacity: {self.capacity})"

class Booking(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    guest_name = models.CharField(max_length=100)
    guest_email = models.EmailField()
    date_time = models.DateTimeField()
    number_of_guests = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.guest_name} - {self.date_time}"
