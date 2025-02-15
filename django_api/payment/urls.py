from django.urls import path
from .views import (
    PaymentRequestListCreateView,
    PaymentRequestRetrieveUpdateDestroyView,
    PaymentRequestLockView,
    PaymentRequestUnlockView
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
    path(
        'payment-request/<int:pk>/lock/',
        PaymentRequestLockView.as_view(),
        name='payment-request-lock'
    ),
    path(
        'payment-request/<int:pk>/unlock/',
        PaymentRequestUnlockView.as_view(),
        name='payment-request-unlock'
    ),
]
