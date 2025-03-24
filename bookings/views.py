from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Table, Booking
from .forms import BookingForm
from django.http import JsonResponse

def book_table(request):
    if request.method == "POST":
        try:
            name = request.POST.get("guest_name")
            email = request.POST.get("guest_email")
            table_id = request.POST.get("table")
            date_time = request.POST.get("date_time")
            number_of_guests = request.POST.get("number_of_guests")

            table = Table.objects.get(id=table_id)

            Booking.objects.create(
                guest_name=name,
                guest_email=email,
                table=table,
                date_time=date_time,
                number_of_guests=number_of_guests
            )

            return JsonResponse({'success': True})

        except Exception as e:
            print(e)  # för att felsöka i terminalen
            return JsonResponse({'success': False})

    return JsonResponse({'success': False})
    
    
  