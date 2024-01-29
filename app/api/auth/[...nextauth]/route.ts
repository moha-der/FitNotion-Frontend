import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

interface User {
    email: string;
    token: string;
    permiso: string;
}

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type:"text", placeholder:"jsmith" },
                password: {label: "Password", type:"password"}
            },
            async authorize(credentials) {

                console.log(credentials)

                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Account/Login`, credentials);


                    if (response.data.msg == 'OK') {
                        const user: any = {
                            token: response.data.token,
                            permiso: response.data.permiso,
                            email: response.data.email
                        }
    
                        return user;
                    }
                    return null;

                } catch (e: any) {
                    throw e;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user} : {token: any, user: any}) {
          return { ...token, ...user };
        },
        async session({ session, token } : {session: any, token: any}) {
          session.user = token as any;
          return session;
        },
    },
    pages: {
        signIn: "/login",
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}