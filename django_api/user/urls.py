from django.urls import path
from user import views


urlpatterns = [
    path(
        'user-profiles/',
        views.UserProfileList.as_view(),
        name="user_profile_list"
    ),
    path(
        'user-profiles/<int:pk>/',
        views.UserProfileDetail.as_view(),
        name="user_profile_detail"
    ),
    path(
        "user-profiles/password/change/",
        views.CustomPasswordChangeView.as_view(),
        name="password_change"
    ),
]
