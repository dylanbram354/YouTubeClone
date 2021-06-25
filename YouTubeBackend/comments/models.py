from django.db import models


# Create your models here.
class Comment(models.Model):
    name = models.CharField(max_length=50, null=True)
    comment = models.CharField(max_length=1000, null=True)
    date = models.DateField(null=True)
    videoId = models.CharField(max_length=1000, null=True)
    replyToId = models.CharField(max_length=1000, null=True)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)
