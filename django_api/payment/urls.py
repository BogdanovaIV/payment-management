from django.urls import path
from .views import (
    PaymentRequestListCreateView,
    PaymentRequestRetrieveUpdateDestroyView,
    )

urlpatterns = [
    path(
        'payment-request/',
        PaymentRequestListCreateView.as_view(),
        name='payment-request-list-create'
    ),
    path(
        'payment-request/<int:pk>/',
        PaymentRequestRetrieveUpdateDestroyView.as_view(),
        name='payment-request-detail'
    ),
]