const express = require("express");
const ejs = require("ejs");
const {pool} = require('./pool');
require("dotenv").config();

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
); // enable forms



app.set("view engine", "ejs");

// require in the recipe routes
const recipeRoutes = require('./routes/recipeRoutes');

app.use('/recipes', recipeRoutes);

app.get("/", function (req, res) {
  res.render("home.ejs");
});



// RESTFUL routes
  // GET /reviews
app.get('/api/recipes', async function(req,res){
  const [results] = await pool.execute("SELECT * FROM recipes");
  res.json(results);
})

// start server
app.listen(8080, function () {
  console.log("Express server has started");
});
