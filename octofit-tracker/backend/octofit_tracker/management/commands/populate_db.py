from django.core.management.base import BaseCommand
from datetime import timedelta
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId

class Command(BaseCommand):
    help = 'Populate the database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data with cascading delete
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create test users with explicit save to ensure primary keys are generated
        users = []
        for i in range(1, 20):
            user = User(username=f'user{i}', email=f'user{i}@example.com', password='password123')
            user.save()
            users.append(user)

        # Create test teams
        team1 = Team.objects.create(name='Team Alpha')
        team2 = Team.objects.create(name='Team Beta')
        team3 = Team.objects.create(name='Team Gamma')

        team1.members.add(*users[:5])
        team2.members.add(*users[5:10])
        team3.members.add(*users[10:15])

        # Create test activities with explicit _id values
        activities = [
            Activity(_id=ObjectId(), user=users[0], activity_id='activity1', activity_type='Running', duration=timedelta(minutes=30)),
            Activity(_id=ObjectId(), user=users[1], activity_id='activity2', activity_type='Cycling', duration=timedelta(hours=1)),
            Activity(_id=ObjectId(), user=users[2], activity_id='activity3', activity_type='Swimming', duration=timedelta(minutes=45)),
            Activity(_id=ObjectId(), user=users[3], activity_id='activity4', activity_type='Hiking', duration=timedelta(hours=2)),
            Activity(_id=ObjectId(), user=users[4], activity_id='activity5', activity_type='Yoga', duration=timedelta(minutes=40)),
        ]
        Activity.objects.bulk_create(activities)

        # Create test leaderboard entries with explicit _id values
        leaderboard_entries = [
            Leaderboard(_id=ObjectId(), user=users[0], leaderboard_id='leaderboard1', score=100),
            Leaderboard(_id=ObjectId(), user=users[1], leaderboard_id='leaderboard2', score=150),
            Leaderboard(_id=ObjectId(), user=users[2], leaderboard_id='leaderboard3', score=200),
            Leaderboard(_id=ObjectId(), user=users[3], leaderboard_id='leaderboard4', score=250),
            Leaderboard(_id=ObjectId(), user=users[4], leaderboard_id='leaderboard5', score=300),
        ]
        Leaderboard.objects.bulk_create(leaderboard_entries)

        # Create test workouts with explicit _id values
        workouts = [
            Workout(_id=ObjectId(), workout_id='workout1', name='Morning Yoga', description='A relaxing yoga session to start the day.'),
            Workout(_id=ObjectId(), workout_id='workout2', name='HIIT', description='High-Intensity Interval Training for advanced users.'),
            Workout(_id=ObjectId(), workout_id='workout3', name='Evening Stretch', description='A calming stretch routine to end the day.'),
            Workout(_id=ObjectId(), workout_id='workout4', name='Cardio Blast', description='A high-energy cardio workout for all levels.'),
            Workout(_id=ObjectId(), workout_id='workout5', name='Strength Training', description='A workout focused on building strength.'),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data.'))
