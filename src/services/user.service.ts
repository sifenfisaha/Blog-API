import User from "../models/user.model";
import z from "zod";
import { updateUserSchema } from "../utils/schemas";
import bcrypt from "bcryptjs";

type updateInput = z.infer<typeof updateUserSchema>;

export class UserService {
  static async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password -__v");
    if (!user) throw new Error("User not found");
    return user;
  }
  static async updateProfile(data: updateInput, userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (data.first_name) user.first_name = data.first_name;
    if (data.last_name) user.last_name = data.last_name;
    if (data.email) user.email = data.email;
    if (data.password) user.password = await bcrypt.hash(data.password, 10);

    await user.save();
    return user;
  }
  static async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}
