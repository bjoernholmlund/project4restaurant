from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Table, Booking
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from datetime import timedelta
from django.contrib import messages
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt


def book_table(request):
    tables = Table.objects.all()

    if request.method == "POST":
        is_ajax = request.headers.get('x-requested-with') == 'XMLHttpRequest'

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

            # Bokningen gäller i 2 timmar
            end_time = date_time_obj + timedelta(hours=2)

            # Kontrollera överlappande bokningar
            overlapping = Booking.objects.filter(
                table=table,
                date_time__lt=end_time,
                date_time__gt=date_time_obj - timedelta(hours=2)
            )

            if overlapping.exists():
                # Skicka förslag på nästa tillgängliga tider
                suggestions = [
                    (date_time_obj + timedelta(hours=2)).strftime("%Y-%m-%dT%H:%M"),
                    (date_time_obj + timedelta(hours=4)).strftime("%Y-%m-%dT%H:%M"),
                ]
                if is_ajax:
                    return JsonResponse({
                        "success": False,
                        "message": "❌ This time is already booked.",
                        "suggested_times": suggestions
                    })
                else:
                    messages.error(request, "This time is already booked.")
                    return render(request, 'book_table.html', {'tables': tables})

            # Skapa bokningen
            Booking.objects.create(
                guest_name=name,
                guest_email=email,
                table=table,
                date_time=date_time_obj,
                number_of_guests=number_of_guests,
                user=request.user if request.user.is_authenticated else None
            )

            if is_ajax:
                return JsonResponse({
                    "success": True,
                    "message": "✅ Thank you! Your reservation is registered."
                })
            else:
                messages.success(request, "Booking successful!")
                return redirect('home')

        except Exception as e:
            print("Booking error:", e)
            if is_ajax:
                return JsonResponse({
                    "success": False,
                    "message": "❌ Server error occurred."
                })
            else:
                messages.error(request, "Something went wrong.")
                return render(request, 'book_table.html', {'tables': tables})

    return render(request, 'book_table.html', {'tables': tables})

@login_required
def my_bookings(request):
    bookings = Booking.objects.filter(user=request.user)
    return render(request, 'bookings/my_bookings.html', {'bookings': bookings})

@login_required
def cancel_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id, user=request.user)
    booking.delete()
    messages.success(request, "Din bokning har avbokats.")
    
    return redirect('home')

def home(request):
    tables = Table.objects.all()  # om du skickar bord till startsidan
    form = AuthenticationForm()

    return render(request, 'index.html', 
            {'tables': tables,  
             "form": form,
        })
#contact form
@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        message = request.POST.get('message', '')

        # Här kan du skicka mejl eller spara i databas
        send_mail(
            subject=f"Kontakt från {name}",
            message=message,
            from_email=email,
            recipient_list=['din@mailadress.se'],  # <-- Ändra till din e-post
        )

        return JsonResponse({'success': True})
    return JsonResponse({'success': False}, status=400)
