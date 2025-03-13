import NextAuth from "next-auth";
import {authConfig} from "./authConfig";

const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth(authConfig);

export { GET, POST, auth, signIn, signOut };