import React, { useState, useEffect } from 'react';
import config from '../../config';
import './Activities.css';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityForm, setActivityForm] = useState({
    type: 'running',
    duration: 30,
    distance: 3,
    intensity: 'moderate',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    // Fetch activities from the backend API
    fetch(`${config.API_BASE_URL}/api/activities/`, config.API_OPTIONS)
      .then(response => response.json())
      .then(data => {
        // If no data is returned or there's an error, use sample data
        if (Array.isArray(data) && data.length > 0) {
          setActivities(data);
        } else {
          setActivities(getSampleActivities());
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setActivities(getSampleActivities());
        setLoading(false);
      });
  }, []);

  // Sample activities data for development
  const getSampleActivities = () => {
    return [
      {
        id: 1,
        type: 'running',
        duration: 30,
        distance: 3.5,
        intensity: 'moderate',
        caloriesBurned: 315,
        notes: 'Morning run around the neighborhood',
        date: '2025-04-26',
        completedAt: '2025-04-26T07:45:00'
      },
      {
        id: 2,
        type: 'swimming',
        duration: 45,
        distance: 1,
        intensity: 'moderate',
        caloriesBurned: 400,
        notes: 'Swim practice with team',
        date: '2025-04-25',
        completedAt: '2025-04-25T16:30:00'
      },
      {
        id: 3,
        type: 'basketball',
        duration: 60,
        intensity: 'high',
        caloriesBurned: 550,
        notes: 'Practice after school',
        date: '2025-04-24',
        completedAt: '2025-04-24T16:00:00'
      },
      {
        id: 4,
        type: 'weightlifting',
        duration: 50,
        intensity: 'high',
        caloriesBurned: 320,
        notes: 'Upper body focus',
        date: '2025-04-23',
        completedAt: '2025-04-23T17:15:00'
      },
      {
        id: 5,
        type: 'walking',
        duration: 40,
        distance: 2.8,
        intensity: 'low',
        caloriesBurned: 160,
        notes: 'Evening walk with friends',
        date: '2025-04-22',
        completedAt: '2025-04-22T18:30:00'
      },
      {
        id: 6,
        type: 'cycling',
        duration: 70,
        distance: 15,
        intensity: 'moderate',
        caloriesBurned: 520,
        notes: 'Weekend bike ride',
        date: '2025-04-21',
        completedAt: '2025-04-21T10:00:00'
      }
    ];
  };

  // Activity form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityForm({
      ...activityForm,
      [name]: value
    });
  };

  const handleSubmitActivity = (e) => {
    e.preventDefault();
    
    // Calculate approximate calories burned
    const weight = 70; // Default weight in kg
    const met = getMETValue(activityForm.type, activityForm.intensity);
    const caloriesBurned = Math.round((met * weight * activityForm.duration) / 60);
    
    // Create a new activity object
    const newActivity = {
      id: activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1,
      ...activityForm,
      caloriesBurned,
      completedAt: new Date().toISOString()
    };
    
    // Add the new activity to the list
    setActivities([newActivity, ...activities]);
    
    // Reset the form
    setActivityForm({
      type: 'running',
      duration: 30,
      distance: 3,
      intensity: 'moderate',
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    // Hide the form
    setShowForm(false);
  };

  // Calculate MET (Metabolic Equivalent of Task) based on activity type and intensity
  const getMETValue = (type, intensity) => {
    const metValues = {
      running: { low: 7, moderate: 10, high: 12.5 },
      walking: { low: 2.5, moderate: 3.5, high: 4.5 },
      swimming: { low: 5, moderate: 7, high: 10 },
      cycling: { low: 4, moderate: 6.5, high: 10 },
      basketball: { low: 4.5, moderate: 6, high: 8 },
      soccer: { low: 5, moderate: 7, high: 10 },
      weightlifting: { low: 3, moderate: 5, high: 6 },
      yoga: { low: 2.5, moderate: 3, high: 4 },
      hiking: { low: 3.5, moderate: 5.5, high: 7 }
    };
    
    return metValues[type]?.[intensity] || 5; // Default to 5 if not found
  };

  // Format duration in minutes to hours and minutes
  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? 
      `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` : 
      `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get activity icon based on activity type
  const getActivityIcon = (type) => {
    const icons = {
      running: 'fas fa-running',
      walking: 'fas fa-walking',
      swimming: 'fas fa-swimmer',
      cycling: 'fas fa-biking',
      basketball: 'fas fa-basketball-ball',
      soccer: 'fas fa-futbol',
      weightlifting: 'fas fa-dumbbell',
      yoga: 'fas fa-pray',
      hiking: 'fas fa-hiking'
    };
    
    return icons[type] || 'fas fa-heartbeat';
  };

  // Filter activities based on the current filter
  const filteredActivities = () => {
    if (filter === 'all') return activities;
    return activities.filter(activity => activity.type === filter);
  };

  // Delete activity handlers
  const openDeleteModal = (activity) => {
    setSelectedActivity(activity);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedActivity) {
      setActivities(activities.filter(a => a.id !== selectedActivity.id));
      setDeleteModalOpen(false);
      setSelectedActivity(null);
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
    <div className="activities fade-in">
      <div className="app-logo mb-4">
        <img src="/octofitapp-logo.png" alt="OctoFit Logo" />
        <h1>My Activities</h1>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="activity-stats">
          <div className="stats-item">
            <i className="fas fa-fire-alt"></i>
            <div className="stats-details">
              <span className="value">{activities.reduce((sum, act) => sum + act.caloriesBurned, 0).toLocaleString()}</span>
              <span className="label">Total Calories</span>
            </div>
          </div>
          <div className="stats-item">
            <i className="fas fa-clock"></i>
            <div className="stats-details">
              <span className="value">{activities.reduce((sum, act) => sum + parseInt(act.duration), 0)}</span>
              <span className="label">Total Minutes</span>
            </div>
          </div>
          <div className="stats-item">
            <i className="fas fa-check-circle"></i>
            <div className="stats-details">
              <span className="value">{activities.length}</span>
              <span className="label">Activities</span>
            </div>
          </div>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          <i className="fas fa-plus me-2"></i>
          Log Activity
        </button>
      </div>
      
      {showForm && (
        <div className="card activity-form-card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Log New Activity</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmitActivity}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="type" className="form-label">Activity Type</label>
                  <select 
                    className="form-select" 
                    id="type" 
                    name="type"
                    value={activityForm.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="running">Running</option>
                    <option value="walking">Walking</option>
                    <option value="swimming">Swimming</option>
                    <option value="cycling">Cycling</option>
                    <option value="basketball">Basketball</option>
                    <option value="soccer">Soccer</option>
                    <option value="weightlifting">Weight Lifting</option>
                    <option value="yoga">Yoga</option>
                    <option value="hiking">Hiking</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="date" 
                    name="date"
                    value={activityForm.date}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div className="row g-3 mt-2">
                <div className="col-md-4">
                  <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="duration" 
                    name="duration"
                    value={activityForm.duration}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="intensity" className="form-label">Intensity</label>
                  <select 
                    className="form-select" 
                    id="intensity" 
                    name="intensity"
                    value={activityForm.intensity}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
                {(activityForm.type === 'running' || activityForm.type === 'walking' || 
                  activityForm.type === 'cycling' || activityForm.type === 'swimming' || 
                  activityForm.type === 'hiking') && (
                  <div className="col-md-4">
                    <label htmlFor="distance" className="form-label">
                      Distance ({activityForm.type === 'swimming' ? 'km' : 'miles'})
                    </label>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="form-control" 
                      id="distance" 
                      name="distance"
                      value={activityForm.distance}
                      onChange={handleInputChange}
                      min="0.1"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-3">
                <label htmlFor="notes" className="form-label">Notes</label>
                <textarea 
                  className="form-control" 
                  id="notes" 
                  name="notes"
                  value={activityForm.notes}
                  onChange={handleInputChange}
                  rows="2"
                ></textarea>
              </div>
              
              <div className="d-flex gap-2 justify-content-end mt-4">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Activity History</h5>
            <div className="filter-buttons">
              <div className="btn-group" role="group">
                <button 
                  type="button" 
                  className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  type="button" 
                  className={`btn btn-sm ${filter === 'running' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('running')}
                >
                  Running
                </button>
                <button 
                  type="button" 
                  className={`btn btn-sm ${filter === 'walking' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('walking')}
                >
                  Walking
                </button>
                <button 
                  type="button" 
                  className={`btn btn-sm ${filter === 'weightlifting' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('weightlifting')}
                >
                  Weights
                </button>
                <button 
                  type="button" 
                  className={`btn btn-sm ${filter === 'basketball' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFilter('basketball')}
                >
                  Basketball
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          {filteredActivities().length > 0 ? (
            <div className="activity-list">
              {filteredActivities().map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <i className={getActivityIcon(activity.type)}></i>
                  </div>
                  <div className="activity-details">
                    <div className="activity-header">
                      <h5 className="activity-title">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </h5>
                      <div className="activity-actions">
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => openDeleteModal(activity)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                    <div className="activity-metadata">
                      <span><i className="fas fa-calendar-alt"></i> {formatDate(activity.date)}</span>
                      <span><i className="fas fa-clock"></i> {formatDuration(activity.duration)}</span>
                      {activity.distance && (
                        <span>
                          <i className="fas fa-route"></i> {activity.distance} {activity.type === 'swimming' ? 'km' : 'miles'}
                        </span>
                      )}
                      <span>
                        <i className="fas fa-fire-alt"></i> {activity.caloriesBurned} calories
                      </span>
                      <span className="badge bg-light text-dark">
                        {activity.intensity.charAt(0).toUpperCase() + activity.intensity.slice(1)} Intensity
                      </span>
                    </div>
                    {activity.notes && (
                      <p className="activity-notes">{activity.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted mb-0">No activities found for this filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setDeleteModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this activity? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
