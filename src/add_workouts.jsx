import React, { useState } from 'react';
import AddSets from './add_sets';


function AddWorkouts() {
    const [selectedDate, setSelectedDate] = React.useState(()=>{
      try {
          const storedDate = window.localStorage.getItem('selectedDate');
          return storedDate ? JSON.parse(storedDate) : '';
      } catch (error) {
          console.error('Error loading exercises from localStorage:', error);
          return '';
      }
  });

  
  const [exarr, setExarr] = React.useState(() => {
    try {
      const storedSets = window.localStorage.getItem('exarr');
      return storedSets ? JSON.parse(storedSets) : [];
    } catch (error) {
      console.error('Error loading sets from localStorage:', error);
      return [];
    }
  });

  
  const handleAddSets = () => {
    setExarr([...exarr, { id: Date.now(), exercise: '', selectedExercise: '' }]);
  };

  const handleExerciseChange = (setId, newExercise) => {
    setExarr(exarr.map(set => 
      set.id === setId 
        ? { ...set, selectedExercise: newExercise }
        : set
    ));
  };

  
   
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  



  React.useEffect(()=>{
    try {
      window.localStorage.setItem('selectedDate', JSON.stringify(selectedDate));
    } catch (error) {
      console.error('Error saving exercises to localStorage:', error);
    }
  },[selectedDate]);

  const handleDeleteSet = (setId) => {
    setExarr(exarr.filter(set => set.id !== setId));
  };

  // Load saved sets when component mounts
  React.useEffect(() => {
    try {
      const storedSets = window.localStorage.getItem('exarr');
      if (storedSets) {
        setExarr(JSON.parse(storedSets));
      }
    } catch (error) {
      console.error('Error loading sets from localStorage:', error);
    }
  }, []);

  // Save sets whenever exarr changes
  React.useEffect(() => {
    try {
      window.localStorage.setItem('exarr', JSON.stringify(exarr));
    } catch (error) {
      console.error('Error saving sets to localStorage:', error);
    }
  }, [exarr]);

    return (
    <>
    <div>
      <h2>Select a Date:</h2>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      
      {selectedDate && (
        <p>{new Date(selectedDate).toDateString()}</p>
      )}
    </div>
    <div>
      <h2>Your routine:</h2>
      <button className="addworkouts" onClick={handleAddSets}>+</button>
      <br></br>
      {exarr.map((set, index) => (
        <React.Fragment key={set.id}>
          <AddSets 
            setData={set} 
            onDelete={() => handleDeleteSet(set.id)}
            onExerciseChange={(exercise) => handleExerciseChange(set.id, exercise)}
          />
          <br></br>
        </React.Fragment>
      ))}
    </div>
    </>
    );
}

export default AddWorkouts;