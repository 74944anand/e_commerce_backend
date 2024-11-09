require('dotenv').config(); // Load environment variables
const { createClient } = require('redis');

let redisClient = null;
let isRedisConnected = false;

const getRedisConnection = async () => {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' 
  });

  const retries = 3; 
  const delay = 2000; 

  for (let attempt = 1; attempt <= retries; attempt++) {
    console.log(`Attempt ${attempt} to connect to Redis...`);
    try {
      await client.connect(); // Attempt to connect
      console.log('Connected to Redis on port:', client.options.socket?.port || 'Not available');
      isRedisConnected = true; // Set true on successful connection
      redisClient = client; // Store the connected client
      return { client, isRedisConnected }; // Return the client and connection status
    } catch (err) {
      console.error(`Failed to connect to Redis on attempt ${attempt}.`, err);
      if (attempt === retries) {
        console.error('All retries exhausted. Redis connection failed.');
        isRedisConnected = false;
        return { client: null, isRedisConnected };
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const connectToRedis = async () => {
  if (redisClient && isRedisConnected) {
    return { client: redisClient, isRedisConnected };
  }
  return await getRedisConnection();
};

exports.connectToRedis = connectToRedis();
exports.redisClient = redisClient;
exports.isRedisConnected = isRedisConnected;
