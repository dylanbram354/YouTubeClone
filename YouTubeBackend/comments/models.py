from django.db import models


# Create your models here.
class Comment(models.Model):
    name = models.CharField(max_length=50)
    comment = models.CharField(max_length=1000)
    date = models.DateField
    videoId = models.CharField
    replyToId = models.CharField(max_length=1000, null=True)
    likes = models.PositiveIntegerField
    dislikes = models.PositiveIntegerField
