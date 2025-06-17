import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import { dealersStore } from "../store/dealers.store"

export const getDealers = async (req: Request, res: Response): Promise<void> => {
  try {

    const dealers = dealersStore.findAll()

    res.status(OK).json({
      success: true,
      data: dealers,
    })

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch dealers',
    });
  }
};

export const createDealer = async (req: Request, res: Response): Promise<void> => {
  try {

    // { name: 'user1', email: 'user1.example.com', city: 'user city 1' }
    const { name, email, city } = req.body

    if (!name || !email || !city ) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "all fields are required",
      })
      return
    }

    const dealer = dealersStore.create({ name, email, city})

    console.log(dealer)

    res.status(CREATED).json({
      success: true,
      data: dealer,
    })

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create dealer',
    });
  }
};

export const getDealer = async (req: Request, res: Response): Promise<void> => {
  try {
    const dealer = dealersStore.findById(req.params.id)

    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "dealer not found",
      })
      return
    }

    res.status(OK).json({
      success: true,
      data: {
        ...dealer,
      },
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch list",
    })
  }
}

export const updateDealer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dealer = dealersStore.update(req.params.id, req.body)
    if (!dealer) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "dealer not found",
      })
      return
    }
    res.status(OK).json({
      success: true,
      data: dealer,
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update dealer",
    })
  }
}

export const deleteDealer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    // true or flase
    const deleted = dealersStore.delete(req.params.id)

    // if the list is not found
    if (!deleted) {
      res.status(NOT_FOUND).json({
        success: false,
        error: "dealer not found",
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
      error: error instanceof Error ? error.message : "Failed to delete list",
    })
  }
}