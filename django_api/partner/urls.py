from django.urls import path
from .views import (
    PartnerListCreateView,
    PartnerRetrieveUpdateDestroyView,
    PartnerTypeChoicesView)

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
]