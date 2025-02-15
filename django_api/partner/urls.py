from django.urls import path
from .views import (
    PartnerListCreateView,
    PartnerRetrieveUpdateDestroyView,
    PartnerTypeChoicesView,
    PartnerLockView,
    PartnerUnlockView)

urlpatterns = [
    path(
        'partners/',
        PartnerListCreateView.as_view(),
        name='partner-list-create'
    ),
    path(
        'partners/<int:pk>/',
        PartnerRetrieveUpdateDestroyView.as_view(),
        name='partner-detail'
    ),
    path(
        'partner-types/',
        PartnerTypeChoicesView.as_view(),
        name='partner-types-list'
    ),
    path(
        'partners/<int:pk>/lock/',
        PartnerLockView.as_view(),
        name='partner-lock'
    ),
    path(
        'partners/<int:pk>/unlock/',
        PartnerUnlockView.as_view(),
        name='partner-unlock'
    ),
]
