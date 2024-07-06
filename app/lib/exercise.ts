import axios from 'axios';

const API_URL = 'https://wger.de/api/v2';

export const getMuscleGroups = async () => {
    const response = await axios.get(`${API_URL}/muscle/`, {
        params: {
            language: 4,  
        },
    });
    return response.data.results;
};

export const getExercisesByMuscleGroup = async (muscleId : any) => {
    const response = await axios.get(`${API_URL}/exercise/`, {
        params: {
            language: 4,  
            status: 2,
            muscles: muscleId,
        },
    });
    return response.data.results;
};
