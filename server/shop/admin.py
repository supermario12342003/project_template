from django.contrib import admin
from shop.models import Shop, ShopCategory
from core.utils.email import send_email
import pdb

class ShopAdmin(admin.ModelAdmin):
	fieldsets = (
		(None, {
			'fields': ('name', 'address', 'lat', 'lng', 'category')
		}),
		('Approval options', {
			'classes': ('collapse', 'wide', 'extrapretty'),
			'fields': ('validated', 'rejected', 'reject_reason'),
		}),
	)
	list_display = ('name', 'seller', 'validated')

	def save_model(self, request, obj, form, change):
		if change and obj.validated == True and obj.rejected == False:
			link = "http://www.google.com"
			send_email("Shop Details Updated", 
					{'link':link},
					[obj.seller.email],
					'emails/shop/details_updated.txt',
				)
		elif change and obj.rejected == True:
			obj.validated = False
			link = "http://www.google.com"
			send_email("Shop Is Rejected", 
					{
						'link':link,
						'reject_reason': obj.reject_reason,
					},
					[obj.seller.email],
					'emails/shop/rejected.txt',
				)
		super(ShopAdmin, self).save_model(request, obj, form, change)

class ShopCategoryAdmin(admin.ModelAdmin):
	pass
admin.site.register(Shop, ShopAdmin)
admin.site.register(ShopCategory, ShopCategoryAdmin)