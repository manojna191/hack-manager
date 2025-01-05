import mongoose from 'mongoose'

const mongoDbUri = process.env.MONGODB_URI

type ConnectionObject = {
  isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already Connected to Database')
    return
  }

  try {
    const dbConn = await mongoose.connect(mongoDbUri || '')
    connection.isConnected = dbConn.connections[0].readyState

    console.log('DB connected successfully')
  } catch (error) {
    console.log('Database connection failed error: ', error)
    process.exit(1)
  }
}

export default dbConnect
