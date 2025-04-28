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

        # Redefine user5 through user14
        user5 = User.objects.create(username='charlie_brown', email='charlie@example.com', password='password123')
        user6 = User.objects.create(username='diana_prince', email='diana@example.com', password='password123')
        user7 = User.objects.create(username='edward_snow', email='edward@example.com', password='password123')
        user8 = User.objects.create(username='fiona_apple', email='fiona@example.com', password='password123')
        user9 = User.objects.create(username='george_clark', email='george@example.com', password='password123')
        user10 = User.objects.create(username='hannah_moore', email='hannah@example.com', password='password123')
        user11 = User.objects.create(username='ian_taylor', email='ian@example.com', password='password123')
        user12 = User.objects.create(username='julia_roberts', email='julia@example.com', password='password123')
        user13 = User.objects.create(username='kevin_bacon', email='kevin@example.com', password='password123')
        user14 = User.objects.create(username='lisa_kudrow', email='lisa@example.com', password='password123')

        # Add 5 more test users
        user15 = User.objects.create(username='michael_scott', email='michael@example.com', password='password123')
        user16 = User.objects.create(username='pam_beesly', email='pam@example.com', password='password123')
        user17 = User.objects.create(username='jim_halpert', email='jim@example.com', password='password123')
        user18 = User.objects.create(username='dwight_schrute', email='dwight@example.com', password='password123')
        user19 = User.objects.create(username='angela_martin', email='angela@example.com', password='password123')

        # Add 1 more test team
        team3 = Team.objects.create(name='Team Gamma')
        team3.members.add(user5, user6, user7, user8, user9, user10, user11, user12, user13, user14)

        # Define user3 and user4 before their usage
        user3 = User.objects.create(username='alice_smith', email='alice@example.com', password='password123')
        user4 = User.objects.create(username='bob_jones', email='bob@example.com', password='password123')

        # Update test activities with unique activity_id values
        Activity.objects.create(user=user1, activity_id='activity1', activity_type='Running', duration=timedelta(minutes=30))
        Activity.objects.create(user=user2, activity_id='activity2_unique', activity_type='Cycling', duration=timedelta(hours=1))
        Activity.objects.create(user=user3, activity_id='activity3', activity_type='Swimming', duration=timedelta(minutes=45))
        Activity.objects.create(user=user4, activity_id='activity4', activity_type='Hiking', duration=timedelta(hours=2))
        Activity.objects.create(user=user15, activity_id='activity15', activity_type='Yoga', duration=timedelta(minutes=40))

        # Create test leaderboard entries
        Leaderboard.objects.create(user=user1, leaderboard_id='leaderboard1', score=100)
        Leaderboard.objects.create(user=user2, leaderboard_id='leaderboard2', score=150)

        # Add more test leaderboard entries
        Leaderboard.objects.create(user=user3, leaderboard_id='leaderboard3', score=200)
        Leaderboard.objects.create(user=user4, leaderboard_id='leaderboard4', score=250)
        Leaderboard.objects.create(user=user15, leaderboard_id='leaderboard15', score=300)

        # Create test workouts
        Workout.objects.create(workout_id='workout1', name='Morning Yoga', description='A relaxing yoga session to start the day.')
        Workout.objects.create(workout_id='workout2', name='HIIT', description='High-Intensity Interval Training for advanced users.')

        # Add more test workouts
        Workout.objects.create(workout_id='workout3', name='Evening Stretch', description='A calming stretch routine to end the day.')
        Workout.objects.create(workout_id='workout4', name='Cardio Blast', description='A high-energy cardio workout for all levels.')
        Workout.objects.create(workout_id='workout5', name='Strength Training', description='A workout focused on building strength.')

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
