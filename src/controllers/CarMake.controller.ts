import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import { CarMakeStore } from "../store/CarMake.store"


export const getCarMakes = async (req: Request, res: Response): Promise<void> => {
  try {

    const carMake = CarMakeStore.findAll()

    res.status(OK).json({
      success: true,
      data: carMake,
    })

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch carMakes',
    });
  }
};

export const createCarMake = async (req: Request, res: Response): Promise<void> => {
  try {

    const { country, brand, city } = req.body

    if (!country || !city ) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "all fields are required",
      })
      return
    }

    const carMake = CarMakeStore.create({ country, brand})

    res.status(CREATED).json({
      success: true,
      data: carMake,
    })

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create dealer',
    });
  }
};

export const getCarMake = async (req: Request, res: Response): Promise<void> => {
  try {
    const carmake = CarMakeStore.findById(req.params.id)

    if (!carmake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car make not found",
      })
      return
    }

    res.status(OK).json({
      success: true,
      data: {
        ...carmake,
      },
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch car make",
    })
  }
}

export const updateCarMake = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carMake = CarMakeStore.update(req.params.id, req.body)
    if (!carMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car make not found",
      })
      return
    }
    res.status(OK).json({
      success: true,
      data: carMake,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update carMake",
    })
  }
}

export const deleteCarMake = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    // true or flase
    const carMake = CarMakeStore.delete(req.params.id)

    if (!carMake) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "car make not found",
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
      error: error instanceof Error ? error.message : "Failed to delete carMake",
    })
  }
}