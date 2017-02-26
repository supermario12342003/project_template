from storages.backends.s3boto import S3BotoStorage
import boto
from django.conf import settings
import os, sys

StaticRootS3BotoStorage = lambda: S3BotoStorage(location='static')
MediaRootS3BotoStorage  = lambda: S3BotoStorage(location='media')

def upload(file, path, cb=None):
	s3_connection = boto.connect_s3(settings.AWS_ACCESS_KEY_ID, settings.AWS_SECRET_ACCESS_KEY)
	bucket = s3_connection.get_bucket(settings.AWS_STORAGE_BUCKET_NAME)
	key = boto.s3.key.Key(bucket, os.path.join(settings.MEDIA_ROOT, path))
	key.set_contents_from_file(file, cb=cb, num_cb=10)

def percent_cb(complete, total):
    sys.stdout.write('.')
    sys.stdout.flush()