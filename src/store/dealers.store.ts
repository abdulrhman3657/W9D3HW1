import { List } from "../models/dealer.model";
import { generateId } from "../utils/generate-id";

const dealers: Map<string, List> = new Map();

const create = (data: Omit<List, 'id' | 'createdAt' | 'updatedAt'>): List => {
  const id = generateId();
  const now = new Date();
  const list: List = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  dealers.set(id, list);
  return list;
}

const findAll = (): List[] => {
  return Array.from(dealers.values());
}

const findById = (id: string): List | undefined => {
  return dealers.get(id);
}

const update = (id: string, data: Partial<Omit<List, 'id' | 'createdAt'>>): List | undefined => {
  const dealer = dealers.get(id);
  if (!dealer) return undefined;

  const updatedDealer: List = {
    ...dealer,
    ...data,
    updatedAt: new Date(),
  };

  dealers.set(id, updatedDealer);
  return updatedDealer;
}

const deleteDealer = (id: string): boolean => {
  return dealers.delete(id);
}

export const dealersStore = {
  create,
  findAll,
  findById,
  update,
  delete: deleteDealer,
};