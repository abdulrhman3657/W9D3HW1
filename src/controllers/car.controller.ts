import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import { CarStore } from "../store/car.store"


export const getCars = async (req: Request, res: Response): Promise<void> => {
  try {

    const cars = CarStore.findAll()

    res.status(OK).json({
      success: true,
      data: cars,
    })

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch cars',
    });
  }
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {

    const { dealerId, carMakeId, name, price, year, color, wheelsCount} = req.body

    if (!dealerId || !carMakeId || !name || !price || !year || !color || !wheelsCount) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "all fields are required",
      })
      return
    }

    const car = CarStore.create({ dealerId, carMakeId, name, price, year, color, wheelsCount})

    res.status(CREATED).json({
      success: true,
      data: car,
    })

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create car',
    });
  }
};

export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = CarStore.findById(req.params.id)

    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car not found",
      })
      return
    }

    res.status(OK).json({
      success: true,
      data: {
        ...car,
      },
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch car",
    })
  }
}

export const updateCar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const car = CarStore.update(req.params.id, req.body)
    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car not found",
      })
      return
    }
    res.status(OK).json({
      success: true,
      data: car,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update car",
    })
  }
}

export const deleteCar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    // true or flase
    const car = CarStore.delete(req.params.id)

    if (!car) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car not found",
      })
      return
    }

    res.status(OK).json({
      success: true,
      data: {},
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete car",
    })
  }
}

export const Get_all_cars_by_dealerId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const id = req.params.id
    const dealerID = req.params.dealerID

    console.log(dealerID)
    console.log(id)


    const cars = CarStore.findAll()

    const filteredCars = cars.filter(car => {
      return car.dealerId == dealerID
    })

    res.status(OK).json({
      success: true,
      data: filteredCars,
    })

    // res.send("asas")


  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to Get cars by dealerId",
    })
  }
}

export const Get_all_cars_by_carMakeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    console.log(req.params.id)

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to Get cars by dealerId",
    })
  }
}