import { getRepository, Not, IsNull } from "typeorm";
import { isAfter, parseISO } from "date-fns";
import Item from "../models/Item";

class SwitchButtonByCronService {
  public async execute(): Promise<void> {
    const itemRespository = getRepository(Item);

    const itemsForTurnOff = await itemRespository.find({
      where: { date_turn_off: Not(IsNull()) },
    });

    const itemsForTurnOn = await itemRespository.find({
      where: { date_turn_on: Not(IsNull()) },
    });

    console.log(new Date());

    itemsForTurnOn?.forEach(async (item) => {
      if (item?.date_turn_on) {
        const turnOn = isAfter(new Date(), item.date_turn_on);

        if (!turnOn) return;

        item.date_turn_on = null;
        item.switched = true;
        itemRespository.save(item);
      }
    });

    itemsForTurnOff?.forEach(async (item) => {
      if (item?.date_turn_off) {
        const turnOff = isAfter(new Date(), item.date_turn_off);

        if (!turnOff) return;

        item.date_turn_off = null;
        item.switched = false;
        itemRespository.save(item);
      }
    });
  }
}

export default SwitchButtonByCronService;
