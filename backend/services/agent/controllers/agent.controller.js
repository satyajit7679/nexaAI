import axios from "axios"
import { graph } from "../graph/graph.js"
import { addMessage } from "../config/memory.js"
import redis from "../../../shared/redis/redis.js"
import Agent from "../models/agent.model.js"


// CREATE AGENT
export const createAgent = async (req, res, next) => {
    try {
        const { name, description } = req.body

        if (!name) {
            return res.status(400).json({
                message: "Agent name is required"
            })
        }

        const newAgent = await Agent.create({
            name,
            description
        })

        return res.status(201).json({
            message: "Agent created successfully",
            agent: newAgent
        })

    } catch (error) {
        next(error)
    }
}


// CHAT WITH AGENT
export const agent = async (req, res, next) => {
    try {
        const {
            prompt,
            conversationId,
            agent
        } = req.body

        const file = req.file

        console.log("file", file)

        const userId = req.headers["x-user-id"]

        await axios.post(
            `${process.env.CHAT_SERVICE}/save-message`,
            {
                conversationId,
                role: "user",
                content: prompt
            }
        )

        const result = await graph.invoke({
            prompt,
            conversationId,
            agent,
            userId,
            file
        })

        console.log("result", result)

        await addMessage(
            conversationId,
            "user",
            prompt
        )

        await addMessage(
            conversationId,
            "assistant",
            result.aiResponse
        )

        await axios.post(
            `${process.env.CHAT_SERVICE}/save-message`,
            {
                conversationId,
                role: "assistant",
                content: result?.aiResponse,
                images: result?.images,
                artifacts: result?.artifacts
            }
        )

        return res.status(200).json({
            answer: result?.aiResponse,
            images: result?.images,
            artifacts: result?.artifacts
        })

    } catch (error) {
        next(error)
    }
}