import { createCar, deleteCar, Get_all_cars_by_carMakeId, Get_all_cars_by_dealerId, getCar, getCars, updateCar } from "../controllers/car.controller";
import { Router } from "express"


const router = Router({ mergeParams: true })

// - Get all cars by dealerId Get_all_cars_by_dealerId
// - Get all cars by carMakeId

router.route("/").get(getCars).post(createCar)
router.route("/:id").get(getCar).put(updateCar).delete(deleteCar)
router.route("/dealer/:dealerID").get(Get_all_cars_by_dealerId)
router.route("/carmake/:carMakeId").get(Get_all_cars_by_carMakeId)

export default router
