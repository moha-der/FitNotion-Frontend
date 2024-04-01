import { z } from 'zod';

const tiposUsuario = ['1', '2'] as const;

export type tiposUsuario = (typeof tiposUsuario)[number];

export const mappedtiposUsuario: {[key in tiposUsuario]: string} = {
    1: "Consumidor",
    2: "Nutricionista",
}

export const userValidation = z.object( {
    nombre: z
    .string()
    .min(3, {
      message: "El nombre tiene que tener mínimo 3 carácteres",
    })
    .max(200, {
      message: "El nombre tiene que tener máximo 200 carácteres",
    }),
    apellidos: z
    .string()
    .min(3, {
      message: "Los apellidos tiene que tener mínimo 3 carácteres",
    })
    .max(200, {
      message: "Los apellidos tiene que tener máximo 200 carácteres",
    }),
    email: z.string().email({
        message: "Introduce un email válido",
    }),
    password: z.string().min(6, {
        message: "La contraseña tiene que tener más de 6 carácteres",
    }) 
    .max(20, {
        message: 'La contraseña no puede tener más de 20 caracteres',
    })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    }),
    confirmPassword: z.string().min(6, {
        message: "La contraseña tiene que tener más de 6 carácteres",
    }),
    fechaNac: z.string().refine(dob => new Date(dob).toString() !== "Invalid Date", {
        message: "Introduzca una fecha de nacimiento válida"
    }),
    tipoCuenta: z.enum(tiposUsuario, {
      errorMap: () => ({ message: "Selecciona un tipo de usuario" }),
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})