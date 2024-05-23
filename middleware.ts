import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      },
    });
  }
  
  const signature = req.headers.get('x-kimkim-signature');
  const apiKey = req.headers.get('x-kimkim-api-key');
  
  const validApiKey = process.env.NEXT_PUBLIC_KIMKIM_API_KEY;
  const validSecretKey = process.env.NEXT_PUBLIC_KIMKIM_SECRET_KEY;

  if (!signature || !apiKey) {
    return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();
  const encodedSecretKey = encoder.encode(validSecretKey);
  const payloadData = encoder.encode(apiKey);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encodedSecretKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureArrayBuffer = await crypto.subtle.sign('HMAC', cryptoKey, payloadData);
  const signatureHex = Array.from(new Uint8Array(signatureArrayBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

  if (apiKey !== validApiKey || signatureHex !== signature) {
    return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};