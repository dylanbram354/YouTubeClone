from django.urls import path
from . import views


urlpatterns = [
    path('comments/<str:video_id>', views.CommentList.as_view()),
    path('comments/', views.CommentList.as_view())
]
