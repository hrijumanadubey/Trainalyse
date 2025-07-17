import React, { useState } from 'react';
import { db } from '../db';
import { useLiveQuery } from "dexie-react-hooks";

function AddSets({ setData, onDelete, onExerciseChange }) {
    // Use Dexie to get exercises from the database
    const exercises = useLiveQuery(() => db.exercises.toArray());

    const [weight,setWeight] = React.useState(()=>{
        try {
            const storedWeight = window.localStorage.getItem('weight');
            return storedWeight ? JSON.parse(storedWeight) : '';
        } catch (error) {
            console.error('Error loading weight from localStorage:', error);
            return '';
        }
    });

    const [reps,setReps] = React.useState(()=>{
        try {
            const storedReps = window.localStorage.getItem('reps');
            return storedReps ? JSON.parse(storedReps) : '';
        } catch (error) {
            console.error('Error loading weight from localStorage:', error);
            return '';
        }
    })
    
    const handleExerciseChange = (e) => {
        onExerciseChange(e.target.value);
    };

    const handleDelete = () => {
        // Clear localStorage when deleting this set
        localStorage.removeItem('weight');
        localStorage.removeItem('reps');
        onDelete();
    };

    const handleKeyDownWeight = (event) => {
        if (event.key === 'Enter') {
            const weightValue = event.target.value;
            setWeight(weightValue);
            localStorage.setItem('weight', JSON.stringify(weightValue));
            event.target.value = '';
        }
    };

    const handleKeyDownReps = (event) => {
        if (event.key === 'Enter') {
            const repsValue = event.target.value;
            setReps(repsValue);
            localStorage.setItem('reps', JSON.stringify(repsValue));
            event.target.value = '';
        }
    };

    // Keep the weight and reps localStorage effects
    React.useEffect(() => {
        const handleWeightChange = () => {
            try {
                const storedWeight = window.localStorage.getItem('weight');
                setWeight(storedWeight ? JSON.parse(storedWeight) : '');
            } catch (error) {
                console.error('Error loading weight from localStorage:', error);
                setWeight('');
            }
        };
    
        // Listen for changes to localStorage
        window.addEventListener('storage', handleWeightChange);
        
        // Also check on component mount
        handleWeightChange();
    
        return () => {
            window.removeEventListener('storage', handleWeightChange);
        };
    }, []);

    React.useEffect(() => {
        const handleRepsChange = () => {
            try {
                const storedReps = window.localStorage.getItem('reps');
                setReps(storedReps ? JSON.parse(storedReps) : '');
            } catch (error) {
                console.error('Error loading weight from localStorage:', error);
                setReps('');
            }
        };
    
        // Listen for changes to localStorage
        window.addEventListener('storage', handleRepsChange);
        
        // Also check on component mount
        handleRepsChange();
    
        return () => {
            window.removeEventListener('storage', handleRepsChange);
        };
    }, []);
    
    return(
    <>
        <select value={setData.selectedExercise || ''} onChange={handleExerciseChange}>
            <option value="">Select an exercise</option>
            {exercises?.map((exercise, index) => (
                <option key={exercise.id} value={exercise.name}>
                    {exercise.name}
                </option>
            ))}
        </select>
        {setData.selectedExercise && (
            <p>Selected: {setData.selectedExercise}</p>
        )}
        <button className='deleteExercise' onClick={handleDelete}>-</button>

        <h4>Total weight: {weight}</h4>
        <input 
            type="number" 
            placeholder="Enter weights" 
            onKeyDown={handleKeyDownWeight}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
        />

        <h4>Total reps: {reps}</h4>
        <input 
            type="number" 
            placeholder="Enter Reps" 
            onKeyDown={handleKeyDownReps}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
        />
    </>
    )
}

export default AddSets;