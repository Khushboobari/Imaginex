import express from "express"
import savePostController from "../controllers/savePostController.js"
import protect from "../middleware/authMiddleware.js"



const router = express.Router()


router.get("/", protect.forUser, savePostController.getSavePosts)
router.delete("/:pid", protect.forUser, savePostController.removeSavedPost)

export default router