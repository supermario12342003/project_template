from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings

def send_email(subject, context, to, template_txt, template_html=''):
	msg_plain = render_to_string(template_txt, context)
	if template_html:
		msg_html = render_to_string(template_html, context)
		send_mail(
		    subject,
		    msg_plain,
		    settings.DEFAULT_EMAIL,
		    to,
		    html_message=msg_html,
		    #fail_silently=True,
		)
	else:
		send_mail(
		    subject,
		    msg_plain,
		    settings.DEFAULT_EMAIL,
		    to,
		    #fail_silently=True,
		)