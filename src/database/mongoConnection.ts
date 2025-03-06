import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("MongoDB conectado!");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB", error);
  }
};
