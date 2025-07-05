import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { extname } from "path";
import prisma from "../config/prisma";
import { deleteS3Object, uploadToS3 } from "../utils/s3";

export const getRecordings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const recordings = await prisma.recording.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(recordings);
  } catch (error) {
    next(error);
  }
};

export const getRecordingById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const recording = await prisma.recording.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });

    if (!recording) {
      res.status(404).json({ message: "Recording not found" });
      return;
    }

    res.status(200).json(recording);
  } catch (error) {
    next(error);
  }
};

export const createRecording = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, tags, metadata } = req.body;
    const file = req.file;

    if (!title || !file) {
      res.status(400).json({ message: "Title and file are required." });
      return;
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      res
        .status(500)
        .json({ message: "S3 bucket name not configured on server." });
      return;
    }

    const fileExtension = extname(file.originalname);
    const fileKey = `${randomUUID()}${fileExtension}`;
    const { fileUrl } = await uploadToS3(bucketName, fileKey, file.buffer);

    const tagOperations =
      tags && Array.isArray(tags)
        ? tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          }))
        : [];

    // Metadata is expected to be a stringified JSON from the frontend
    const parsedMetadata = metadata ? JSON.parse(metadata) : undefined;

    const newRecording = await prisma.recording.create({
      data: {
        title,
        description,
        fileUrl,
        fileKey,
        metadata: parsedMetadata,
        tags: {
          connectOrCreate: tagOperations,
        },
      },
      include: {
        tags: true,
      },
    });

    res.status(201).json(newRecording);
  } catch (error) {
    next(error);
  }
};

export const updateRecording = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, tags, metadata } = req.body;
    const file = req.file;

    const recording = await prisma.recording.findUnique({
      where: { id },
    });

    if (!recording) {
      res.status(404).json({ message: "Recording not found" });
      return;
    }

    let fileUrl = recording.fileUrl;
    let fileKey = recording.fileKey;

    if (file) {
      const bucketName = process.env.AWS_S3_BUCKET_NAME;
      if (!bucketName) {
        res
          .status(500)
          .json({ message: "S3 bucket name not configured on server." });
        return;
      }

      if (recording.fileKey) {
        await deleteS3Object(bucketName, recording.fileKey);
      }

      const fileExtension = extname(file.originalname);
      const newFileKey = `${randomUUID()}${fileExtension}`;
      const uploadResult = await uploadToS3(
        bucketName,
        newFileKey,
        file.buffer
      );
      fileUrl = uploadResult.fileUrl;
      fileKey = uploadResult.fileKey;
    }

    // Upsert tags to ensure they exist before connecting them
    if (tags && Array.isArray(tags)) {
      await Promise.all(
        tags.map((tagName: string) =>
          prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          })
        )
      );
    }

    // Metadata is expected to be a stringified JSON from the frontend
    const parsedMetadata = metadata ? JSON.parse(metadata) : undefined;

    const updatedRecording = await prisma.recording.update({
      where: { id },
      data: {
        title,
        description,
        fileUrl,
        fileKey,
        metadata: parsedMetadata,
        tags: tags
          ? { set: tags.map((tagName: string) => ({ name: tagName })) }
          : undefined,
      },
      include: {
        tags: true,
      },
    });

    res.status(200).json(updatedRecording);
  } catch (error) {
    next(error);
  }
};

export const deleteRecording = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const recording = await prisma.recording.findUnique({
      where: { id },
    });

    if (!recording) {
      res.status(404).json({ message: "Recording not found" });
      return;
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      res
        .status(500)
        .json({ message: "S3 bucket name not configured on server." });
      return;
    }

    // Delete the object from S3 first
    await deleteS3Object(bucketName, recording.fileKey);

    // Then delete the recording from the database
    await prisma.recording.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
