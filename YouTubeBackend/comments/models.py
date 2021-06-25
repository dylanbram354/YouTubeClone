from django.db import models


# Create your models here.
class Comment(models.model):
    comment = models.CharField(max_length=1000)
