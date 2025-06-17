import { Request, Response } from 'express';
import { OK, CREATED, BAD_REQUEST, NOT_FOUND } from '../utils/http-status';
import { dealersStore } from "../store/dealers.store"

export const getDealers = async (req: Request, res: Response): Promise<void> => {
  try {

    const dealers = dealersStore.findAll()

    console.log(dealers)

    res.send("get dealers route")

  } catch (error) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create dealer',
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
