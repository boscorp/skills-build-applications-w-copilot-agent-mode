from django.core.management.base import BaseCommand
from datetime import timedelta
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId
import random

class Command(BaseCommand):
    help = 'Populate the database with test data for Merington High School OctoFit Tracker'

    def handle(self, *args, **kwargs):
        # Clear existing data with cascading delete
        self.stdout.write(self.style.WARNING('Clearing all existing data...'))
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Database cleared successfully.'))

        # Create students with different grades and classes
        self.stdout.write(self.style.WARNING('Creating student users...'))
        students = []
        
        # Create 9th grade students
        grade9_names = ['Emma Johnson', 'Michael Smith', 'Sophia Garcia', 'Ethan Wilson', 'Olivia Brown']
        for i, name in enumerate(grade9_names):
            username = name.lower().replace(' ', '_')
            email = f"{username}@meringtonhigh.edu"
            student = User(username=username, email=email, password='student123')
            student.save()
            students.append(student)

        # Create 10th grade students
        grade10_names = ['Ava Martinez', 'Noah Taylor', 'Isabella Anderson', 'Liam Thomas', 'Mia Rodriguez']
        for i, name in enumerate(grade10_names):
            username = name.lower().replace(' ', '_')
            email = f"{username}@meringtonhigh.edu"
            student = User(username=username, email=email, password='student123')
            student.save()
            students.append(student)

        # Create 11th grade students
        grade11_names = ['Charlotte Lee', 'William Clark', 'Amelia Walker', 'James Hall', 'Harper Young']
        for i, name in enumerate(grade11_names):
            username = name.lower().replace(' ', '_')
            email = f"{username}@meringtonhigh.edu"
            student = User(username=username, email=email, password='student123')
            student.save()
            students.append(student)

        # Create 12th grade students
        grade12_names = ['Abigail White', 'Benjamin King', 'Emily Scott', 'Alexander Green', 'Elizabeth Adams']
        for i, name in enumerate(grade12_names):
            username = name.lower().replace(' ', '_')
            email = f"{username}@meringtonhigh.edu"
            student = User(username=username, email=email, password='student123')
            student.save()
            students.append(student)

        # Create faculty members
        self.stdout.write(self.style.WARNING('Creating faculty users...'))
        faculty_names = ['Dr. Robert Chen', 'Prof. Sarah Miller', 'Coach David Thompson', 'Ms. Jennifer Parker']
        faculty = []
        for i, name in enumerate(faculty_names):
            username = name.lower().replace(' ', '_').replace('.', '')
            email = f"{username}@meringtonhigh.edu"
            faculty_member = User(username=username, email=email, password='faculty123')
            faculty_member.save()
            faculty.append(faculty_member)

        # Create class teams
        self.stdout.write(self.style.WARNING('Creating teams...'))
        team_freshmen = Team.objects.create(name='Freshmen Falcons')
        team_sophomore = Team.objects.create(name='Sophomore Eagles')
        team_junior = Team.objects.create(name='Junior Hawks')
        team_senior = Team.objects.create(name='Senior Owls')
        team_faculty = Team.objects.create(name='Faculty Phoenixes')

        # Add members to teams
        team_freshmen.members.add(*students[:5])  # 9th grade
        team_sophomore.members.add(*students[5:10])  # 10th grade
        team_junior.members.add(*students[10:15])  # 11th grade
        team_senior.members.add(*students[15:20])  # 12th grade
        team_faculty.members.add(*faculty)  # Faculty

        # Create varied activities for different users
        self.stdout.write(self.style.WARNING('Creating student activities...'))
        activity_types = ['Running', 'Swimming', 'Cycling', 'Basketball', 'Soccer', 
                         'Volleyball', 'Tennis', 'Weight Training', 'Yoga', 'Dance']
        
        activity_counter = 1
        all_activities = []

        # Student activities
        for student in students:
            # Each student gets 2-4 random activities
            num_activities = random.randint(2, 4)
            for _ in range(num_activities):
                activity_type = random.choice(activity_types)
                duration_minutes = random.randint(15, 120)
                activity = Activity(
                    _id=ObjectId(),
                    user=student,
                    activity_id=f'activity{activity_counter}',
                    activity_type=activity_type,
                    duration=timedelta(minutes=duration_minutes)
                )
                all_activities.append(activity)
                activity_counter += 1

        # Faculty activities
        self.stdout.write(self.style.WARNING('Creating faculty activities...'))
        for teacher in faculty:
            # Each faculty member gets 1-3 activities
            num_activities = random.randint(1, 3)
            for _ in range(num_activities):
                activity_type = random.choice(activity_types)
                duration_minutes = random.randint(20, 90)
                activity = Activity(
                    _id=ObjectId(),
                    user=teacher,
                    activity_id=f'activity{activity_counter}',
                    activity_type=activity_type,
                    duration=timedelta(minutes=duration_minutes)
                )
                all_activities.append(activity)
                activity_counter += 1

        # Bulk create activities
        Activity.objects.bulk_create(all_activities)
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_activities)} activities.'))

        # Create leaderboard entries with scores based on activities
        self.stdout.write(self.style.WARNING('Creating leaderboard entries...'))
        leaderboard_entries = []
        leaderboard_counter = 1
        
        for user in students + faculty:
            # Calculate score based on number of activities and their duration
            user_activities = [a for a in all_activities if a.user == user]
            base_score = len(user_activities) * 50
            duration_bonus = sum(a.duration.total_seconds() // 60 for a in user_activities)
            total_score = base_score + int(duration_bonus)
            
            leaderboard = Leaderboard(
                _id=ObjectId(),
                user=user,
                leaderboard_id=f'leaderboard{leaderboard_counter}',
                score=total_score
            )
            leaderboard_entries.append(leaderboard)
            leaderboard_counter += 1
            
        # Bulk create leaderboard entries
        Leaderboard.objects.bulk_create(leaderboard_entries)
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries.'))

        # Create diverse workout programs
        self.stdout.write(self.style.WARNING('Creating workout programs...'))
        workouts = [
            Workout(_id=ObjectId(), workout_id='workout1', name='Morning Energizer', 
                   description='Start your day with this 20-minute energizing routine featuring dynamic stretches and light cardio.'),
            Workout(_id=ObjectId(), workout_id='workout2', name='Basketball Skills Training', 
                   description='Improve your basketball fundamentals with dribbling, shooting, and agility drills.'),
            Workout(_id=ObjectId(), workout_id='workout3', name='Swimming Endurance', 
                   description='Build swimming stamina with this varied pool workout featuring different strokes and intervals.'),
            Workout(_id=ObjectId(), workout_id='workout4', name='Core Strength Builder', 
                   description='Develop a strong core with this comprehensive circuit targeting abs, lower back, and obliques.'),
            Workout(_id=ObjectId(), workout_id='workout5', name='Track & Field Sprints', 
                   description='Enhance speed and explosiveness with this track workout featuring various sprint distances and recovery periods.'),
            Workout(_id=ObjectId(), workout_id='workout6', name='Flexibility & Balance', 
                   description='Improve overall flexibility and balance with yoga-inspired poses and gentle stretching.'),
            Workout(_id=ObjectId(), workout_id='workout7', name='Soccer Drills', 
                   description='Enhance your soccer skills with passing, shooting, and ball control exercises.'),
            Workout(_id=ObjectId(), workout_id='workout8', name='Bodyweight Circuit', 
                   description='A full-body workout using just your bodyweight, perfect for building strength with minimal equipment.')
        ]
        Workout.objects.bulk_create(workouts)
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workout programs.'))

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data for Merington High School OctoFit Tracker.'))
