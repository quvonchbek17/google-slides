import { Request, Response, NextFunction } from "express";
import { slides_v1 } from "googleapis";
import { ErrorHandler } from "@errors";
import { slidesBuilder, driveBuilder } from "@config";
import { v4 } from "uuid";

export class PresentationsController {
  static async getAllPresentations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const result = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.presentation'",
        fields: "*",
      });

      res.status(200).send({
        success: true,
        message: "Barcha Google Slides fayllari muvaffaqiyatli olindi",
        data: result.data.files,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async getPresentationById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const slides = await slidesBuilder(token);
      const { presentationId } = req.query;

      const result = await slides.presentations.get({
        presentationId: String(presentationId),
      });

      res.status(200).send({
        success: true,
        message: "Prezentatsiya muvaffaqiyatli olindi",
        data: result.data,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async createPresentation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const slides = await slidesBuilder(token);
      const { title } = req.body;

      const result = await slides.presentations.create({
        requestBody: {
          title
        }
      });

      res.status(201).send({
        success: true,
        message: "Prezentatsiya muvaffaqiyatli yaratildi",
        data: result.data
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async updatePresentation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const slides = await slidesBuilder(token);
      const { presentationId, requests } = req.body;

      const result = await slides.presentations.batchUpdate({
        presentationId,
        requestBody: {
            requests
        }
      });

      res.status(200).send({
        success: true,
        message: "Prezentatsiyada bir nechta yangilanishlar bajarildi",
        data: result.data
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status));
    }
  }

  static async deletePresentation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Access token olish
      const token = req.headers.access_token as string;
      const drive = await driveBuilder(token);

      const { presentationId } = req.body;

      await drive.files.delete({
        fileId: presentationId
      });

      // Muvaffaqiyatli javob qaytarish
      res.status(200).send({
        success: true,
        message: "Presentation muvaffaqiyatli o'chirildi."
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status || 500));
    }
  }

  static async createPage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const slides = await slidesBuilder(token)

      const { presentationId } = req.body;

      const pageId = `page_${v4()}`;

      // Sahifa yaratish uchun so'rov
      const result = await slides.presentations.batchUpdate({
        presentationId,
        requestBody: {
          requests: [{
            createSlide: {
              objectId: pageId
            }
          }]
        }
      });

      res.status(201).send({
        success: true,
        message: "Yangi sahifa muvaffaqiyatli yaratildi",
        data: result.data
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status || 500));
    }
  }

  static async deletePage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const token = req.headers.access_token as string;
        const slides = await slidesBuilder(token)

        const { presentationId, pageId } = req.body;

      // Sahifani o'chirish so'rovi
      await slides.presentations.batchUpdate({
        presentationId,
        requestBody: {
          requests: [{
            deleteObject: {
              objectId: pageId
            }
          }]
        }
      });

      res.status(200).send({
        success: true,
        message: "Sahifa muvaffaqiyatli o'chirildi"
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status || 500));
    }
  }

  static async getAllPages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.access_token as string;
      const slides = await slidesBuilder(token)
      const { presentationId } = req.query;

      // Presentation ichidagi barcha sahifalarni olish
      const result = await slides.presentations.get({
        presentationId: String(presentationId)
      });

      res.status(200).send({
        success: true,
        message: "Barcha sahifalar muvaffaqiyatli olindi",
        data: result.data.slides
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, error.status || 500));
    }
  }

}
