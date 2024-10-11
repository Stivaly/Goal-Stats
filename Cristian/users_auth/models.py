<<<<<<< HEAD
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLES = (
        ('SUPER_ADMIN', 'Super Administrador'),
        ('ADMIN', 'Administrador'),
        ('COACH', 'Entrenador'),
        ('PLAYER', 'Jugador'),
    )
=======
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLES = (
        ('SUPER_ADMIN', 'Super Administrador'),
        ('ADMIN', 'Administrador'),
        ('COACH', 'Entrenador'),
        ('PLAYER', 'Jugador'),
    )
>>>>>>> 8cfe0b55c1eaef91cc7bfb639b6f2cb7905eb736
    role = models.CharField(max_length=20, choices=ROLES, default='PLAYER')