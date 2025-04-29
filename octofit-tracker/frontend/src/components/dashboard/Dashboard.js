import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import config from '../../config';
import './Dashboard.css';

// Register Chart.js components
Chart.register(...registerables);

function Dashboard() {
  const [userStats, setUserStats] = useState({
    activitiesCompleted: 0,
    totalMinutes: 0,
    teamRank: 0,
    personalRank: 0
  });
  
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingWorkouts, setUpcomingWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  
  useEffect(() => {
    // Fetch dashboard data from the API
    Promise.all([
      fetch(`${config.API_BASE_URL}/api/dashboard/stats/`, config.API_OPTIONS)
        .then(response => response.json())
        .catch(error => {
          console.error("Error fetching user stats:", error);
          return {
            activitiesCompleted: 12,
            totalMinutes: 480,
            teamRank: 2,
            personalRank: 15
          };
        }),
      fetch(`${config.API_BASE_URL}/api/activities/recent/`, config.API_OPTIONS)
        .then(response => response.json())
        .catch(error => {
          console.error("Error fetching recent activities:", error);
          return [
            { id: 1, type: 'Running', duration: '30 minutes', date: '2025-04-26' },
            { id: 2, type: 'Swimming', duration: '45 minutes', date: '2025-04-25' },
            { id: 3, type: 'Basketball', duration: '60 minutes', date: '2025-04-23' }
          ];
        }),
      fetch(`${config.API_BASE_URL}/api/workouts/upcoming/`, config.API_OPTIONS)
        .then(response => response.json())
        .catch(error => {
          console.error("Error fetching upcoming workouts:", error);
          return [
            { id: 1, name: 'Morning Run', scheduled: '2025-04-29', type: 'Cardio' },
            { id: 2, name: 'Weight Training', scheduled: '2025-04-30', type: 'Strength' }
          ];
        })
    ]).then(([stats, activities, workouts]) => {
      setUserStats(stats);
      setRecentActivities(activities);
      setUpcomingWorkouts(workouts);
      setLoading(false);
      
      // Initialize the activity chart after data is loaded
      setTimeout(() => {
        if (document.getElementById('activityChart')) {
          initActivityChart();
        }
      }, 100);
    });
  }, []);
  
  const initActivityChart = () => {
    const ctx = document.getElementById('activityChart');
    
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'This Week',
            data: [30, 45, 0, 60, 25, 90, 0],
            backgroundColor: 'rgba(48, 102, 190, 0.7)',
            borderColor: 'rgba(48, 102, 190, 1)',
            borderWidth: 1
          },
          {
            label: 'Last Week',
            data: [20, 35, 40, 20, 45, 30, 50],
            backgroundColor: 'rgba(108, 117, 125, 0.7)',
            borderColor: 'rgba(108, 117, 125, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Minutes'
            }
          }
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard fade-in">
      <div className="app-logo mb-4">
        <img src="/octofitapp-logo.png" alt="OctoFit Logo" />
        <h1>Your Dashboard</h1>
      </div>
      
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="stats-card">
            <div className="stats-icon">
              <i className="fas fa-running"></i>
            </div>
            <h3>{userStats.activitiesCompleted}</h3>
            <p>Activities Completed</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-card">
            <div className="stats-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>{userStats.totalMinutes}</h3>
            <p>Total Minutes</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-card">
            <div className="stats-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>#{userStats.teamRank}</h3>
            <p>Team Rank</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stats-card">
            <div className="stats-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <h3>#{userStats.personalRank}</h3>
            <p>Personal Rank</p>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Activity Overview</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <canvas id="activityChart" height="200"></canvas>
                  <div className="text-center mt-3">
                    <div className="badge bg-primary me-2">This Week</div>
                    <div className="badge bg-secondary me-2">Last Week</div>
                    <div className="badge bg-info">Monthly Average</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Recent Activities</h5>
            </div>
            <div className="card-body">
              {recentActivities.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Activity Type</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td>
                            <span className="d-flex align-items-center">
                              {activity.type === 'Running' && <i className="fas fa-running me-2 text-primary"></i>}
                              {activity.type === 'Swimming' && <i className="fas fa-swimmer me-2 text-primary"></i>}
                              {activity.type === 'Basketball' && <i className="fas fa-basketball-ball me-2 text-primary"></i>}
                              {activity.type === 'Cycling' && <i className="fas fa-bicycle me-2 text-primary"></i>}
                              {activity.type === 'Yoga' && <i className="fas fa-pray me-2 text-primary"></i>}
                              {activity.type}
                            </span>
                          </td>
                          <td>{activity.duration}</td>
                          <td>{activity.date}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  No recent activities found.
                </div>
              )}
              <div className="text-center mt-3">
                <Link to="/activities" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i> Log New Activity
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Your Team</h5>
            </div>
            <div className="card-body text-center">
              <div className="team-avatar mb-3">
                <i className="fas fa-users fa-3x text-primary"></i>
              </div>
              <h4>Sophomore Eagles</h4>
              <div className="badge bg-success mb-3">Rank #{userStats.teamRank}</div>
              <p className="text-muted">You've contributed 25% of your team's points this month!</p>
              <Link to="/teams" className="btn btn-primary">
                <i className="fas fa-users me-2"></i> View Team
              </Link>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Upcoming Workouts</h5>
            </div>
            <div className="card-body">
              {upcomingWorkouts.length > 0 ? (
                <ul className="list-group">
                  {upcomingWorkouts.map(workout => (
                    <li key={workout.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold">{workout.name}</div>
                        <div className="small text-muted">{workout.scheduled}</div>
                      </div>
                      <span className={`badge bg-${workout.type === 'Cardio' ? 'info' : 'warning'}`}>
                        {workout.type}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="alert alert-info">No upcoming workouts scheduled.</div>
              )}
              <div className="text-center mt-3">
                <Link to="/workouts" className="btn btn-primary">
                  <i className="fas fa-dumbbell me-2"></i> View All Workouts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
