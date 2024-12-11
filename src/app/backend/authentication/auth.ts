import getServerSession, { type DefaultSession, type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginHandle } from "../user/loginHandle";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User;  
    }

    interface User {
        token: string;  
        id: string;
        email: string;
        name: string;
    }
}


export type User = {
    token: string;
    id: string;  
    email: string; 
    name: string; 
} & DefaultSession["user"]; 

export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            
            if (token) {
                session.user.token = token.token as string;
                session.user.id = String(token.id);  
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }

            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                
                token.id = String(user.id); 
                token.email = user.email as string;
                token.name = user.name as string;
                token.token = user.token as string;  
            }

            return token;
        },
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "E-mail", type: "text" },
                password: { label: "Senha", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const handler = new LoginHandle();
                    const user = await handler.execute(credentials);

                    if (user && user.token) {
                        
                        return {
                            id: String(user.id),  
                            email: user.email,
                            name: user.name,
                            token: user.token, 
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Erro ao efetuar o login:", error);
                    return null;
                }
            },
        }),
    ],
};

export const getServerAuthSession = async () => await getServerSession(authOptions);
