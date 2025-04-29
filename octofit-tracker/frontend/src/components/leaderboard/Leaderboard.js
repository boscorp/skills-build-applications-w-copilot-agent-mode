import React, { useState, useEffect } from 'react';
import config from '../../config';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState({
    individuals: [],
    teams: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('individual');
  const [timeRange, setTimeRange] = useState('week');
  const [currentUserId] = useState(3); // Mock current user ID - normally would come from auth

  useEffect(() => {
    // Fetch leaderboard data from the backend API
    fetch(`${config.API_BASE_URL}/api/leaderboard/`, config.API_OPTIONS)
      .then(response => response.json())
      .then(data => {
        // If no data is returned or there's an error, use sample data
        if (Array.isArray(data) && data.length > 0) {
          // Organize data into individuals and teams
          const individuals = data.filter(item => item.type === 'individual');
          const teams = data.filter(item => item.type === 'team');
          setLeaderboardData({ individuals, teams });
        } else {
          setLeaderboardData(getSampleLeaderboardData());
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
        setLeaderboardData(getSampleLeaderboardData());
        setLoading(false);
      });
  }, []);

  // Sample leaderboard data for development
  const getSampleLeaderboardData = () => {
    return {
      individuals: [
        { id: 1, name: "Emma Johnson", grade: "10th", points: 482, activities: 12, streak: 5, rank: 1, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 2, name: "Tyler Williams", grade: "11th", points: 435, activities: 10, streak: 3, rank: 2, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 3, name: "Sofia Rodriguez", grade: "9th", points: 421, activities: 9, streak: 7, rank: 3, avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
        { id: 4, name: "Marcus Chen", grade: "12th", points: 387, activities: 8, streak: 2, rank: 4, avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
        { id: 5, name: "Olivia Davis", grade: "10th", points: 356, activities: 7, streak: 4, rank: 5, avatar: "https://randomuser.me/api/portraits/women/17.jpg" },
        { id: 6, name: "Ethan Brown", grade: "11th", points: 342, activities: 9, streak: 2, rank: 6, avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
        { id: 7, name: "Isabella Martinez", grade: "9th", points: 325, activities: 8, streak: 1, rank: 7, avatar: "https://randomuser.me/api/portraits/women/90.jpg" },
        { id: 8, name: "Noah Wilson", grade: "10th", points: 298, activities: 6, streak: 3, rank: 8, avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
        { id: 9, name: "Sophia Garcia", grade: "12th", points: 276, activities: 5, streak: 2, rank: 9, avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
        { id: 10, name: "Liam Taylor", grade: "11th", points: 254, activities: 7, streak: 0, rank: 10, avatar: "https://randomuser.me/api/portraits/men/17.jpg" }
      ],
      teams: [
        { id: 1, name: "Sophomore Eagles", members: 12, points: 1425, activities: 45, rank: 1, logo: "🦅" },
        { id: 2, name: "Junior Wolves", members: 10, points: 1350, activities: 40, rank: 2, logo: "🐺" },
        { id: 3, name: "Senior Tigers", members: 8, points: 1120, activities: 35, rank: 3, logo: "🐯" },
        { id: 4, name: "Freshman Phoenix", members: 15, points: 980, activities: 32, rank: 4, logo: "🔥" },
        { id: 5, name: "Teachers United", members: 6, points: 820, activities: 25, rank: 5, logo: "📚" }
      ]
    };
  };

  const getTimeRangeText = () => {
    switch (timeRange) {
      case 'day':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'year':
        return 'This Year';
      default:
        return 'All Time';
    }
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
    <div className="leaderboard fade-in">
      <div className="app-logo mb-4">
        <img src="/octofitapp-logo.png" alt="OctoFit Logo" />
        <h1>Leaderboard</h1>
      </div>
      
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Fitness Rankings - {getTimeRangeText()}</h5>
            <div className="time-range-selector">
              <select 
                className="form-select form-select-sm bg-light text-primary" 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'individual' ? 'active' : ''}`}
                onClick={() => setActiveTab('individual')}
              >
                <i className="fas fa-user me-2"></i>
                Individual Rankings
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
                onClick={() => setActiveTab('team')}
              >
                <i className="fas fa-users me-2"></i>
                Team Rankings
              </button>
            </li>
          </ul>

          {activeTab === 'individual' && (
            <div className="tab-pane fade show active">
              <div className="table-responsive">
                <table className="ranking-table">
                  <thead>
                    <tr>
                      <th className="text-center">Rank</th>
                      <th>Student</th>
                      <th className="text-center">Points</th>
                      <th className="text-center">Activities</th>
                      <th className="text-center streak-col">Streak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.individuals.map((person) => (
                      <tr 
                        key={person.id} 
                        className={person.id === currentUserId ? 'current-user' : ''}
                      >
                        <td className={`position text-center position-${person.rank}`}>
                          {person.rank}
                        </td>
                        <td>
                          <div className="user-info">
                            <img 
                              src={person.avatar} 
                              alt={person.name} 
                              className="avatar" 
                            />
                            <div>
                              <p className="name">{person.name}</p>
                              <p className="grade">{person.grade} Grade</p>
                              {person.streak > 0 && (
                                <div className="streak">
                                  <i className="fas fa-fire"></i> {person.streak} day streak
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="points">{person.points}</div>
                        </td>
                        <td className="text-center">
                          <div className="stats">{person.activities}</div>
                        </td>
                        <td className="text-center streak-col">
                          <div className="stats">
                            {person.streak > 0 ? (
                              <span><i className="fas fa-fire text-danger"></i> {person.streak}</span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="tab-pane fade show active">
              <div className="table-responsive">
                <table className="ranking-table">
                  <thead>
                    <tr>
                      <th className="text-center">Rank</th>
                      <th>Team</th>
                      <th className="text-center">Members</th>
                      <th className="text-center">Points</th>
                      <th className="text-center">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.teams.map((team) => (
                      <tr key={team.id}>
                        <td className={`position text-center position-${team.rank}`}>
                          {team.rank}
                        </td>
                        <td>
                          <div className="user-info">
                            <div className="team-logo">{team.logo}</div>
                            <p className="name">{team.name}</p>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="stats">{team.members}</div>
                        </td>
                        <td className="text-center">
                          <div className="points">{team.points}</div>
                        </td>
                        <td className="text-center">
                          <div className="stats">{team.activities}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
