const router = require("express").Router();
const businessController = require("../controllers/business");

router.get("/", businessController.getBusinesses);
router.get("/:businessId", businessController.getBusiness);

module.exports = router;