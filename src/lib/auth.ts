import { SignJWT, jwtVerify } from 'jose';

const key = () => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SECRET must be set and at least 32 characters long');
  }
  return new TextEncoder().encode(secret);
};

export const signAdmin = () =>
  new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key());

export async function verifyAdmin(token?: string) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ['HS256'] });
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
