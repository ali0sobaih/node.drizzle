import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export const generateToken = (payload, expiresIn = "1h") => {
  if (!SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign(payload, SECRET, { expiresIn });
};
