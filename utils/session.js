import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: "f8d8f05665a2bb40d4a8272c5e09a636312f0d1afd5d1e4bc9f180ed38b202c8",
    cookieName: "keep-app-cookie",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
