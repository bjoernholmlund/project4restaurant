from django.db import models # type: ignore
from django.contrib.auth.models import User # type: ignore
from django.utils import timezone


class Table(models.Model):
    table_number = models.IntegerField(unique=True)

    def __str__(self):
        return f"Table {self.table_number})"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    guest_name = models.CharField(max_length=100)
    guest_email = models.EmailField()
    date_time = models.DateTimeField()
    number_of_guests = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.guest_name} - {self.date_time}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Meddelande från {self.name} ({self.email})"