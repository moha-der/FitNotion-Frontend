'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface ForgotPasswordForm {
    email: string;
}

export default function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>();
    const [message, setMessage] = useState("");

    const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Account/forgot-password`, data);
            setMessage("Si existe algúna cuenta con esta correo, le enviaremos un correo de recuperación");
        } catch (error) {
            setMessage("Error al enviar el correo");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Recuperar contraseña</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input 
                            type="email" 
                            {...register("email", { required: "Email is required" })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-webColor hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Enviar correo de recuperación
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </div>
        </div>
    );
}
