import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'


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
                const response = await axios.post('http://fitnotionapi.somee.com/api/Account/Login', credentials);

                return {
                    token: response.data.token,
                    permiso: response.data.permiso,
                    email: response.data.email
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
          return { ...token, ...user };
        },
        async session({ session, token }) {
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