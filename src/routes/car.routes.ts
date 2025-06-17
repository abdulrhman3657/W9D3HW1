import { createCarMake, deleteCarMake, getCarMake, getCarMakes, updateCarMake } from "../controllers/car.controller";
import { Router } from "express"


const router = Router({ mergeParams: true })

router.route("/").get(getCarMakes).post(createCarMake)
router.route("/:id").get(getCarMake).put(updateCarMake).delete(deleteCarMake)

export default router
