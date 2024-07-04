'use client'
import Image from 'next/image';
import Link from 'next/link';
import Hero from 'public/images/login.png';
import HeroMobile from 'public/images/HeroMobile.svg';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from '../validations/userValidation';
import { useSession } from 'next-auth/react';

type Inputs = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(userValidation),
    });

    const router = useRouter();

    const handleSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = watch().email;
        const password = watch().password;

        const responseNextAuth = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (responseNextAuth?.error) {
            console.log(responseNextAuth.error);
            return;
        }

        const session = await getSession(); 
        if (session?.user.permiso == 1) {
            router.push("/panel");
        } else if (session?.user.permiso == 2) {
            router.push("/portalNutricionista");
        }
    };

    return (
        <div className="flex flex-wrap w-full">
            <div className="flex flex-col w-full md:w-1/2">
                <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                    <div className="mb-4 md:hidden">
                        <Image src={HeroMobile} alt='texto' />
                        <h4 className='text-center mt-4 text-lg font-medium'>Accede a tu cuenta</h4>
                    </div>
                    <div className="hidden md:flex md:flex-col md:items-center md:mx-auto md:max-w-sm">
                        <Image src={HeroMobile} alt='texto' />
                        <h4 className='text-center mt-4 text-lg font-medium'>Accede a tu cuenta</h4>
                    </div>
                    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit2}>
                        <div className="flex flex-col pt-4">
                            <div className="flex relative">
                                <span className="inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                                    </svg>
                                </span>
                                <input type="email" id="email" className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email" {...register("email")} />
                            </div>
                            {errors.email?.message && <p className='text-red-700 texto-errores'>{errors.email?.message}</p>}
                        </div>
                        <div className="flex flex-col pt-4 mb-12">
                            <div className="flex relative">
                                <span className="inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                                    </svg>
                                </span>
                                <input type="password" id="password" className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password" {...register("password")} />
                            </div>
                            {errors.password?.message && <p className='text-red-700 texto-errores'>{errors.password?.message}</p>}
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-webColor shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                            <span className="w-full">Inicia sesión</span>
                        </button>
                    </form>
                    
                    <div className="pt-12 pb-12 text-center">
                        <p>¿Todavía no eres usuario?
                            <Link href="/register" className="font-semibold underline ml-1">¡Regístrate ahora!</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2 shadow-2xl">
                <Image className="hidden object-cover w-full h-screen md:block" src={Hero} alt='texto login' />
            </div>
        </div>
    );
}

async function getSession() {
    const session = await fetch('/api/auth/session');
    return session.ok ? await session.json() : null;
}
