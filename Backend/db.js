const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://vishawdeepsingh29:DxzYlg9wcjGuHKGh@cluster0.vovi9j4.mongodb.net/Amazon-user");
const UserSchema = new mongoose.Schema({
    username: String,
    password : String
})

const Users = mongoose.model("Users",UserSchema);
module.exports={
    Users
}
