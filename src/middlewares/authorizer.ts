import { Request, Response, NextFunction } from "express";
import jwt, { decode, verify } from "jsonwebtoken";

interface DecodedToken {
  id: string;
}

export function authorizer(
  req: Request,
  res: Response,
  next: NextFunction
): Response<void> | any {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const data = jwt.verify(
      token.replace("Bearer ", ""),
      JWT_SECRET as string
    ) as DecodedToken;

    req.userId = data.id;

    console.log("Usuário autenticado:", req.userId);

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido!" });
  }
}
