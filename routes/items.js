const Item = require("../item");
const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
  try {
    return res.json({ items: Item.all() });
  } catch (err) {
    return next(err);
  }
});

router.post("", (req, res, next) => {
  try {
    let i = new Item(req.body.name, req.body.price);
    return res.json({ item: i });
  } catch (err) {
    return next(err);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    let target = Item.get(req.params.name);
    return res.json({ item: target });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    let target = Item.update(req.params.name, req.body);
    return res.json({ item: target });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    Item.delete(req.params.name);
    return res.json({ message: `Item "${req.params.name}" deleted` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
