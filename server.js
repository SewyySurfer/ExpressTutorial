const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./routes/index");
const productRouter = require("./routes/products");
const ErrorHandler = require("./errors/ErrorHandler");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

//app.set('views','templates' ) --> In this case we have to make a template folder instead of views folder for html files.

app.use(express.static("public_static_middleware"));
app.use(express.json());
app.use(mainRouter);
app.use(productRouter);

app.use((req, res, next) => {
  // ^ it's a global middleware runs on every request.
  return res.json({ message: "Page not found!" });
});

app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  }
  // if the error is not from validation or notFound so we write a else statement
  else {
    res.status(500).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
