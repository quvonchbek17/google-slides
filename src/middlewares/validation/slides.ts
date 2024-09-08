import Joi from "joi"

export const getPresentationDto = Joi.object({
    presentationId: Joi.string().required()
});


export const createPresentationDto = Joi.object({
    title: Joi.string().required()
});

// Common properties for transform (xususiyatlarni o'zgartirish uchun)
const transformSchema = Joi.object({
  scaleX: Joi.number().required(),
  scaleY: Joi.number().required(),
  translateX: Joi.number().required(),
  translateY: Joi.number().required(),
  unit: Joi.string().valid('PT').required()
});

// Common properties for size (o'lchamlar)
const sizeSchema = Joi.object({
  width: Joi.object({
    magnitude: Joi.number().required(),
    unit: Joi.string().valid('PT').required()
  }).required(),
  height: Joi.object({
    magnitude: Joi.number().required(),
    unit: Joi.string().valid('PT').required()
  }).required()
});

// Common properties for color (rang)
const rgbColorSchema = Joi.object({
  red: Joi.number().min(0).max(1).required(),
  green: Joi.number().min(0).max(1).required(),
  blue: Joi.number().min(0).max(1).required()
});

export const deletePresentationDto = Joi.object({
    presentationId: Joi.string().required()
});

export const createPageDto = Joi.object({
    presentationId: Joi.string().required()
});

export const getAllPageDto = Joi.object({
    presentationId: Joi.string().required()
});

export const deletePresentationPageDto = Joi.object({
    presentationId: Joi.string().required(),
    pageId: Joi.string().required()
});
