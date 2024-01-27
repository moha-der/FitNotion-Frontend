'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Hero from 'public/images/login.png'
import HeroMobile from 'public/images/HeroMobile.svg'
import { useState } from 'react';
import { signIn } from "next-auth/react";
import axios from 'axios'
import { useRouter } from "next/navigation";

const page = () => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [nombre, setNombre] = useState<string>();
    const [apellidos, setApellidos] = useState<string>();
    const [confirmpassword, setConfirmPassword] = useState<string>();
    const [errors, setErrors] = useState<string[]>([]);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        var usuario = {
            id_Usuario: "string",
            email: email,
            password: password,
            nombre: nombre,
            apellidos: apellidos,
            edad: 20,
            tipo_usuario: 1
        }

    

        const response = await fetch('http://fitnotionapi.somee.com/api/Account/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        console.log(response)
     
        const responseNextAuth = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
    
        if (responseNextAuth?.error) {
          setErrors(responseNextAuth.error.split(","));
          return;
        }
    
        router.push("/panel");
    };

  return (
    <div className="flex flex-wrap w-full">
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                        <div className="mb-4 mt-6 mx-auto sm:max-w-xs md:max-w-sm">
                            <Image src={HeroMobile} alt='texto' />
                            <h4 className='text-center mt-4 text-lg font-medium'>Crea una cuenta</h4>
                        </div>
                        <form className="flex flex-col pt-2 md:pt-2" onSubmit={handleSubmit}>
                            <div className="flex flex-col pt-4">
                                <div className="flex relative ">
                                    <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                            </path>
                                        </svg>
                                    </span>
                                    <input type="text" id="design-login-email" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email" name="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="flex relative ">
                                    <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="6" r="4" fill="currentColor"/>
                                        <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <input type="text" id="nombre" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Nombre" name="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)}/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="flex relative ">
                                    <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5"/>
                                        <path opacity="0.5" d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                        <path opacity="0.5" d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                        <ellipse cx="12" cy="17" rx="6" ry="4" stroke="#1C274C" strokeWidth="1.5"/>
                                        <path opacity="0.5" d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                        <path opacity="0.5" d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                    </span>
                                    <input type="text" id="apellidos" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Apellidos" name="apellidos" value={apellidos} onChange={(event) => setApellidos(event.target.value)}/>
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="flex relative ">
                                    <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                            </path>
                                        </svg>
                                    </span>
                                    <input type="password" id="design-login-password" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4 mb-12">
                                <div className="flex relative ">
                                    <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                            </path>
                                        </svg>
                                    </span>
                                    <input type="password" id="confirmpassword" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Confirm password" name="confirmpassword" value={confirmpassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                                </div>
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
                        <div className='flex gap-4 item-center mt-12'>
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
                    <Image className="hidden object-cover w-full h-screen md:block" src={Hero} alt='texto login' />
                </div>
            </div>
  )
}

export default page