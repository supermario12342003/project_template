s3_connection = boto.connect_s3()
    bucket = s3_connection.get_bucket('your bucket name')
    key = boto.s3.key.Key(bucket, 'some_file.zip')
    with open('some_file.zip') as f:
        key.send_file(f)