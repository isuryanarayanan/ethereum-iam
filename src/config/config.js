const config = {
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGODB_URI + "/" + process.env.MONGODB_DB || 'mongodb://localhost:27017/mydatabase',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || 'your-smtp-user',
    pass: process.env.SMTP_PASS || 'your-smtp-password',
  },
};

export default config;
