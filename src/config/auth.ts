export const authConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  accessTokenExpiration: "1h",
  refreshTokenExpiration: "30d",
  issuer: "express-nodejs-auth-service",
};
