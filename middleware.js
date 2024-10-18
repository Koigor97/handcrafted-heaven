import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function middleware(request) {
  // const token = request.cookies.get("token")?.value;
  // console.log("middleware cookies", token);

  // if (!token) {
  //   // Redirect to login if no token found
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // try {
  //   // Verify JWT token
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log("JWT verification successful:", decoded);

  //   // Protect the dashboard route for artisans only
  //   const { role } = decoded;
  //   console.log("role", role);

  //   const artisanRoutes = request.url.includes("/dashboard");
  //   console.log("artisanRoutes", artisanRoutes);

  //   if (artisanRoutes && role !== "artisan") {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("JWT verification failed:", error);
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  return NextResponse.next();
}
