from django import forms
from .models import Booking, Table, ContactMessage

class BookingForm(forms.ModelForm):
    table = forms.ModelChoiceField(
        queryset=Table.objects.all(),
        empty_label="Select Table",
        to_field_name="id",
        widget=forms.Select(attrs={'class': 'custom-select'})
    )

    class Meta:
        model = Booking
        fields = ['guest_name', 'guest_email', 'table', 'date_time', 'number_of_guests']
        widgets = {
            "guest_name": forms.TextInput(attrs={'class': 'custom-input', 'placeholder': 'Enter your name'}),
            "guest_email": forms.EmailInput(attrs={'class': 'custom-input', 'placeholder': 'Enter your email'}),
            "date_time": forms.DateTimeInput(attrs={"type": "datetime-local", 'class': 'custom-input'}),
            "number_of_guests": forms.NumberInput(attrs={'class': 'custom-input', 'placeholder': 'Enter number of guests'}),
        }

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']        