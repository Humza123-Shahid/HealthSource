const express = require("express");
const router = express.Router();
var fetchuser = require("../../middleware/fetchuser");
const bcrypt = require("bcryptjs");
const Medicine = require("../../models/Medicine");
const { body, validationResult } = require("express-validator");

const medicineNames = [
  "Paracetamol",
  "Ibuprofen",
  "Amoxicillin",
  "Cetirizine",
  "Aspirin",
  "Metformin",
  "Omeprazole",
];
const categories = [
  "Analgesic",
  "Antibiotic",
  "Antihistamine",
  "Antacid",
  "Vitamin",
  "Diabetic",
];
const manufacturers = [
  "Pfizer",
  "GSK",
  "Novartis",
  "Sanofi",
  "Roche",
  "Johnson & Johnson",
];
const forms = ["tablet", "syrup", "injection", "ointment", "other"];

// Helper function to generate random integer
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random UPC code
const randomUPC = () =>
  Math.floor(Math.random() * 1e12)
    .toString()
    .padStart(12, "0");

// Helper function to generate random date in future (expiry)
const randomFutureDate = () => {
  const today = new Date();
  const future = new Date(
    today.getFullYear() + randomInt(1, 5),
    randomInt(0, 11),
    randomInt(1, 28),
  );
  return future;
};
router.post("/addbulkmedicine", async (req, res) => {
  try {
    let success = false;
    let medicines = [];

    for (let i = 0; i < 1000; i++) {
      const med = {
        name:
          medicineNames[randomInt(0, medicineNames.length - 1)] +
          " " +
          randomInt(100, 999),
        category: categories[randomInt(0, categories.length - 1)],
        manufacturer: manufacturers[randomInt(0, manufacturers.length - 1)],
        form: forms[randomInt(0, forms.length - 1)],
        unitPrice: parseFloat((Math.random() * 100).toFixed(2)),
        stock: randomInt(0, 500),
        expiryDate: randomFutureDate(),
        batchNumber: "B" + randomInt(1000, 9999),
        upc: randomUPC(),
      };

      medicines.push(med);
    }

    // Insert all records at once
    await Medicine.insertMany(medicines);
    console.log("1000 medicine records inserted");
    success=true;
    res.json({success})
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    //process.exit(1);
  }
});
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get("/fetchallmedicines", fetchuser, async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    //const questions=await Questions.find({user:req.user.id});
    res.json(medicines);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post(
  "/addmedicine",
  fetchuser,
  [body("name").isLength({ min: 1 })],
  async (req, res) => {
    try {
      let success = false;
      const {
        name,
        category,
        manufacturer,
        form,
        unitPrice,
        stock,
        expiryDate,
        batchNumber,
        upc,
      } = req.body;
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }
      const medicine = new Medicine({
        name,
        category,
        manufacturer,
        form,
        unitPrice,
        stock,
        expiryDate,
        batchNumber,
        upc,
      });
      const savedMedicine = await medicine.save();
      success = true;
      res.json({ success, data: savedMedicine });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put("/updatemedicine/:id", fetchuser, async (req, res) => {
  const {
    name,
    category,
    manufacturer,
    form,
    unitPrice,
    stock,
    expiryDate,
    batchNumber,
    upc,
  } = req.body;

  const newMedicine = {};
  if (name) {
    newMedicine.name = name;
  }
  if (category) {
    newMedicine.category = category;
  }
  if (manufacturer) {
    newMedicine.manufacturer = manufacturer;
  }
  if (form) {
    newMedicine.form = form;
  }
  if (unitPrice) {
    newMedicine.unitPrice = unitPrice;
  }
  if (stock) {
    newMedicine.stock = stock;
  }
  if (expiryDate) {
    newMedicine.expiryDate = expiryDate;
  }
  if (batchNumber) {
    newMedicine.batchNumber = batchNumber;
  }
  if (upc) {
    newMedicine.upc = upc;
  }

  let medicine = await Medicine.findById(req.params.id);
  if (!medicine) {
    return res.status(404).send("Not Found");
  }

  medicine = await Medicine.findByIdAndUpdate(
    req.params.id,
    { $set: newMedicine },
    { new: true },
  );
  res.json({ success: true, data: medicine });
});
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete("/deletemedicine/:id", fetchuser, async (req, res) => {
  let medicine = await Medicine.findById(req.params.id);
  if (!medicine) {
    return res.status(404).send("Not Found");
  }

  medicine = await Medicine.findByIdAndDelete(req.params.id);
  res.json({ Success: "Medicine has been deleted.", medicine: medicine });
});
module.exports = router;
