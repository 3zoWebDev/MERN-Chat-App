const express = require("express");
const router = express();


router.get("/" , (req,res)=>{
    res.send("Server is Up")
})


module.exports = router;