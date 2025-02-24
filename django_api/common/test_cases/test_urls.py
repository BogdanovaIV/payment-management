from django.urls import path
from common.test_cases.test_pessimistic_locking_view import (
    TestModelLockingUpdateView,
    TestModelLockingView,
    TestModelUnLockingView
)

urlpatterns = [
    path(
        'test-models/<int:pk>/lock/',
        TestModelLockingView.as_view(),
        name='lock-item'
    ),
    path(
        'test-models/<int:pk>/unlock/',
        TestModelUnLockingView.as_view(),
        name='unlock-item'
    ),
    path(
        'test-models/<int:pk>/',
        TestModelLockingUpdateView.as_view(),
        name='update-item'
    ),
]
