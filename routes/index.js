const express = require('express');
const router = express.Router();



router.use(express.json());
router.use("/businesses", require("./businesses"));
router.use("/users", require("./users"));

router.use("/*any", function (req, res, next) {
    res.status(404).json({error: "Requested resource " + req.originalUrl + " does not exist"})
    });



router.use("/*any", function (err, req, res, next) {
    console.error("== Error:", err)
    res.status(500).json({err: "Server error.  Please try again later."})
   } );


module.exports = router;