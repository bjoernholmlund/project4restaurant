from django.shortcuts import render
from .models import Dish

def menu_view(request):
    dishes = Dish.objects.filter(is_available=True).order_by('name')
    return render(request, 'menu/menu.html', {'dishes': dishes})