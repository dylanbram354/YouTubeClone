from django.urls import path
from . import views


urlpatterns = [
    path('comments/post', views.CommentList.as_view()),
    path('comments/get/<str:video_id>', views.CommentList.as_view()),
    path('comments/like/<int:comment_id>', views.LikeComment.as_view()),
    path('comments/dislike/<int:comment_id>', views.DislikeComment.as_view())
]
