if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
  }
  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 5000;
  const cors = require('cors')
  
  // Middleware's
  app.use(express.json({limit: "10MB"}));
  app.use(express.urlencoded({
  extended: true
  }));
  app.use(cors());
  
  
  
  // Routes
  const authRoutes = require('./routes/auth');

  // Routes Middleware
  app.use('/api/auth',authRoutes );
  
  
  // Server Init
  app.listen(PORT, ()=>{
    console.log(`Listening to Port: ${PORT}`);
  });