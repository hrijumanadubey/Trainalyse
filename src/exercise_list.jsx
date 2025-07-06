import React, { useState } from 'react';
import { db } from '../db';
import { useLiveQuery } from "dexie-react-hooks";


function ExerciseList() {

    const exercises = useLiveQuery(() => db.exercises.toArray());
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {

            const exerciseName = event.target.value;
            await db.exercises.add({name:exerciseName});
            
            event.target.value = '';
        }
    }

    // this function is used to delete an exercise from exercises array when a person clicks on - button
    const handleClick = async (id) => {
        await db.exercises.delete(id)
    }
    return (
        <>
        {/*this tag is for entering your exercise */}
        <input type="text" placeholder="Exercise Name" onKeyDown={handleKeyDown}/>
        {/*this tag is for displaying the exercise array */}
    <ul>
        {exercises?.map((exercise, index) => (
            <div key={index}>
            <p>{index+1}. {exercise.name}</p>
            <button onClick={() => handleClick(exercise.id)}>-</button>
            </div>
        ))}
    </ul>
        </>
    );
}

export default ExerciseList;