from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Table
from .forms import BookingForm

def book_table(request):
    tables = Table.objects.all()

    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Booking successful!")
            return redirect('book_table')
    else:
        form = BookingForm()

    return render(request, 'bookings/book_table.html', {'form': form, 'tables': tables})