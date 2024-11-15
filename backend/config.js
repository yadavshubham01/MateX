

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mate',
  JWT_SECRET: process.env.JWT_SECRET || 'Shubham@123',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  PORT: process.env.PORT || 5000,
};


//mongodb://localhost:27017/