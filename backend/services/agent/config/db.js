import dns from "node:dns"
import mongoose from "mongoose"


// DNS servers
const dnsServers = (
    process.env.MONGODB_DNS_SERVERS || "1.1.1.1,8.8.8.8"
)
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean)

dns.setServers(dnsServers)


const connectDb = async () => {

    // MongoDB connection options
    const options = {
        serverSelectionTimeoutMS: 5000,
        family: 4,
    }


    // MongoDB Atlas
    const candidates = [
        process.env.MONGODB_URI,

        // Local MongoDB fallback
        process.env.MONGODB_FALLBACK_URI ||
        "mongodb://127.0.0.1:27017/agent",
    ].filter(Boolean)


    // Try each database connection
    for (const uri of [...new Set(candidates)]) {

        try {

            // Don't reconnect if already connected
            if (mongoose.connection.readyState === 1) {
                console.log("mongodb already connected")
                return mongoose.connection
            }


            await mongoose.connect(uri, options)


            console.log("mongodb connected successfully")
            console.log(`db connected to ${uri}`)

            return mongoose.connection

        } catch (error) {

            console.log(
                `db connection attempt failed for ${uri}`
            )

            console.log(error.message)
        }
    }


    // If all databases failed
    console.log(
        "db unavailable; continuing without database connection"
    )

    return null
}


export default connectDb