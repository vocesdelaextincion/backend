import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

export const getTagById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;

    const newTag = await prisma.tag.create({
      data: {
        name,
      },
    });

    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedTag = await prisma.tag.update({
      where: { id },
      data: {
        name,
      },
    });

    res.status(200).json(updatedTag);
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.tag.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
