'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";

interface ResetPasswordForm {
    token: string;
    newPassword: string;
    confirmNewPassword: string;
}

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
};

export default function ResetPassword({ searchParams }: SearchParamProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>();
    const [message, setMessage] = useState("");
    
    const recoveryToken: string | undefined = searchParams?.token;
    const [token, setToken] = useState<string | null>(recoveryToken || null);



    const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
        if (data.newPassword !== data.confirmNewPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Account/reset-password`, {
                token: token,
                newPassword: data.newPassword
            });
            setMessage("Contraseña modificada correctamente");
        } catch (error) {
            setMessage("Error al modificar la contraseña");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Restablecer contraseña</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input type="hidden" value={token || ''} {...register("token", { required: true })} />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nueva contraseña:</label>
                        <input 
                            type="password" 
                            {...register("newPassword", { required: "New Password is required" })} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmar contraseña:</label>
                        <input 
                            type="password" 
                            {...register("confirmNewPassword", { required: "Confirm New Password is required" })} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                        {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-webColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Reestablecer contraseña
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </div>
        </div>
    );
}
