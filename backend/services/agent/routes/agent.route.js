import express from "express"

import {
    agent,
    createAgent
} from "../controllers/agent.controller.js"

import multer from "../config/multer.js"

const router = express.Router()


// CREATE AGENT
router.post("/create", createAgent)


// CHAT WITH AGENT
router.post(
    "/chat",
    multer.single("file"),
    agent
)


export default router