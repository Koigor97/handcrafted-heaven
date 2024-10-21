import { jwtVerify, SignJWT } from 'jose';

export const createToken = async (user) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT({
    id: user.user_id,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return token;
};

export const verifyToken = async (token) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};
