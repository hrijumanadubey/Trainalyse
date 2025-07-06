import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import AddWorkouts from './add_workouts.jsx';
import ExerciseList from './exercise_list.jsx';

function App() {
  const location = useLocation();

  return (
    <>
    <div className='header'>
      <img className='logolight' src="./logo.jpg" alt="logo" width="25px" />
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <p>Trainalyse</p>
      </Link>
      <Link to="/add-workouts" className={location.pathname === '/add-workouts' ? 'active' : ''}>
        <p>Add Workouts</p>
      </Link>
      <Link to="/exercise-list" className={location.pathname === '/exercise-list' ? 'active' : ''}>
        <p>Exercise List</p>
      </Link>
      <Link to="/progress" className={location.pathname === '/progress' ? 'active' : ''}>
        <p>Progress</p>
      </Link>
      
      <Link to="/page2" className={location.pathname === '/page2' ? 'active' : ''}>
        <p>Bla bla bla</p>
      </Link>
      <Link to="/theme" className={location.pathname === '/theme' ? 'active' : ''}>
        <p>Theme</p>
      </Link>
    </div>
    
    <Routes>
      <Route path="/" element={
        <div className='content'>
          <p>TRAIN SMARTER,GET STRONGER</p>
          <p>Simple fitness tracking for everyone</p>
          <p>Track your workouts,set goals and watch yourself improve</p>
        </div>
      } />
      <Route path="/add-workouts" element={<AddWorkouts />} />
      <Route path="/exercise-list" element={<ExerciseList />} />
      <Route path="/progress" element={<div className='content'><p>Progress Page</p></div>} />
      <Route path="/page1" element={<div className='content'><p>Page 1</p></div>} />
      <Route path="/page2" element={<div className='content'><p>Page 2</p></div>} />
      <Route path="/theme" element={<div className='content'><p>Theme Settings</p></div>} />
    </Routes>
    </>
  );
}

export default App;