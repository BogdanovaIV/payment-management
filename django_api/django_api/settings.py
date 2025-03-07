"""
Django settings for django_api project.

Generated by 'django-admin startproject' using Django 3.2.25.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
import sys
from decouple import config
from django.utils.translation import gettext_lazy as _
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [(
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication'
    )],
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DATETIME_FORMAT': '%Y-%m-%d',
}

if config('DEBUG', default=False, cast=bool):
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [
        'rest_framework.renderers.JSONRenderer',
    ]

REST_USE_JWT = True

JWT_AUTH_SECURE = True
JWT_AUTH_COOKIE = 'django-api-app-auth'
JWT_AUTH_REFRESH_COOKIE = 'django-api-refresh-token'
JWT_AUTH_SAMESITE = 'None'

REST_AUTH = {
    'USE_JWT': REST_USE_JWT,
    'JWT_AUTH_SECURE': JWT_AUTH_SECURE,
    'JWT_AUTH_COOKIE': JWT_AUTH_COOKIE,
    'JWT_AUTH_REFRESH_COOKIE': JWT_AUTH_REFRESH_COOKIE,
    'JWT_AUTH_SAMESITE': JWT_AUTH_SAMESITE,
    'JWT_AUTH_HTTPONLY': False,
    'USER_DETAILS_SERIALIZER': 'django_api.serializers.CurrentUserSerializer',
    "REGISTER_SERIALIZER": 'django_api.serializers.CustomRegisterSerializer'
}

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*').split(',')

CLIENT_ORIGIN = config('CLIENT_ORIGIN', default='')

# Set CORS allowed origins (split by comma if multiple origins)
if CLIENT_ORIGIN:
    CORS_ALLOWED_ORIGINS = CLIENT_ORIGIN.split(',')
else:
    CORS_ALLOWED_ORIGINS = []

# Set CSRF trusted origins
if CLIENT_ORIGIN:
    CSRF_TRUSTED_ORIGINS = CLIENT_ORIGIN.split(',')
else:
    CSRF_TRUSTED_ORIGINS = []


CORS_ALLOW_CREDENTIALS = True
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'dj_rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    'corsheaders',
    'django_filters',
    'user',
    'partner',
    'payment',
    'common'
]

SITE_ID = 1
ACCOUNT_EMAIL_VERIFICATION = 'none'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.locale.LocaleMiddleware'
]


APPEND_SLASH = True

ROOT_URLCONF = 'django_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'staticfiles', 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': ({
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
        } if config('DEBUG', default=False, cast=bool)
        else dj_database_url.parse(config('DATABASE_URL', default=''))
    )
}

if 'test' in sys.argv:
    DATABASES['default']['ENGINE'] = 'django.db.backends.sqlite3'

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.'
                'NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LANGUAGES = [
    ('en', _('English')),
    ('kk', _('Kazakh')),
    ('ru', _('Russian')),
]

LOCALE_PATHS = [
    BASE_DIR / 'locale',
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

STATIC_PATH = config('STATIC_PATH', default='staticfiles')
STATIC_ROOT = BASE_DIR / STATIC_PATH
WHITENOISE_ROOT = BASE_DIR / STATIC_PATH / 'build'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
