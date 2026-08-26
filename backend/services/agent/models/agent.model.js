import mongoose from "mongoose"

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
})

const Agent = mongoose.model("Agent", agentSchema)

export default Agent