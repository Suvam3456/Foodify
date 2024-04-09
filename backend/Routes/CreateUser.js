const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs"); 
//bcrypt has all asynchronous functions,return promises
const jwtSecretkey = "qwertyuiopqwertyuiopqwertyuiop#$"
//  npm install express-validator

// Jab koi frontend se ya fir thunderclient se "/createuser" endpoint ko hit karega (with some data in body) then hi router.post( me enter hue niche
router.post(
  "/createuser",
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })]

  ,async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // User.js ka schema ko import karayenge
    // "/createuser" is my endpoint
    // We can also use if-else  statement for validation but here we are using try catch

    const salt = await bcrypt.genSalt(10);
    // hashedPassword will contain the encrypted password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    try{
      await User.create({
        // Let us have static data to understand crud operations first  using mongoose
        name: req.body.name,
        // password: "req.body.password",
        password : hashedPassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true })); 
      // Backend ko batare ki hogya hai data save database
     } 
    catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);



router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password", "galat password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // User.js ka schema ko import karayenge
    // "/loginuser" is my endpoint
    // We can also use if-else  statement for validation but here we are using try catch
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      // We can use .then or if-else , we prefer if-else by storing in a variable useremail
      let userData = await User.findOne({ email });
      //ya tho pura document aa jayega by findOne in userData variable (if matches),else empty
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct email" });
      }

      const pwdCompare = bcrypt.compare(req.body.password,userData.password) 
    // bcrypt.compare(which returns boolean) use kiye bcoz hash aur normal password me comparison krre

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct password" });
      }

      const data = {
        user:{
          id:userData.id
          // Payload
        }
      }

      const authToken = jwt.sign(data, jwtSecretkey)

      // True aane pe authorization token bhi user ko bhejenge front-end me jo uske local storage me save hoga

      return res.json({ success: true, authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;

// Routes kuch hota hi nhi hai , ham ye code index.js me bhi likh skte thein but for better documentation , alag se folder/file banaye aur usko index.js me export karaye
