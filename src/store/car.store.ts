import { List } from "../models/car.model";
import { generateId } from "../utils/generate-id";

const carMake: Map<string, List> = new Map();

const create = (data: Omit<List, 'id' | 'createdAt' | 'updatedAt'>): List => {
  const id = generateId();
  const now = new Date();
  const list: List = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  carMake.set(id, list);
  return list;
}

const findAll = (): List[] => {
  return Array.from(carMake.values());
}

const findById = (id: string): List | undefined => {
  return carMake.get(id);
}

const update = (id: string, data: Partial<Omit<List, 'id' | 'createdAt'>>): List | undefined => {
  const carmake = carMake.get(id);
  if (!carmake) return undefined;

  const updatedDealer: List = {
    ...carmake,
    ...data,
    updatedAt: new Date(),
  };

  carMake.set(id, updatedDealer);
  return updatedDealer;
}

const deleteDealer = (id: string): boolean => {
  return carMake.delete(id);
}

export const CarMakeStore = {
  create,
  findAll,
  findById,
  update,
  delete: deleteDealer,
};