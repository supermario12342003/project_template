
from django.utils import translation
from django.utils.deprecation import MiddlewareMixin

supported_language = ['fr', 'en']

class LocaleMiddleware(MiddlewareMixin):
    """
    This is a very simple middleware that parses a request
    and decides what translation object to install in the current
    thread context. This allows pages to be dynamically
    translated to the language the user desires (if the language
    is available, of course).
    """

    def process_request(self, request):
        language = request.COOKIES.get('language', '')
        if language and language[:2] in supported_language: 
            translation.activate(language[:2])
            request.LANGUAGE_CODE = translation.get_language()