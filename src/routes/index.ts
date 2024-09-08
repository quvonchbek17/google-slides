import { verifyAccessToken } from "@middlewares"
import { AuthRouter, PresentationsRouter } from "@modules"

const { Router } = require("express")

const router = Router()

router.use("/auth", AuthRouter)
router.use("/presentations", PresentationsRouter)


export default router