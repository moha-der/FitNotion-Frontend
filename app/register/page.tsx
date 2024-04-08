'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Hero from 'public/images/login.png'
import HeroMobile from 'public/images/HeroMobile.svg'
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation, mappedtiposUsuario } from '../validations/userValidation';
import axios, { AxiosError } from 'axios';

type Inputs = {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    confirmPassword: string;
    fechaNac: string;
    tipoCuenta: string;
};

export default function Register() {


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(userValidation),
    });

    const [errorRegistro, setErrorRegistro] = useState('');

    const tiposCuentaOptions = Object.entries(mappedtiposUsuario).map(([key, value]) => (
        <option value={key} key={key}>
          {value}
        </option>
      ));

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const email = data.email;
        const password = data.password;

        var usuario = {
            id_Usuario: "string",
            email: data.email,
            password: password,
            nombre: data.nombre,
            apellidos: data.apellidos,
            edad: 20,
            fecha_nac: data.fechaNac,
            tipo_usuario: parseInt(data.tipoCuenta)
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Account/Register`, usuario);

            setErrorRegistro('');
            
            

            const responseNextAuth = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
    
            if (responseNextAuth?.error) {
                console.log(responseNextAuth.error);
                return;
            }

            console.log(response);
    
            if (response.data.permiso == 1) {
                router.push("/panel");
                console.log("entrando");
            } else if (response.data.Permiso == 2) {
                router.push("/portalNutricionista");
            }
            

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    if (axiosError.response.status === 400) {
                        setErrorRegistro("Error al registrar el usuario");
                    } else if (axiosError.response.status === 401) {
                        setErrorRegistro("No se ha podido crear su sesión");
                    } else {
                        setErrorRegistro("Ha ocurrido un error al realizar el registro");
                    }
                } else {
                    setErrorRegistro("Ha ocurrido un error al realizar el registro");
                }
            } else {
                setErrorRegistro("Ha ocurrido un error al realizar el registro");
            }
        }

    };


    const router = useRouter();


    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 16);
    const minDate = fechaMinima.toISOString().split('T')[0];

    return (
        <div className="flex flex-wrap w-full">
            <div className="flex flex-col w-full md:w-1/2">
                <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                    <div className="mb-4 mt-6 mx-auto sm:max-w-xs">
                        <Image src={HeroMobile} alt='texto' />
                        <h4 className='text-center mt-4 text-lg font-medium'>Crea una cuenta</h4>
                    </div>
                    <form className="flex flex-col pt-2 md:pt-2" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="email" id="email" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email" {...register("email")} />

                            </div>
                            {errors.email?.message && <p className='text-red-700 texto-errores'>{errors.email?.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="6" r="4" fill="currentColor" />
                                        <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="currentColor" />
                                    </svg>
                                </span>
                                <input type="text" id="nombre" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Nombre" {...register("nombre")} />
                            </div>
                            {errors.nombre?.message && <p className='text-red-700 texto-errores'>{errors.nombre?.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                        <path opacity="0.5" d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                        <ellipse cx="12" cy="17" rx="6" ry="4" stroke="#1C274C" strokeWidth="1.5" />
                                        <path opacity="0.5" d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <input type="text" id="apellidos" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Apellidos" {...register("apellidos")} />
                            </div>
                            {errors.apellidos?.message && <p className='text-red-700 texto-errores'>{errors.apellidos?.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </span>
                                <input type="date" id="fechaNac" max={minDate} className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" {...register("fechaNac")} />
                            </div>
                            {errors.fechaNac?.message && <p className='text-red-700 texto-errores'>{errors.fechaNac?.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="password" id="design-login-password" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password" {...register("password")} />
                            </div>
                            {errors.password?.message && <p className='text-red-700 texto-errores'>{errors.password?.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="password" id="confirmPassword" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Confirm password" {...register("confirmPassword")} />
                            </div>
                            {errors.confirmPassword?.message && <p className='text-red-700 texto-errores'>{errors.confirmPassword?.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4 mb-12">
                            <div className="flex relative ">
                                <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        fill="currentColor"
                                        baseProfile="tiny"
                                        version="1.2"
                                        viewBox="0 0 256 256"
                                        xmlSpace="preserve"
                                    >
                                        <path d="M29.8 166.1c.6-20-10.3-27.6-23.6-32.6-4.4 17.2 7.8 31.5 23.6 32.6"></path>
                                        <path d="M32.8 76.7c8.5-18.2 1.4-29.4-8.8-39.3-10.7 14-5.2 32 8.8 39.3"></path>
                                        <path d="M37.6 127.2c-.6-20 10.3-27.6 23.6-32.6 4.4 17.2-7.8 31.4-23.6 32.6"></path>
                                        <path d="M37.6 158.1c-.6-20 10.3-27.6 23.6-32.6 4.4 17.2-7.8 31.4-23.6 32.6"></path>
                                        <path d="M37.6 96.3c-.6-20 10.3-27.6 23.6-32.6 4.4 17.2-7.8 31.5-23.6 32.6"></path>
                                        <path d="M29.8 135.3c.6-20-10.3-27.6-23.6-32.6-4.4 17.1 7.8 31.4 23.6 32.6"></path>
                                        <path d="M29.8 104.4c.6-20-10.3-27.6-23.6-32.6C1.8 89 14 103.2 29.8 104.4"></path>
                                        <path d="M179.9 255.4H72.5l53.7-93 53.7 93z"></path>
                                        <path d="M14.2 192.1L241.7 130.2 238.3 117.7 10.8 179.6z"></path>
                                        <path d="M174.7.6s1.7 32.8 30.4 30c0 .1 3.3-27.4-30.4-30"></path>
                                        <path d="M204.8 107.4c-3 4.3-8 7-13.6 7-4.6 0-9.1-2.2-12.1-5.2-6.2-6.8-14.2-21.9-14.2-21.9-4.5-9.1-6.9-16.2-6.9-23.4 0-15.2 12.3-28.4 27.6-28.4 7.5 0 14.3 3 19.3 7.9 5-4.9 11.8-7.9 19.3-7.9 15.3 0 27.6 13.2 27.6 28.4 0 7.1-2.4 14.2-6.9 23.4 0 0-8 15.1-14.2 21.9-3 3-7.5 5.2-12.1 5.2-5.8 0-10.8-2.8-13.8-7"></path>
                                    </svg>
                                </span>
                                <select
                                    id="tipoCuenta"
                                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    {...register("tipoCuenta")}
                                >
                                    {tiposCuentaOptions}
                                </select>
                                
                            </div>
                            {errorRegistro && <p className='text-red-700 texto-errores'>{errorRegistro}</p>}
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-webColor shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                            <span className="w-full">
                                Registrarse
                            </span>
                        </button>
                    </form>
                    <div className="pt-12 pb-12 text-center">
                        <p>
                            ¿Ya tienes una cuenta?
                            <Link href="/login" className="font-semibold underline ml-1">
                                ¡Inicia Sesión ahora!
                            </Link>
                        </p>
                    </div>
                    <div className='flex gap-4 item-center mt-4 mb-6'>
                        <button type="button" className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z">
                                </path>
                            </svg>
                            Facebook
                        </button>
                        <button type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
                                </path>
                            </svg>
                            Google
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2 shadow-2xl">
                <Image className="hidden object-cover min-h-full md:block" src={Hero} alt='texto login' />
            </div>
        </div>
    )
}
