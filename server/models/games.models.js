const mongoose = require('mongoose');
const Schema = mongoose.Schema

const games = new Schema({
        playerX:{
            type: Schema.Types.ObjectId, 
            ref: "users"
        },
        playerO:{
            type: Schema.Types.ObjectId, 
            ref: "users"
        },
        turn:{
            type: String,
            require: true,
            default:"X"
        },
        status:{
            type: Boolean,
            require: true,
            default: 0
        },
        boardArray:{
            type: Array,
            default: ["","","","","","","","",""]
        },
        winner:{
            type: Schema.Types.ObjectId, 
        }
    },
    {
        collection: "games"
    }
)

const model = mongoose.model("games",games)
module.exports = model