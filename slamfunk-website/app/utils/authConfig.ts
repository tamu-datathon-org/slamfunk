import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
        callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && profile?.email) {
                return profile.email.endsWith("@tamu.edu");
            }
            return false;
        },
    },
    pages: {
        signIn: '/login',
            error: '/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
        debug: process.env.NODE_ENV === 'development',
}