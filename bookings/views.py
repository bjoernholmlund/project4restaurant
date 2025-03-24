from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Table, Booking
from .forms import BookingForm
from django.http import JsonResponse
from django.utils.dateparse import parse_datetime
from datetime import timedelta
from django.utils import timezone

def book_table(request):
    if request.method == "POST":
        try:
            name = request.POST.get("guest_name")
            email = request.POST.get("guest_email")
            table_id = request.POST.get("table")
            date_time = request.POST.get("date_time")
            number_of_guests = request.POST.get("number_of_guests")

            table = Table.objects.get(id=table_id)
            naive_date = parse_datetime(date_time)

            if timezone.is_naive(naive_date):
                date_time_obj = timezone.make_aware(naive_date)
            else:    
                date_time_obj = naive_date

            end_time = date_time_obj + timedelta(hours=2)
            
            #Doublereservations
            overlapping_bookings = Booking.objects.filter(
                table=table,
                date_time__lt=end_time,
                date_time__gte=date_time_obj - timedelta(hours=2)
            )

            if overlapping_bookings.exists():
                suggestions = []
                for i in range(1, 5):
                    alt_start = end_time + timedelta(hours=2 * i)
                    if timezone.is_naive(alt_start):
                        alt_start = timezone.make_aware(alt_start)
                    alt_end = alt_start + timedelta(hours=2)

                    conflict = Booking.objects.filter(
                        table=table,
                        date_time__lt=alt_end,
                        date_time__gte=alt_start
                    ).exists()

                    if not conflict:
                        suggestions.append(alt_start.strftime('%Y-%m-%d %H:%M'))

                return JsonResponse({
                    'sucess': False, 
                    'error': 'The table is already booked at that time.',
                    'suggestions': suggestions
                    })

            #Making a booking!
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
            return JsonResponse({'success': False, 'error': 'Server error'})

    return JsonResponse({'success': False, 'error': 'Invalid request'})
    
    
  