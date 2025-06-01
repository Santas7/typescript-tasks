import { prisma } from '@/server/db';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user?.password === credentials.password) {
          return {
            id: user.id,
            name: user.name ?? undefined,
            email: user.email ?? undefined,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = Number(token.sub);
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET, // Добавляем secret
};

export default NextAuth(authOptions);