import { createDealer, getDealers } from "../controllers/dealer.controller";
import { Router } from "express"
import { Request, Response } from 'express';

// item router
const router = Router({ mergeParams: true })

router.route("/").get(getDealers).post(createDealer)

export default router
