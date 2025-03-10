import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect(process.env.MONGO_URL as string);
=======
    await mongoose.connect(process.env.DATABASE_URL as string);
>>>>>>> 975addfb94aee9d418e1e470b2dc1d64e7972293
    console.log("MongoDB conectado!");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB", error);
  }
};
