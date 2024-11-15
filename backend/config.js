

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mate',
  JWT_SECRET: process.env.JWT_SECRET || 'Shubham@123',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "548854258712-ml0boj0dt3dkb5ot1lud9l8fe7vj17c9.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "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",
  PORT: process.env.PORT || 5000,
};


//mongodb://localhost:27017/