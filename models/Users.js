//vamos usar MongoDb, e mongoose para o nosso banco de dados
var mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({

  ///Comum a todos os usuários

  username: { type: String, required: [true, "username é um campo obrigatório"] },
  name: { type: String, unique: true, required: [true, "nome é um campo obrigatório"] },
  cnpj: { type: String, unique: true, },
  phone: { type: Number, },
  description: { type: String, },
  verse: { type: String, },
  zipCode: { type: String, },
  adress: { type: String, },
  websiteURL: { type: String },
});

UserSchema.plugin(passportLocalMongoose); //criptografia de password e um esquema de login com username & password

const User = mongoose.model("User", UserSchema);

module.exports = User;
