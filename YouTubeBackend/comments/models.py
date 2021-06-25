from django.db import models


# Create your models here.
class Comment(models.model):
    name = models.CharField(max_length=50)
    comment = models.CharField(max_length=1000)
    date = models.DateField
    videoId = models.CharField
    replyToId = models.CharField(max_length=1000)
    likes = models.PositiveIntegerField
    dislikes = models.PositiveIntegerField
