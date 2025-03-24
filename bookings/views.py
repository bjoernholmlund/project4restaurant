from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Table, Booking
from .forms import BookingForm

def book_table(request):
    if request.method == "POST":
        name = request.POST.get("guest_name")
        email = request.POST.get("guest_email")
        table_id = request.POST.get("table")
        date_time = request.POST.get("date_time")
        number_of_guests = request.POST.get("number_of_guests")

        # hämta bord
        table = Table.objects.get(id=table_id)

        # spara bokningen
        Booking.objects.create(
            guest_name=name,
            guest_email=email,
            table=table,
            date_time=date_time,
            number_of_guests=number_of_guests  
        )
        return redirect('reservation_success')  # Skapa denna sida eller vy!
    
    tables = Table.objects.all()
    return render(request, 'bookings/index.html', {'tables': tables})