import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    // Secret for Next-auth, without this JWT encryption/decryption won't work
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    theme: {
        colorScheme: "dark",
        brandColor: "#000000"
    }
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
