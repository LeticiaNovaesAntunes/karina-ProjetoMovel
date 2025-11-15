import { PrismaClient } from "../generated/prisma/index";
import type { Request, Response } from "express";
import type { ClassDTO, UpdateClassDTO } from "../DTO/ClassDTO";

const prisma = new PrismaClient();

export const createClass = async (req: Request, res: Response) => {
  const { exercise_name, level, image_url, video_url, part_exercised, description } = req.body as ClassDTO;

  try {
    const newClass = await prisma.classes.create({
      data: { exercise_name, level, image_url, video_url, part_exercised, description },
    });

    console.log("\n\n CLASSE :::", newClass);
    res.json(newClass);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar classe" });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as UpdateClassDTO;

  try {
    const updatedClass = await prisma.classes.update({
      where: { id: String(id) },
      data,
    });

    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar classe" });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.classes.delete({ where: { id: String(id) } });
    res.json({ message: "Classe deletada com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar classe" });
  }
};

export const getClasses = async (req: Request, res: Response) => {
  try {
    const classes = await prisma.classes.findMany();
    res.json(classes);
  } catch (error) {
    res.status(400).json({ error: "Erro ao listar classes" });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const classData = await prisma.classes.findUnique({
      where: { id: String(id) },
    });

    res.json(classData);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar classe" });
  }
};

export const getClassesByPart = async (req: Request, res: Response) => {
  const { part } = req.params;

  try {
    const classes = await prisma.classes.findMany({
      where: { part_exercised: part as any },
    });

    res.json(classes);
  } catch (error) {
    res.status(400).json({ error: "Erro ao buscar aulas" });
  }
};