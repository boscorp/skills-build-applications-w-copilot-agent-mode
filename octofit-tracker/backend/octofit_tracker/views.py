from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from .models import User, Team, Activity, Leaderboard, Workout
import random

@api_view(['GET'])
def api_root(request, format=None):
    base_url = 'https://fuzzy-fiesta-4gv6jqqgqp534gj-8000.app.github.dev/'
    return Response({
        'users': base_url + 'api/users/',
        'teams': base_url + 'api/teams/',
        'activities': base_url + 'api/activities/',
        'leaderboard': base_url + 'api/leaderboard/',
        'workouts': base_url + 'api/workouts/',
        'dashboard': {
            'stats': base_url + 'api/dashboard/stats/',
            'recent_activities': base_url + 'api/activities/recent/',
            'upcoming_workouts': base_url + 'api/workouts/upcoming/'
        }
    })

@api_view(['GET'])
def dashboard_stats(request):
    """Provide statistics for the user dashboard"""
    # For demo purposes, we're returning mock data
    # In a real app, this would be calculated from actual user data
    return Response({
        "activitiesCompleted": random.randint(8, 15),
        "totalMinutes": random.randint(400, 600),
        "teamRank": random.randint(1, 5),
        "personalRank": random.randint(10, 20)
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    @action(detail=False, methods=['get'], url_path='recent')
    def recent_activities(self, request):
        """Get recent activities for the current user"""
        # Mock data for demo purposes
        activities = [
            {"id": 1, "type": "Running", "duration": "30 minutes", "date": "2025-04-26"},
            {"id": 2, "type": "Swimming", "duration": "45 minutes", "date": "2025-04-25"},
            {"id": 3, "type": "Basketball", "duration": "60 minutes", "date": "2025-04-23"},
            {"id": 4, "type": "Cycling", "duration": "50 minutes", "date": "2025-04-22"}
        ]
        return Response(activities)

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    
    @action(detail=False, methods=['get'], url_path='upcoming')
    def upcoming_workouts(self, request):
        """Get upcoming workouts for the current user"""
        # Mock data for demo purposes
        upcoming = [
            {"id": 1, "name": "Morning Run", "scheduled": "2025-04-29", "type": "Cardio"},
            {"id": 2, "name": "Weight Training", "scheduled": "2025-04-30", "type": "Strength"},
            {"id": 3, "name": "Yoga Session", "scheduled": "2025-05-01", "type": "Flexibility"}
        ]
        return Response(upcoming)
