import jsonwebtoken from "jsonwebtoken";

export const generateToken = (res, id) => {
  const token = jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
