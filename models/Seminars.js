//vamos usar MongoDb, e mongoose para o nosso banco de dados
var mongoose = require("mongoose");

//vamos criar um schema de collection, chamada 'ProductSchema'
const schema = new mongoose.Schema({
    cost: { type: Number },
    registration: { type: Number },
    status: {
        type: String,
        required: true,
        default: 'Confirmado',
        enum: ['Adiado', 'Cancelado', 'Confirmado']
    },
    people: { type: Number },
    description: { type: String, },
    when: { type: Date },
    sells: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
            amount: { type: Number },
            cost: { type: Number },
            price: { type: Number },
            when: { type: Date },
        }
    ],
    orders: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
            amount: { type: Number },
            cost: { type: Number },
            price: { type: Number },
            when: { type: Date },
        }
    ]



});

const Seminar = mongoose.model("Seminar", schema);

module.exports = Seminar;
