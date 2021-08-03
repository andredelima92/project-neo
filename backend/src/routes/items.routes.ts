import { Router } from "express";
import { getRepository } from "typeorm";
import Item from "../models/Item";
import CreateItemService from "../services/CreateItemService";
import UpdateItemDateService from "../services/UpdateItemDateService";

const itemsRouter = Router();

itemsRouter.get("/", async (request, response) => {
  const itemsRepository = getRepository(Item);
  const items = await itemsRepository.find();

  return response.json(items);
});

itemsRouter.post("/", async (request, response) => {
  const { name } = request.body;

  const createAppointment = new CreateItemService();

  const item = await createAppointment.execute({
    name,
  });

  return response.json(item);
});

itemsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  const scheduleRepository = getRepository(Item);

  const schedule = await scheduleRepository.findOne(id);

  return response.json(schedule);
});

itemsRouter.patch("/", async (request, response) => {
  const { id, date_turn_on, date_turn_off, switched } = request.body;

  const updateItemDateService = new UpdateItemDateService();

  const item = await updateItemDateService.execute({
    id,
    date_turn_on,
    date_turn_off,
    switched,
  });

  return response.json(item);
});

export default itemsRouter;
