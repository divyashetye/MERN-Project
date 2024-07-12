const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({              //schema is a document data structure
    name:String,
    email:String,
    password:String
});
                              //collection
module.exports = mongoose.model("users", userSchema);

//Models are higher-order constructors 
//userSchema is compiled into a model named users, which can then be used to construct documents in an application.