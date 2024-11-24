import jwt from "jsonwebtoken";

const generateToken = (session, exp) => {
  const token = jwt.sign({ session }, process.env.JWT_SECRET, {
    expiresIn: exp,
  });

  return token;
};

export default generateToken;

export const verifyJWT = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return { payload, isExpired: false };
  } catch (error) {
    return { payload: null, isExpired: error.message.includes("jwt expired") };
  }
};
