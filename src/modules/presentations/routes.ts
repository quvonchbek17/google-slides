import { Router } from "express";
import {PresentationsController} from "./presentations";
import { createPageDto, createPresentationDto, deletePresentationDto, deletePresentationPageDto, getAccessTokenWithRefreshDto, getAllPageDto, getPresentationDto, validate } from "@middlewares";

const PresentationsRouter = Router()

PresentationsRouter.get('/all', PresentationsController.getAllPresentations)
PresentationsRouter.get('/all-page', validate(getAllPageDto, "query"), PresentationsController.getAllPages)
PresentationsRouter.get('/get-by-id', validate(getPresentationDto, "query"), PresentationsController.getPresentationById)
PresentationsRouter.post('/create', validate(createPresentationDto), PresentationsController.createPresentation)
PresentationsRouter.post('/create-page', validate(createPageDto), PresentationsController.createPage)
PresentationsRouter.patch('/update', PresentationsController.updatePresentation)
PresentationsRouter.delete('/delete', validate(deletePresentationDto), PresentationsController.deletePresentation)
PresentationsRouter.delete('/delete-page', validate(deletePresentationPageDto), PresentationsController.deletePage)

export {PresentationsRouter}