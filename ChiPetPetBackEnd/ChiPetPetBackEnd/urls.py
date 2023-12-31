"""
URL configuration for ChiPetPetBackEnd project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login_register/', include('login_register.urls')),
    path('verification_documents/', include('verification_documents.urls')),
    path('health_record/', include('health_record.urls')),
    path('pet_create/', include('pet_create.urls')),
    path('chipetpet/', include('chipetpet.urls')),
    path('message/', include('message.urls')),
    path('blogpost/', include('blogpost.urls')),
    path('appointment/', include('appointment.urls')),
    path('application/', include('application.urls')),
    path('notification/', include('notification.urls')),
    path('system_report/', include('system_report.urls')),
]
