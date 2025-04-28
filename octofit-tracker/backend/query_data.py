import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
django.setup()

import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
django.setup()

from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from collections import defaultdict

def display_data():
    # Display Users by Role (students/faculty)
    print("\033[1;36m===== MERINGTON HIGH SCHOOL OCTOFIT TRACKER DATABASE =====\033[0m")
    
    print("\033[1;33m===== USERS =====\033[0m")
    print("\033[1;32m--- Students ---\033[0m")
    students = [u for u in User.objects.all() if 'student123' == u.password]
    for student in students:
        print(f"Name: {student.username.replace('_', ' ').title()}, Email: {student.email}")
    
    print("\n\033[1;32m--- Faculty ---\033[0m")
    faculty = [u for u in User.objects.all() if 'faculty123' == u.password]
    for f in faculty:
        print(f"Name: {f.username.replace('_', ' ').title().replace('Dr', 'Dr.')}, Email: {f.email}")
    
    # Display Teams and their members
    print("\n\033[1;33m===== TEAMS =====\033[0m")
    for team in Team.objects.all():
        members = [m.username.replace('_', ' ').title() for m in team.members.all()]
        print(f"\033[1;32m{team.name}\033[0m: {len(members)} members")
        for member in members:
            print(f"- {member}")
        print()
    
    # Display activities grouped by type
    print("\033[1;33m===== ACTIVITIES BY TYPE =====\033[0m")
    activities_by_type = defaultdict(list)
    for activity in Activity.objects.all():
        activities_by_type[activity.activity_type].append(activity)
    
    for activity_type, activities in sorted(activities_by_type.items()):
        print(f"\033[1;32m{activity_type}\033[0m: {len(activities)} activities")
        for a in activities[:3]:  # Show only first 3 of each type to avoid clutter
            user_name = a.user.username.replace('_', ' ').title()
            print(f"- {user_name}: {a.duration}")
        if len(activities) > 3:
            print(f"  ... and {len(activities) - 3} more")
        print()
    
    # Display Leaderboard (Top 10)
    print("\033[1;33m===== LEADERBOARD (TOP 10) =====\033[0m")
    leaderboard_entries = Leaderboard.objects.all().order_by('-score')[:10]
    for i, entry in enumerate(leaderboard_entries):
        user_name = entry.user.username.replace('_', ' ').title()
        print(f"{i+1}. {user_name}: {entry.score} points")
    
    # Display Workouts
    print("\n\033[1;33m===== WORKOUT PROGRAMS =====\033[0m")
    for workout in Workout.objects.all():
        print(f"\033[1;32m{workout.name}\033[0m")
        print(f"ID: {workout.workout_id}")
        print(f"Description: {workout.description}")
        print()
        
    # Display some statistics
    print("\033[1;33m===== STATISTICS =====\033[0m")
    print(f"Total Users: {User.objects.count()} ({len(students)} students, {len(faculty)} faculty members)")
    print(f"Total Teams: {Team.objects.count()}")
    print(f"Total Activities: {Activity.objects.count()}")
    print(f"Total Workouts: {Workout.objects.count()}")
    
    # Most popular activity type
    popular_activity = max(activities_by_type.items(), key=lambda x: len(x[1]))
    print(f"Most Popular Activity: {popular_activity[0]} ({len(popular_activity[1])} activities)")

if __name__ == "__main__":
    display_data()
