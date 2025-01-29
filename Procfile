release: cd django_api && python manage.py makemigrations && python manage.py migrate
web: cd django_api && gunicorn django_api.wsgi