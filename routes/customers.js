const express = require("express");
const { Customer, validate } = require("../models/customer");
const router = express.Router();
const validator = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectid");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", [auth, validator(validate)], async (req, res) => {
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.send(customer);
});

router.put(
  "/:id",
  [auth, validateObjectId, validator(validate)],
  async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
      },
      { new: true }
    );

    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");

    res.send(customer);
  }
);

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
