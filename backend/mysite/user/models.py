from django.db import models
from typing import Any
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    """_summary_

    Args:
        BaseUserManager (_type_): _description_
    """

    def create_user(self, name, email, password=None, **extra_fields) -> Any:
        """_summary_

        Args:
            name (_type_): _description_
            email (_type_): _description_
            password (_type_, optional): _description_. Defaults to None.

        Returns:
            Any: _description_
        """

        if not email:
            raise ValueError('The email field nust be set !!!')
        
        email = self.normalize_email(email)
        user = self.model(name=name, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_superuser(self, name, email, password=None, **extra_fields) -> Any:
        """_summary_

        Args:
            name (_type_): _description_
            email (_type_): _description_
            password (_type_, optional): _description_. Defaults to None.

        Returns:
            Any: _description_
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(name, email, password, **extra_fields)
    

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """_summary_

    Args:
        AbstractBaseUser (_type_): _description_
        PermissionsMixin (_type_): _description_
    """

    name = models.CharField(max_length=30, unique=True, help_text="User name")
    email = models.EmailField(unique=True, help_text="User email")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self) -> str:
        """_summary_

        Returns:
            str: _description_
        """
        return self.name

