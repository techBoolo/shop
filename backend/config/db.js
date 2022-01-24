import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_ATLAS_URI;
const dbName = process.env.DB_NAME;

const mongoClient = new MongoClient(url);
let db;

export const dbConnect = async () => {
  try {
    if(db) return db;
    await mongoClient.connect();
    db = mongoClient.db(dbName);
    process.on('exit', () => dbClose());
    return db;
  } catch (error) {
    throw error;
  }
}

const dbClose = async () => {
  if(mongoClient && mongoClient.isConnected()){
    await mongoClient.close()
  }
}

export const getDB = () => {
  return db;
}


