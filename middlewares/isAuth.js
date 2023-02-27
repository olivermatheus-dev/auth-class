import * as dotenv from "dotenv";
import { expressjwt } from "express-jwt";

dotenv.config();

export default expressjwt({
  secret: process.env.TOKEN_SIGN_SECRET,
  algorithms: ["HS256"],
});
