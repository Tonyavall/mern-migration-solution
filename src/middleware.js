import { verifyToken } from '@/server/utils/auth';

import { NextResponse } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(nextRequest) {
  const response = NextResponse.next();
  // allows token to be sent via req.body, req.query, or headers
  let token = nextRequest.cookies.get('token')?.value
  
  if (!token) {
    return response;
  }

  try {
    const { data } = verifyToken(token);
    console.log(data, "aouhdwudhw")
    nextRequest.user = data;

  } catch(err) {
    console.log(err)
    console.log('Invalid token');
  }

  return response;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '*',
// };
