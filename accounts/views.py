
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from bookings.models import Booking

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        
        if form.is_valid():
            form.save()
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({"success": True})
            else:
                messages.success(request, "Registration successful! You can now log in.")
                return redirect('login')
            
        else:
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                # Returnera ett enkelt felmeddelande
                errors = form.errors.as_json()
                return JsonResponse({
                    "success": False,
                    "message": "❌ Please correct the highlighted errors.",
                    "errors": errors
                })
    
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "You are now logged in!")
            return redirect("home")  # Ändra till önskad sida
        else:
            messages.error(request, "Invalid credentials")
    else:
        form = AuthenticationForm()

    return render(request, "accounts/login.html", {"form": form})

def logout_view(request):
    logout(request)
    messages.success(request, "You have been logged out.")

    return redirect('home')

@login_required
def profile(request):
    return render(request, 'accounts/profile.html')

@login_required
def profile(request):
    bookings = Booking.objects.filter(user=request.user).order_by('date_time', 'created_at')
    return render(request, 'accounts/profile.html', {'bookings': bookings})

@login_required
def cancel_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id, user=request.user)
    booking.delete()
    messages.success(request, "Din bokning har avbokats.")
    return redirect('profile')