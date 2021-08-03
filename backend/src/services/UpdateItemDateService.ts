import { getRepository } from "typeorm";
import Item from "../models/Item";
import AppError from "../errors/AppError";
import { isBefore, parseISO } from "date-fns";

interface Request {
  id: string;
  date_turn_on?: string;
  date_turn_off?: string;
  switched: true | false;
}

class UpdateItemDateService {
  public async execute({
    id,
    date_turn_off,
    date_turn_on,
    switched,
  }: Request): Promise<Item> {
    const itemRespository = getRepository(Item);

    const item = await itemRespository.findOne(id);

    if (!item) {
      throw new AppError("Item não encontrado.", 401);
    }

    item.date_turn_off = null;
    item.date_turn_on = null;

    if (date_turn_off && isBefore(new Date(), parseISO(date_turn_off))) {
      item.date_turn_off = parseISO(date_turn_off);
    }

    if (date_turn_on && isBefore(new Date(), parseISO(date_turn_on))) {
      item.date_turn_on = parseISO(date_turn_on);
    }

    item.switched = switched ?? item.switched;

    await itemRespository.save(item);

    return item;
  }
}

export default UpdateItemDateService;
