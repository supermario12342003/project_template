"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.views.static import serve
from core.views import SampleView, AngularApp, NgTemplateView
from account.urls import router as account_router
from product.urls import router as product_router
from shop.urls import router as shop_router
from rest_framework import routers

router = routers.DefaultRouter()
router.registry.extend(account_router.registry)
router.registry.extend(shop_router.registry)
router.registry.extend(product_router.registry)

ngurls = [
    url(r'^$', SampleView.as_view(), name='sample'),
    url(r'^ng/$', NgTemplateView.as_view(), name='ngTemplate'),
]

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^sample/', include(ngurls)),
    url(r'^(?!' + settings.STATIC_URL + ').*$', AngularApp.as_view(), name="angular_app"),
]
