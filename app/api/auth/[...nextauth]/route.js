import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createUserAccountWithGoogle } from '@/services/createAccountService';
import { cookies } from 'next/headers';
import { createToken } from '@/lib/auth';
import { getUserByEmail } from '@/services/userService';
import { redirect } from 'next/navigation';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile, account }) {
      try {
        const oauthProvider = account.provider;
        const oauthId = account.providerAccountId;
        const existingUser = await getUserByEmail(profile.email);

        if (!existingUser) {
          const userData = {
            name: profile.name,
            email: profile.email,
            oauth_provider: oauthProvider,
            oauth_id: oauthId,
            role: 'customer',
            address: profile.address || null,
            phone: profile.phone || null,
            user_image_url: profile.picture || null
          };
          const user = await createUserAccountWithGoogle(userData);

          delete user.password;
          const token = await createToken(user);
          cookies().set('token', token, {
            httpOnly: true
          });

          return true;
        }

        const token = await createToken(existingUser);
        cookies().set('token', token, {
          httpOnly: true
        });

        return true;
      } catch (error) {
        console.error('Error signing in:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    }
  }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
