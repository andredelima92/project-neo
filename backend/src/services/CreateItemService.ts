import { getRepository } from "typeorm";

import Item from "../models/Item";

interface Request {
  name: string;
}

class CreateItemService {
  public async execute({ name }: Request): Promise<Item> {
    const itemsRepository = getRepository(Item);

    const item = itemsRepository.create({
      name,
      switched: false,
    });

    await itemsRepository.save(item);

    return item;
  }
}

export default CreateItemService;
