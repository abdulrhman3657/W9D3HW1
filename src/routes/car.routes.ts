import { createCar, deleteCar, getCar, getCars, updateCar } from "../controllers/car.controller";
import { Router } from "express"


const router = Router({ mergeParams: true })

router.route("/").get(getCars).post(createCar)
router.route("/:id").get(getCar).put(updateCar).delete(deleteCar)

export default router
