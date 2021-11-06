const mongoose = require("mongoose");

const connect = async() => {
  try {
    mongoose.connect("mongodb+srv://henitchobisa:129630@futurepreneurs.ndp9o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    err => {
      if (err) throw err;
      console.log("Database Connected");
    }
  )

  }catch(err){
    console.log(err);
  }
}

module.exports = connect;
