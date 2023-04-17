import express from "express";

import {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem
} from "../controllers/itemsController.js";
const router = express.Router();

router.route("/").get(getItems).post(createItem);
router.route("/:id").get(getItem).put(updateItem).delete(deleteItem);

export default router;
