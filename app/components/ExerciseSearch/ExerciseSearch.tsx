'use client'
import { useState, useEffect } from 'react';
import { getMuscleGroups, getExercisesByMuscleGroup } from '../../lib/exercise';
import { muscleGroupTranslations } from '../../lib/translation';
import { MuscleGroup, Exercise } from '../../types/exercise';

const muscleImageMap : Record<string, string> = {
    "Anterior deltoid": "https://entrenadorpersonal24.com/wp-content/uploads/2019/01/musculo-deltoides-anterior.jpg",
    "Biceps brachii": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Biceps_brachii.png/320px-Biceps_brachii.png",
    "Biceps femoris": "https://cdn.hsnstore.com/blog/wp-content/uploads/2018/07/cabezas-biceps.jpg",
    "Brachialis": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Biceps_brachii.png",
    "Gastrocnemius": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Gastrocnemius.png",
    "Gluteus maximus": "https://upload.wikimedia.org/wikipedia/commons/9/91/Gluteus_maximus.png",
    "Latissimus dorsi": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Latissimus_dorsi.png",
    "Obliquus externus abdominis": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Gray392.png",
    "Pectoralis major": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Pectoralis_major.png",
    "Quadriceps femoris": "https://www.escuelaculturismonatural.com/wp-content/uploads/elementor/thumbs/Quadriceps-muscles-e1660481667161-pt94479g84lgtxwid7byvpxbpswzq758ltel76ee9k.png",
    "Rectus abdominis": "https://upload.wikimedia.org/wikipedia/commons/9/95/Rectus_abdominis.png",
    "Serratus anterior": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Serratus_anterior.png",
    "Soleus": "https://st2.depositphotos.com/1047356/9460/i/450/depositphotos_94600706-stock-photo-concept-or-conceptual-3d-human.jpg",
    "Trapezius": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Trapezius_Gray409.PNG/320px-Trapezius_Gray409.PNG",
    "Triceps brachii": "https://upload.wikimedia.org/wikipedia/commons/8/83/Triceps_brachii.png"
};

const ExerciseSearch = () => {
    const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [error, setError] = useState<string>('');
    const [muscleImageUrl, setMuscleImageUrl] = useState<string>('');

    useEffect(() => {
        const fetchMuscleGroups = async () => {
            try {
                const muscleGroupsData: MuscleGroup[] = await getMuscleGroups();
                setMuscleGroups(muscleGroupsData);
            } catch (err) {
                setError('Error al obtener grupos musculares.');
                console.error(err);
            }
        };

        fetchMuscleGroups();
    }, []);

    const handleSearch = async () => {
        try {
            const exercisesData: Exercise[] = await getExercisesByMuscleGroup(selectedMuscleGroup);
            setExercises(exercisesData);
            setError('');

            const muscleInfo = muscleGroups.find(muscle => muscle.id === parseInt(selectedMuscleGroup));
            if (muscleInfo) {
                const customImageUrl = muscleImageMap[muscleInfo.name];
                if (customImageUrl) {
                    setMuscleImageUrl(customImageUrl);
                } else {
                    setMuscleImageUrl(muscleInfo.image_url_main || '');
                }
            } else {
                setMuscleImageUrl('');
            }
        } catch (err) {
            setError('Error al buscar ejercicios. Por favor, inténtalo de nuevo.');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Buscar Ejercicios por Grupo Muscular</h1>
            <div className="flex mb-4">
                <select
                    value={selectedMuscleGroup}
                    onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md flex-grow"
                >
                    <option value="">Selecciona un grupo muscular</option>
                    {muscleGroups.map((muscle) => (
                        <option key={muscle.id} value={muscle.id.toString()}>
                            {muscleGroupTranslations[muscle.name] || muscle.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-webColor text-white rounded-md"
                >
                    Buscar
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {muscleImageUrl && (
                <div className="mb-4">
                    <img src={muscleImageUrl} alt="Músculo" className="w-full max-w-xs mx-auto rounded-lg shadow-md" style={{ maxHeight: '300px' }} />
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {exercises.map((exercise) => (
                    <div key={exercise.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-2">{exercise.name}</h2>
                        <p>{exercise.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseSearch;
