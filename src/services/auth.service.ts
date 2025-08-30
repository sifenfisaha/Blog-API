import z from "zod";
import { loginSchema, registerSchema } from "../utils/schemas";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export class AuthService {
  static async register({
    email,
    first_name,
    last_name,
    password,
  }: RegisterInput) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User alread exist");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      first_name,
      last_name,
      password: hashedPassword,
    });

    await user.save();
  }
}
