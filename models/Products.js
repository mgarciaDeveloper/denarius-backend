//vamos usar MongoDb, e mongoose para o nosso banco de dados
var mongoose = require("mongoose");

//vamos criar um schema de collection, chamada 'ProductSchema'
const ProductSchema = new mongoose.Schema({
    cost: { type: Number },
    price: { type: Number },
    status: {
        type: String,
        required: true,
        default: 'Em estoque',
        enum: ['Final de Estoque', 'Em estoque', 'Esgotado', 'Obsoleto']
    },
    description: { type: String, },
    url: { type: String, },
    sells: [
        {
            seminar: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Seminars",
            },
            amount: { type: Number },
            cost: { type: Number },
            price: { type: Number },
            when: { type: Date },
        }
    ],
    orders: [
        {
            seminar: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Seminars",
            },
            amount: { type: Number },
            cost: { type: Number },
            price: { type: Number },
            when: { type: Date },
        }
    ]



});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
