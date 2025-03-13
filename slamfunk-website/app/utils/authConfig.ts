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
                // create user in database only if it doesn't exist'
                const res = await fetch(`${process.env.NEXTAUTH_URL}api/user/${user.id}`);
                if (res.status === 404) {
                    await fetch(`${process.env.NEXTAUTH_URL}api/user`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            uid: user.id,
                            email: profile.email,
                            name: profile.name,
                            maxScore: 0,
                        }),
                    });
                }
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
