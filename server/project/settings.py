import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_BASE_DIR = os.path.dirname(BASE_DIR)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DATABASE_NAME', '-ossvleqdob%w2z+*u+k5d9t^=ml+)ugpjsdc_$%#zi^4lo!db')

DEBUG = os.environ.get('DEBUG', False)
DEBUG_LOCAL = os.environ.get('DEBUG_LOCAL', False)
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'rest_framework.authtoken',
	'rest_framework',
	'storages',
	'core',
	'account',
]

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'core.middleware.LocaleMiddleware',
	'corsheaders.middleware.CorsMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.jinja2.Jinja2',
		'DIRS': ['jinja2'],
		'APP_DIRS': True,
		'OPTIONS': {
			'variable_start_string': '[{',
			'variable_end_string': '}]',
		},
	},
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': ['templates'],
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

WSGI_APPLICATION = 'project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

if DEBUG_LOCAL:
	DATABASES = {
		'default': {
        	'ENGINE': 'django.db.backends.sqlite3',
        	'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    	}
    }
else:
	DATABASES = {
		'default': {
			'ENGINE': 'django.db.backends.postgresql_psycopg2',
			'NAME': os.environ.get('DATABASE_NAME', ''),
			'USER': os.environ.get('DATABASE_USER', ''),
			'PASSWORD': os.environ.get('DATABASE_PASSWORD', ''),
			'HOST': os.environ.get('DATABASE_HOST', ''),
			'PORT': os.environ.get('DATABASE_PORT', ''),
		}
	}

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]

REST_FRAMEWORK = {
	'DEFAULT_AUTHENTICATION_CLASSES': (
		'rest_framework.authentication.TokenAuthentication',
		'rest_framework.authentication.SessionAuthentication',
	),
	# Use hyperlinked styles by default.
	# Only used if the `serializer_class` attribute is not set on a view.
	'DEFAULT_MODEL_SERIALIZER_CLASS':
		'rest_framework.serializers.HyperlinkedModelSerializer',

	# Use Django's standard `django.contrib.auth` permissions,
	# or allow read-only access for unauthenticated users.
	'DEFAULT_PERMISSION_CLASSES': [
		'rest_framework.permissions.IsAdminUser'
	],
	
	'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
	'PAGE_SIZE': 10
}


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

LANGUAGES = (
	 ('fr', 'French'),
	 ('en', 'English'),
)
LOCALE_PATHS = (
	os.path.join(BASE_DIR, 'locale/'),
)

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Custom user
AUTH_USER_MODEL = 'account.Account'

CORS_ORIGIN_WHITELIST = os.environ.get('CORS_ORIGIN_WHITELIST', '')

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATICFILES_DIRS = [
	os.path.join(BASE_BASE_DIR, 'client/'),
]

if DEBUG:
	AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME_PREPROD']
	STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles/')
	STATIC_URL = '/static/'
	STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
else:
	AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
	STATIC_URL = '/static/'
	STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles/')
	STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
	#STATIC_ROOT = '/static/'
	#STATICFILES_STORAGE = 'core.utils.s3.StaticRootS3BotoStorage'
	#STATIC_URL = 'http://%s.s3.amazonaws.com%s'  % (AWS_STORAGE_BUCKET_NAME, STATIC_ROOT)


MEDIA_ROOT = '/media/'
DEFAULT_FILE_STORAGE = 'core.utils.s3.MediaRootS3BotoStorage'
AWS_QUERYSTRING_AUTH = False
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
MEDIA_URL = 'http://%s.s3.amazonaws.com%s'  % (AWS_STORAGE_BUCKET_NAME, MEDIA_ROOT)

TASK_UPLOAD_FILE_MAX_SIZE = 512000
