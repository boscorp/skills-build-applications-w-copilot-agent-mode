from django.core.management.base import BaseCommand
from datetime import timedelta
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the database with test data'

    def handle(self, *args, **kwargs):
        # Explicitly specify the collection names
        User._meta.db_table = 'users'
        Team._meta.db_table = 'teams'
        Activity._meta.db_table = 'activity'
        Leaderboard._meta.db_table = 'leaderboard'
        Workout._meta.db_table = 'workouts'

        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create test users
        user1 = User.objects.create(username='john_doe', email='john@example.com', password='password123')
        user2 = User.objects.create(username='jane_doe', email='jane@example.com', password='password123')

        # Add more test users
        user3 = User.objects.create(username='alice_smith', email='alice@example.com', password='password123')
        user4 = User.objects.create(username='bob_jones', email='bob@example.com', password='password123')

        # Create test teams
        team1 = Team.objects.create(name='Team Alpha')
        team1.members.add(user1, user2)

        # Add more test teams
        team2 = Team.objects.create(name='Team Beta')
        team2.members.add(user3, user4)

        # Create test activities
        Activity.objects.create(user=user1, activity_id='activity1', activity_type='Running', duration=timedelta(minutes=30))
        Activity.objects.create(user=user2, activity_id='activity2', activity_type='Cycling', duration=timedelta(hours=1))

        # Add more test activities
        Activity.objects.create(user=user3, activity_id='activity3', activity_type='Swimming', duration=timedelta(minutes=45))
        Activity.objects.create(user=user4, activity_id='activity4', activity_type='Hiking', duration=timedelta(hours=2))

        # Create test leaderboard entries
        Leaderboard.objects.create(user=user1, leaderboard_id='leaderboard1', score=100)
        Leaderboard.objects.create(user=user2, leaderboard_id='leaderboard2', score=150)

        # Add more test leaderboard entries
        Leaderboard.objects.create(user=user3, leaderboard_id='leaderboard3', score=200)
        Leaderboard.objects.create(user=user4, leaderboard_id='leaderboard4', score=250)

        # Create test workouts
        Workout.objects.create(workout_id='workout1', name='Morning Yoga', description='A relaxing yoga session to start the day.')
        Workout.objects.create(workout_id='workout2', name='HIIT', description='High-Intensity Interval Training for advanced users.')

        # Add more test workouts
        Workout.objects.create(workout_id='workout3', name='Evening Stretch', description='A calming stretch routine to end the day.')
        Workout.objects.create(workout_id='workout4', name='Cardio Blast', description='A high-energy cardio workout for all levels.')

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
