import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
// import { NextRequest, NextResponse } from 'next/server';

// export async function middleware(req: NextRequest) {
//   const res =NextResponse.next();
//   const supabase = createMiddlewareClient({req, res});

//   const { 
//     data: {
//       session
//     }
//   } = await supabase.auth.getSession();
//   if(!session){
//     return NextResponse.rewrite( new URL('/login', req.url));
//   }
//   return res;
// }

// export const config = {
//   matcher : [
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ]
// }