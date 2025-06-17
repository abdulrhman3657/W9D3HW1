import { List } from "../models/dealer.model";
import { generateId } from "../utils/generate-id";

const lists: Map<string, List> = new Map();

const create = (data: Omit<List, 'id' | 'createdAt' | 'updatedAt'>): List => {
  const id = generateId();
  const now = new Date();
  const list: List = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  lists.set(id, list);
  return list;
}

const findAll = (): List[] => {
  return Array.from(lists.values());
}


export const dealersStore = {
  create,
  findAll,
};