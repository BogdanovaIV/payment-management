from django.urls import path
from user import views


urlpatterns = [
    path('user-profiles/', views.UserProfileList.as_view()),
    path('user-profiles/<int:pk>/', views.UserProfileDetail.as_view()),
    path(
        "user-profiles/password/change/",
        views.CustomPasswordChangeView.as_view(),
        name="password_change"
    ),
]
