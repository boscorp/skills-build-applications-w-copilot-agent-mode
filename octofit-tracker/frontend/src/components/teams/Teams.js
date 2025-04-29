import React, { useState, useEffect } from 'react';
import config from '../../config';
import './Teams.css';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    mascot: '🏆',
    grade: '9',
    goal: ''
  });

  useEffect(() => {
    // Fetch teams from the backend API
    fetch(`${config.API_BASE_URL}/api/teams/`, config.API_OPTIONS)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTeams(data);
        } else {
          setTeams(getSampleTeams());
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setTeams(getSampleTeams());
        setLoading(false);
      });
  }, []);

  const getSampleTeams = () => {
    return [
      {
        id: 1,
        name: 'Sophomore Eagles',
        description: 'A team of motivated 10th graders aiming to win the school fitness challenge.',
        mascot: '🦅',
        grade: '10',
        goal: 'Win the spring fitness challenge',
        members: [
          { id: 1, name: 'Emma Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'captain' },
          { id: 2, name: 'Michael Smith', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'member' },
          { id: 3, name: 'Olivia Davis', avatar: 'https://randomuser.me/api/portraits/women/17.jpg', role: 'member' },
          { id: 4, name: 'Noah Wilson', avatar: 'https://randomuser.me/api/portraits/men/62.jpg', role: 'member' }
        ],
        stats: {
          rank: 1,
          totalActivities: 45,
          totalPoints: 1425,
          weeklyStreak: 5
        }
      },
      {
        id: 2,
        name: 'Junior Wolves',
        description: 'Team of juniors focused on improving their fitness and supporting each other.',
        mascot: '🐺',
        grade: '11',
        goal: 'Each member to achieve personal fitness goals',
        members: [
          { id: 5, name: 'Tyler Williams', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'captain' },
          { id: 6, name: 'Ethan Brown', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', role: 'member' },
          { id: 7, name: 'Liam Taylor', avatar: 'https://randomuser.me/api/portraits/men/17.jpg', role: 'member' }
        ],
        stats: {
          rank: 2,
          totalActivities: 40,
          totalPoints: 1350,
          weeklyStreak: 4
        }
      },
      {
        id: 3,
        name: 'Senior Tigers',
        description: 'Seniors leading by example in fitness and health before graduation.',
        mascot: '🐯',
        grade: '12',
        goal: 'Set a positive example for underclassmen',
        members: [
          { id: 8, name: 'Marcus Chen', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', role: 'captain' },
          { id: 9, name: 'Sophia Garcia', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', role: 'member' }
        ],
        stats: {
          rank: 3,
          totalActivities: 35,
          totalPoints: 1120,
          weeklyStreak: 3
        }
      },
      {
        id: 4,
        name: 'Freshman Phoenix',
        description: 'New students excited to start their fitness journey together.',
        mascot: '🔥',
        grade: '9',
        goal: 'Build healthy habits from the start of high school',
        members: [
          { id: 10, name: 'Sofia Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'captain' },
          { id: 11, name: 'Isabella Martinez', avatar: 'https://randomuser.me/api/portraits/women/90.jpg', role: 'member' }
        ],
        stats: {
          rank: 4,
          totalActivities: 32,
          totalPoints: 980,
          weeklyStreak: 2
        }
      },
      {
        id: 5,
        name: 'Teachers United',
        description: 'Faculty team showing students that fitness is important at any age.',
        mascot: '📚',
        grade: 'Faculty',
        goal: 'Demonstrate healthy habits for students',
        members: [
          { id: 12, name: 'Ms. Johnson', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', role: 'captain' },
          { id: 13, name: 'Mr. Peterson', avatar: 'https://randomuser.me/api/portraits/men/44.jpg', role: 'member' }
        ],
        stats: {
          rank: 5,
          totalActivities: 25,
          totalPoints: 820,
          weeklyStreak: 3
        }
      }
    ];
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({
      ...newTeam,
      [name]: value
    });
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    
    // Generate a new team ID
    const newId = Math.max(...teams.map(team => team.id), 0) + 1;
    
    // Create the new team
    const teamToAdd = {
      ...newTeam,
      id: newId,
      members: [
        { 
          id: 100, 
          name: 'You', 
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', 
          role: 'captain' 
        }
      ],
      stats: {
        rank: teams.length + 1,
        totalActivities: 0,
        totalPoints: 0,
        weeklyStreak: 0
      }
    };
    
    // Add to teams
    setTeams([...teams, teamToAdd]);
    
    // Reset form and close it
    setNewTeam({
      name: '',
      description: '',
      mascot: '🏆',
      grade: '9',
      goal: ''
    });
    setShowCreateForm(false);
    
    // Select the new team
    setSelectedTeam(teamToAdd);
  };

  const selectTeam = (team) => {
    setSelectedTeam(team);
  };

  const closeTeamDetail = () => {
    setSelectedTeam(null);
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
    <div className="teams fade-in">
      <div className="app-logo mb-4">
        <img src="/octofitapp-logo.png" alt="OctoFit Logo" />
        <h1>Teams</h1>
      </div>
      
      <div className="card mb-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">School Teams</h5>
          <button className="btn btn-light btn-sm" onClick={toggleCreateForm}>
            <i className={`fas ${showCreateForm ? 'fa-minus' : 'fa-plus'} me-1`}></i>
            {showCreateForm ? 'Cancel' : 'Create Team'}
          </button>
        </div>
        <div className="card-body">
          {showCreateForm && (
            <div className="create-team-form mb-4">
              <h5 className="mb-3">Create New Team</h5>
              <form onSubmit={handleCreateTeam}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Team Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        value={newTeam.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sophomore Eagles"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="mascot" className="form-label">Team Mascot (Emoji)</label>
                      <select 
                        className="form-select" 
                        id="mascot" 
                        name="mascot"
                        value={newTeam.mascot}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="🏆">🏆 Trophy</option>
                        <option value="🦅">🦅 Eagle</option>
                        <option value="🐺">🐺 Wolf</option>
                        <option value="🐯">🐯 Tiger</option>
                        <option value="🔥">🔥 Phoenix</option>
                        <option value="🦁">🦁 Lion</option>
                        <option value="🐬">🐬 Dolphin</option>
                        <option value="🦊">🦊 Fox</option>
                        <option value="🦉">🦉 Owl</option>
                        <option value="🦅">🦅 Eagles</option>
                        <option value="🐾">🐾 Paws</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">Grade Level</label>
                      <select 
                        className="form-select" 
                        id="grade" 
                        name="grade"
                        value={newTeam.grade}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="9">9th Grade</option>
                        <option value="10">10th Grade</option>
                        <option value="11">11th Grade</option>
                        <option value="12">12th Grade</option>
                        <option value="mixed">Mixed Grades</option>
                        <option value="Faculty">Faculty</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Team Description</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    name="description"
                    value={newTeam.description}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Describe your team's mission and values"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="goal" className="form-label">Team Goal</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="goal" 
                    name="goal"
                    value={newTeam.goal}
                    onChange={handleInputChange}
                    placeholder="e.g. Win the spring fitness challenge"
                    required
                  />
                </div>
                
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={toggleCreateForm}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Team</button>
                </div>
              </form>
            </div>
          )}
          
          <div className="team-cards">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {teams.map(team => (
                <div className="col" key={team.id}>
                  <div className="team-card" onClick={() => selectTeam(team)}>
                    <div className="team-header">
                      <div className="team-mascot">{team.mascot}</div>
                      <div className="team-info">
                        <h5 className="team-name">{team.name}</h5>
                        <span className="team-grade">
                          {team.grade === 'Faculty' ? 'Faculty' : 
                            team.grade === 'mixed' ? 'Mixed Grades' : 
                            `${team.grade}${team.grade === '9' ? 'th' : 
                              team.grade === '11' ? 'th' : 
                              team.grade === '12' ? 'th' : 'th'} Grade`}
                        </span>
                      </div>
                    </div>
                    
                    <p className="team-description">{team.description}</p>
                    
                    <div className="team-members-preview">
                      {team.members.slice(0, 3).map(member => (
                        <div className="member-avatar" key={member.id}>
                          <img src={member.avatar} alt={member.name} />
                          {member.role === 'captain' && <span className="captain-badge">C</span>}
                        </div>
                      ))}
                      {team.members.length > 3 && (
                        <div className="member-avatar more">
                          +{team.members.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <div className="team-stats">
                      <div className="stat">
                        <i className="fas fa-medal"></i>
                        Rank #{team.stats.rank}
                      </div>
                      <div className="stat">
                        <i className="fas fa-running"></i>
                        {team.stats.totalActivities} Activities
                      </div>
                      <div className="stat">
                        <i className="fas fa-star"></i>
                        {team.stats.totalPoints} Points
                      </div>
                    </div>
                    
                    <button className="btn btn-primary w-100 mt-3">
                      View Team
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Team Benefits</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h5>Accountability</h5>
                <p>Teams help keep members accountable to their fitness goals through group support and encouragement.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <h5>Friendly Competition</h5>
                <p>Compete against other teams to earn points and climb the leaderboard for school recognition.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <h5>Team Support</h5>
                <p>Share fitness journeys, tips, and experiences with teammates who share similar goals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="team-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex align-items-center">
                <div className="team-mascot-lg me-3">{selectedTeam.mascot}</div>
                <h3 className="modal-title">{selectedTeam.name}</h3>
              </div>
              <button className="btn-close" onClick={closeTeamDetail}></button>
            </div>
            <div className="modal-body">
              <div className="team-detail-header">
                <div className="detail">
                  <span className="label">Grade Level:</span>
                  <span className="value">
                    {selectedTeam.grade === 'Faculty' ? 'Faculty' : 
                      selectedTeam.grade === 'mixed' ? 'Mixed Grades' : 
                      `${selectedTeam.grade}${selectedTeam.grade === '9' ? 'th' : 
                        selectedTeam.grade === '11' ? 'th' : 
                        selectedTeam.grade === '12' ? 'th' : 'th'} Grade`}
                  </span>
                </div>
                <div className="detail">
                  <span className="label">Rank:</span>
                  <span className="value">{selectedTeam.stats.rank}</span>
                </div>
                <div className="detail">
                  <span className="label">Members:</span>
                  <span className="value">{selectedTeam.members.length}</span>
                </div>
              </div>
              
              <div className="team-detail-section">
                <h5>Team Goal</h5>
                <p>{selectedTeam.goal}</p>
              </div>
              
              <div className="team-detail-section">
                <h5>About</h5>
                <p>{selectedTeam.description}</p>
              </div>
              
              <div className="team-stats-detail">
                <div className="row">
                  <div className="col-md-4">
                    <div className="stats-item">
                      <div className="stats-value">{selectedTeam.stats.totalActivities}</div>
                      <div className="stats-label">Activities</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stats-item">
                      <div className="stats-value">{selectedTeam.stats.totalPoints}</div>
                      <div className="stats-label">Total Points</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stats-item">
                      <div className="stats-value">{selectedTeam.stats.weeklyStreak}</div>
                      <div className="stats-label">Weekly Streak</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="team-detail-section">
                <h5>Team Members</h5>
                <div className="members-list">
                  {selectedTeam.members.map(member => (
                    <div className="member-item" key={member.id}>
                      <img src={member.avatar} alt={member.name} className="member-avatar-md" />
                      <div className="member-info">
                        <div className="member-name">
                          {member.name}
                          {member.role === 'captain' && (
                            <span className="captain-tag ms-2">Captain</span>
                          )}
                        </div>
                        <div className="member-status">
                          <span className="active-badge">Active</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {selectedTeam.members.some(m => m.id === 100) ? (
                <button className="btn btn-danger">Leave Team</button>
              ) : (
                <button className="btn btn-primary">Join Team</button>
              )}
              <button className="btn btn-outline-secondary" onClick={closeTeamDetail}>Close</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeTeamDetail}></div>
        </div>
      )}
    </div>
  );
}

export default Teams;
