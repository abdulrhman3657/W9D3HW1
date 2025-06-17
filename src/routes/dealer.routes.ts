import { createDealer, deleteDealer, getDealer, getDealers, updateDealer } from "../controllers/dealer.controller";
import { Router } from "express"


const router = Router({ mergeParams: true })

router.route("/").get(getDealers).post(createDealer)
router.route("/:id").get(getDealer).put(updateDealer).delete(deleteDealer)
export default router
