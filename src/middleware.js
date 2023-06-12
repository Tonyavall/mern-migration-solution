import { verifyToken } from '@/server/utils/auth';

import { NextResponse } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export async function middleware(nextRequest) {
  const response = NextResponse.next();
  // allows token to be sent via req.body, req.query, or headers
  let token = nextRequest.cookies.get('token')?.value
  
  if (!token) {
    return response;
  }

  const payload = await verifyToken(token);
  if (!payload) { // when payload is null, token is invalid
    response.cookies.delete('token'); // delete cookie from the response

    // possibly reroute to login page.
  }

  nextRequest.user = payload;

  return response;
}