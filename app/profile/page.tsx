'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PencilIcon } from "@heroicons/react/24/outline";
import axios from "axios";

interface UserData {
    nombre: string;
    apellidos: string;
    email: string;
    fechaNac: string;
}

interface UserUpdateDto {
    nombre: string;
    apellidos: string;
    fechaNac: string;
}

export default function Profile() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue } = useForm<UserUpdateDto>();
    const [initialData, setInitialData] = useState<UserData | null>(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            if (session) {
                try {
                    const token = session.user.token;
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Account/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const data: UserData = response.data;
                    setUserData(data);
                    setValue("nombre", data.nombre);
                    setValue("apellidos", data.apellidos);
                    setValue("fechaNac", data.fechaNac);
                    setInitialData(data); 
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [session, setValue]);

    const onSubmit: SubmitHandler<UserUpdateDto> = async (data) => {
        try {
            const token = session?.user.token;
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Account/profile`, {
                ...data,
                fechaNac: new Date(data.fechaNac).toISOString().split('T')[0]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData({
                ...userData!,
                nombre: data.nombre,
                apellidos: data.apellidos,
                fechaNac: data.fechaNac,
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const onCancel = () => {
        if (initialData) {
            setValue("nombre", initialData.nombre);
            setValue("apellidos", initialData.apellidos);
            setValue("fechaNac", initialData.fechaNac);
        }
        setIsEditing(false);
    };

    if (!userData) {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>You are not signed in</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-webColor font-bold mb-4">Perfil del Usuario</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        {...register("nombre")}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Apellidos</label>
                    <input
                        type="text"
                        {...register("apellidos")}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        {...register("fechaNac")}
                        disabled={!isEditing}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Correo</label>
                    <input
                        type="email"
                        value={userData.email}
                        disabled
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    {!isEditing && (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center px-4 py-2 bg-webColor text-white rounded-full"
                        >
                            <PencilIcon className="h-5 w-5 mr-2" />
                            Editar Perfil
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button
                                type="submit"
                                className="flex items-center px-4 py-2 bg-webColor text-white rounded-full"
                            >
                                Guardar Cambios
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex items-center px-4 py-2 bg-gray-300 text-white rounded-full"
                            >
                                Cancelar
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
