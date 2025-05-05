from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_GET
import random
import string

User = get_user_model()

@require_GET
def check_username(request):
    username = request.GET.get('username', '').strip()

    if len(username) < 3:
        return JsonResponse({'available': False, 'message': 'Minimum 3 characters required'}, status=400)

    if User.objects.filter(username=username).exists():
        # Suggest alternatives
        suggestions = [f"{username}{random.randint(1, 999)}" for _ in range(3)]
        return JsonResponse({
            'available': False,
            'message': 'Username already taken',
            'suggestions': suggestions
        })

    return JsonResponse({'available': True, 'message': 'Username is available'})
