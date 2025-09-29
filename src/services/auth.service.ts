import z from "zod";
import { loginSchema, registerSchema } from "../utils/schemas";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { TokenService } from "./token.service";

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
  static async login({ email, password }: LoginInput) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid cridential");
    }

    const userId = user._id.toString();

    const token = TokenService.generateToken({ userId });
    const safeUser = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    return { token, user: safeUser };
  }
}
