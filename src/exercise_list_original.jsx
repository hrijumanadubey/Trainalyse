import React, { useState } from 'react';

function ExerciseList() {

    // this exercises is an array consisting of all the exercises that a person enters 
    const [exercises, setExercises] = React.useState(()=>{
        try {
            const storedValue = window.localStorage.getItem('exercises');
            return storedValue ? JSON.parse(storedValue) : [];
        } catch (error) {
            console.error('Error loading exercises from localStorage:', error);
            return [];
        }
    });


    // this function is used to enter an exercise in exercises array using enter key
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setExercises([...exercises, event.target.value]);
            event.target.value = '';
        }
    }

    // this function is used to delete an exercise from exercises array when a person clicks on - button
    const handleClick = (index) => {
        setExercises(exercises.filter((_, i) => i !== index));
    }

    // this effect is used to store the exercises array in local storage and keep it persistent
    React.useEffect(()=>{
        try {
            window.localStorage.setItem('exercises', JSON.stringify(exercises));
        } catch (error) {
            console.error('Error saving exercises to localStorage:', error);
        }
    },[exercises]);

    return (
        <>
        {/*this tag is for entering your exercise */}
        <input type="text" placeholder="Exercise Name" onKeyDown={handleKeyDown}/>
        {/*this tag is for displaying the exercise array */}
    <ul>
        {exercises.map((exercise, index) => (
            <div key={index}>
            <p>{index+1}. {exercise}</p>
            <button onClick={() => handleClick(index)}>-</button>
            </div>
        ))}
    </ul>
        </>
    );
}

export default ExerciseList;