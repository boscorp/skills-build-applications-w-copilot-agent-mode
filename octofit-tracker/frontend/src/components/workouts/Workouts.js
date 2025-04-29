import React, { useState, useEffect } from 'react';
import config from '../../config';
import './Workouts.css';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    difficulty: 'intermediate',
    type: 'strength',
    duration: 30,
    equipment: []
  });

  useEffect(() => {
    // Fetch workouts data from the backend API
    fetch(`${config.API_BASE_URL}/api/workouts/`, config.API_OPTIONS)
      .then(response => response.json())
      .then(data => {
        // If no data is returned or there's an error, use sample data
        const workoutsData = Array.isArray(data) && data.length > 0 ? data : getSampleWorkouts();
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts data:', error);
        setWorkouts(getSampleWorkouts());
        setLoading(false);
      });
  }, []);

  // Sample workouts data for development
  const getSampleWorkouts = () => {
    return [
      {
        id: 1,
        name: "Morning Energizer",
        description: "A quick workout to start your day with energy and focus.",
        difficulty: "beginner",
        type: "cardio",
        duration: 20,
        equipment: ["none"],
        exercises: [
          { name: "Jumping Jacks", sets: 3, reps: 20, rest: 30 },
          { name: "Push-ups", sets: 3, reps: 10, rest: 30 },
          { name: "Mountain Climbers", sets: 3, reps: 30, rest: 30 },
          { name: "Plank", sets: 3, duration: "30 seconds", rest: 30 }
        ]
      },
      {
        id: 2,
        name: "Basketball Skills Training",
        description: "Improve your ball handling and shooting skills.",
        difficulty: "intermediate",
        type: "sport",
        duration: 45,
        equipment: ["basketball"],
        exercises: [
          { name: "Dribbling Drills", duration: "10 minutes", rest: 60 },
          { name: "Shooting Practice", duration: "15 minutes", rest: 60 },
          { name: "Defensive Slides", sets: 4, reps: 10, rest: 30 },
          { name: "Layup Practice", duration: "10 minutes", rest: 0 }
        ]
      },
      {
        id: 3,
        name: "Core Strength Builder",
        description: "Focus on building a strong core and improving stability.",
        difficulty: "intermediate",
        type: "strength",
        duration: 30,
        equipment: ["mat", "weights"],
        exercises: [
          { name: "Crunches", sets: 3, reps: 15, rest: 45 },
          { name: "Russian Twists", sets: 3, reps: 20, rest: 45 },
          { name: "Plank Variations", sets: 3, duration: "45 seconds", rest: 45 },
          { name: "Leg Raises", sets: 3, reps: 12, rest: 45 }
        ]
      },
      {
        id: 4,
        name: "Full Body HIIT",
        description: "High-intensity interval training for maximum calorie burn.",
        difficulty: "advanced",
        type: "hiit",
        duration: 25,
        equipment: ["none"],
        exercises: [
          { name: "Burpees", sets: 4, reps: 12, rest: 20 },
          { name: "Mountain Climbers", sets: 4, reps: 30, rest: 20 },
          { name: "Jump Squats", sets: 4, reps: 15, rest: 20 },
          { name: "High Knees", sets: 4, duration: "30 seconds", rest: 20 }
        ]
      },
      {
        id: 5,
        name: "Flexibility and Recovery",
        description: "Gentle stretching routine to improve flexibility and aid recovery.",
        difficulty: "beginner",
        type: "flexibility",
        duration: 20,
        equipment: ["mat"],
        exercises: [
          { name: "Hamstring Stretch", sets: 2, duration: "45 seconds", rest: 15 },
          { name: "Hip Flexor Stretch", sets: 2, duration: "45 seconds", rest: 15 },
          { name: "Shoulder Stretch", sets: 2, duration: "45 seconds", rest: 15 },
          { name: "Child's Pose", sets: 2, duration: "60 seconds", rest: 15 }
        ]
      }
    ];
  };

  const openWorkoutDetails = (workout) => {
    setSelectedWorkout(workout);
  };
  
  const closeWorkoutDetails = () => {
    setSelectedWorkout(null);
  };
  
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout({
      ...newWorkout,
      [name]: value
    });
  };
  
  const handleEquipmentChange = (e) => {
    const equipment = Array.from(e.target.selectedOptions, option => option.value);
    setNewWorkout({
      ...newWorkout,
      equipment: equipment
    });
  };
  
  const handleAddWorkout = (e) => {
    e.preventDefault();
    
    // Generate a new ID for the workout
    const newId = Math.max(...workouts.map(w => w.id), 0) + 1;
    
    // Create a new workout object
    const workoutToAdd = {
      ...newWorkout,
      id: newId,
      exercises: []  // New workouts start with no exercises
    };
    
    // Add the new workout to the list
    setWorkouts([...workouts, workoutToAdd]);
    
    // Reset the form
    setNewWorkout({
      name: '',
      description: '',
      difficulty: 'intermediate',
      type: 'strength',
      duration: 30,
      equipment: []
    });
    
    // Close the form
    setShowAddForm(false);
  };
  
  const filteredWorkouts = () => {
    if (filter === 'all') {
      return workouts;
    } else {
      return workouts.filter(workout => workout.type === filter);
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
    <div className="workouts fade-in">
      <div className="app-logo mb-4">
        <img src="/octofitapp-logo.png" alt="OctoFit Logo" />
        <h1>Workout Library</h1>
      </div>
      
      <div className="card mb-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Browse Workouts</h5>
          <button className="btn btn-light btn-sm" onClick={toggleAddForm}>
            <i className="fas fa-plus me-1"></i> Add Workout
          </button>
        </div>
        
        <div className="card-body">
          {showAddForm && (
            <div className="add-workout-form mb-4">
              <h5 className="mb-3">Create New Workout</h5>
              <form onSubmit={handleAddWorkout}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Workout Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        value={newWorkout.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="duration" 
                        name="duration"
                        value={newWorkout.duration}
                        onChange={handleInputChange}
                        min="5"
                        max="120"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    name="description"
                    value={newWorkout.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="type" className="form-label">Workout Type</label>
                      <select 
                        className="form-select" 
                        id="type" 
                        name="type"
                        value={newWorkout.type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="strength">Strength</option>
                        <option value="cardio">Cardio</option>
                        <option value="hiit">HIIT</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="sport">Sport-specific</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
                      <select 
                        className="form-select" 
                        id="difficulty" 
                        name="difficulty"
                        value={newWorkout.difficulty}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="equipment" className="form-label">Equipment (Ctrl+Click for multiple)</label>
                      <select 
                        className="form-select" 
                        id="equipment" 
                        name="equipment"
                        value={newWorkout.equipment}
                        onChange={handleEquipmentChange}
                        multiple
                      >
                        <option value="none">None</option>
                        <option value="mat">Mat</option>
                        <option value="weights">Weights</option>
                        <option value="bands">Resistance Bands</option>
                        <option value="bench">Bench</option>
                        <option value="basketball">Basketball</option>
                        <option value="jump-rope">Jump Rope</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={toggleAddForm}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Workout</button>
                </div>
              </form>
            </div>
          )}
          
          <div className="mb-4">
            <h5 className="mb-3">Filter By Category</h5>
            <div className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'cardio' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('cardio')}
              >
                Cardio
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'strength' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('strength')}
              >
                Strength
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'hiit' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('hiit')}
              >
                HIIT
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'flexibility' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('flexibility')}
              >
                Flexibility
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'sport' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('sport')}
              >
                Sport
              </button>
            </div>
          </div>
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredWorkouts().map(workout => (
              <div className="col" key={workout.id}>
                <div className="card h-100 workout-card">
                  <div className="card-header bg-transparent">
                    <span className={`badge ${
                      workout.difficulty === 'beginner' ? 'bg-success' : 
                      workout.difficulty === 'intermediate' ? 'bg-warning' : 
                      'bg-danger'}`}
                    >
                      {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                    </span>
                    {" "}
                    <span className="badge bg-info">{workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}</span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{workout.name}</h5>
                    <p className="card-text text-muted">{workout.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <i className="fas fa-clock me-2"></i>
                        {workout.duration} min
                      </div>
                      <div>
                        <i className="fas fa-dumbbell me-2"></i>
                        {workout.equipment.join(', ')}
                      </div>
                    </div>
                    <button 
                      className="btn btn-primary w-100" 
                      onClick={() => openWorkoutDetails(workout)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredWorkouts().length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted mb-3">No workouts found for this category.</p>
              <button className="btn btn-outline-primary" onClick={() => setFilter('all')}>
                Show All Workouts
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Workout Details Modal */}
      {selectedWorkout && (
        <div className="workout-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{selectedWorkout.name}</h3>
              <button className="btn-close" onClick={closeWorkoutDetails}></button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <div className="d-flex mb-3">
                  <span className={`badge ${
                    selectedWorkout.difficulty === 'beginner' ? 'bg-success' : 
                    selectedWorkout.difficulty === 'intermediate' ? 'bg-warning' : 
                    'bg-danger'} me-2`}
                  >
                    {selectedWorkout.difficulty.charAt(0).toUpperCase() + selectedWorkout.difficulty.slice(1)}
                  </span>
                  <span className="badge bg-info me-2">{selectedWorkout.type.charAt(0).toUpperCase() + selectedWorkout.type.slice(1)}</span>
                  <span className="badge bg-secondary">{selectedWorkout.duration} minutes</span>
                </div>
                <p>{selectedWorkout.description}</p>
                
                <h5 className="mt-4 mb-3">Equipment Required</h5>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {selectedWorkout.equipment.map((item, index) => (
                    <span key={index} className="badge bg-light text-dark">{item}</span>
                  ))}
                </div>
              </div>
              
              <div className="exercises">
                <h5 className="mb-3">Exercises</h5>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Sets/Duration</th>
                        <th>Reps</th>
                        <th>Rest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedWorkout.exercises && selectedWorkout.exercises.map((exercise, index) => (
                        <tr key={index}>
                          <td>{exercise.name}</td>
                          <td>
                            {exercise.sets ? `${exercise.sets} sets` : exercise.duration}
                          </td>
                          <td>{exercise.reps || '-'}</td>
                          <td>{exercise.rest} sec</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary">Start Workout</button>
              <button className="btn btn-outline-secondary" onClick={closeWorkoutDetails}>Close</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeWorkoutDetails}></div>
        </div>
      )}
    </div>
  );
}

export default Workouts;
