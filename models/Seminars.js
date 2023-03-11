//vamos usar MongoDb, e mongoose para o nosso banco de dados
var mongoose = require("mongoose");

//vamos criar um schema de collection, chamada 'ProductSchema'
const schema = new mongoose.Schema(
    {
        maanaim: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        cookingCost: { type: Number },
        cookingWaste: { type: Number },
        cafeteriaCost: { type: Number },
        cafeteriaWaste: { type: Number },
        subscription: { type: Number },
        status: {
            type: String,
            required: true,
            default: 'Confirmado',
            enum: ['Adiado', 'Cancelado', 'Confirmado']
        },
        type: {
            type: String,
            required: true,
            default: 'Geral',
            enum: ['Senhoras', 'Geral', 'Jovens', 'Cias', 'Varões']
        },
        level: {
            type: String,
            required: true,
            default: 'Geral',
            enum: ['Geral', 'Principiantes', '1º Período', '2º Período', '3º Período', '4º Período', '5º Período', '6º Período', '7º Período']
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
    }
);

const Seminar = mongoose.model("Seminar", schema);

module.exports = Seminar;
