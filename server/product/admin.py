from django.contrib import admin
from product.models import Product
from core.utils.email import send_email
import pdb

class ProductAdmin(admin.ModelAdmin):
	fieldsets = (
		(None, {
			'fields': ('name', 'shop')
		}),
		('Approval options', {
			'classes': ('collapse', 'wide', 'extrapretty'),
			'fields': ('validated', 'rejected', 'reject_reason'),
		}),
	)
	list_display = ('name', 'shop', 'validated')

	def save_model(self, request, obj, form, change):
		if change and obj.validated == True and obj.rejected == False:
			link = "http://www.google.com"
			send_email("Product Details Updated", 
					{'link':link},
					[obj.shop.seller.email],
					'emails/shop/details_updated.txt',
				)
		elif change and obj.rejected == True:
			obj.validated = False
			link = "http://www.google.com"
			send_email("Product Is Rejected", 
					{
						'link':link,
						'reject_reason': obj.reject_reason,
					},
					[obj.shop.seller.email],
					'emails/shop/rejected.txt',
				)
		super(ProductAdmin, self).save_model(request, obj, form, change)

admin.site.register(Product, ProductAdmin)
