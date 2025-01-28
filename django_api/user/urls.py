from django.urls import path
from user import views


urlpatterns = [
    path('user-profiles/', views.UserProfileList.as_view()),
]