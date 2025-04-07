from django.urls import path
from . import views

urlpatterns = [
    path("book-table/", views.book_table, name="book_table"),
    path('', views.home, name='home'),
    path('my-bookings/', views.my_bookings, name='my_bookings'),
    path('cancel-booking/<int:booking_id>/', views.cancel_booking, name='cancel_booking'),
]