import { List } from "../models/car.model";
import { generateId } from "../utils/generate-id";

const cars: Map<string, List> = new Map();

const create = (data: Omit<List, 'id' | 'createdAt' | 'updatedAt'>): List => {
  const id = generateId();
  const now = new Date();
  const list: List = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  cars.set(id, list);
  return list;
}

const findAll = (): List[] => {
  return Array.from(cars.values());
}

const findById = (id: string): List | undefined => {
  return cars.get(id);
}

const update = (id: string, data: Partial<Omit<List, 'id' | 'createdAt'>>): List | undefined => {
  const carmake = cars.get(id);
  if (!carmake) return undefined;

  const updatedDealer: List = {
    ...carmake,
    ...data,
    updatedAt: new Date(),
  };

  cars.set(id, updatedDealer);
  return updatedDealer;
}

const deleteDealer = (id: string): boolean => {
  return cars.delete(id);
}

export const CarStore = {
  create,
  findAll,
  findById,
  update,
  delete: deleteDealer,
};