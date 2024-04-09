const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require( "./db" );
mongoDB(); // Bcoz execution tho index.js se hi hogi

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
  // To solve CORP issue
})

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(express.json());
app.use('/api', require("./Routes/CreateUser")); // Bcoz execution tho index.js se hi hogi
app.use('/api', require("./Routes/DisplayData")); // Bcoz execution tho index.js se hi hogi


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
