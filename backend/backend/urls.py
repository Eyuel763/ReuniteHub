"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from moderation.views import ModerationViewSet
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from moderation.views import ModerationViewSet

router = routers.DefaultRouter()
router.register(r'moderation', ModerationViewSet, basename='moderation')

# Swagger schema view
schema_view = get_schema_view(
    openapi.Info(
        title="ReuniteHub API",
        default_version='v1',
        description="API documentation for ReuniteHub",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="support@reunitehub.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [ 
    path('admin/', admin.site.urls),
   
    path('auth/', include('authentication.urls')), 
   
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    path('accounts/', include('allauth.urls')),  # Allauth URLs
    path('api/', include(router.urls)),
    path('api/missing_persons', include('missing_persons.urls')),
    path('api/volunteers/', include('volunteers.urls')),
    path('api/alert/', include('alert.urls')),

    
    # Swagger and ReDoc URLs
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)