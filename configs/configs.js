module.exports = {
    jwtSecret: 'hereisthesecret',
    port: 3300,
    mongodb: {
        connection: 'mongodb://admin:admin123@hurly-burly-dvff6.mongodb.net/test',
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    }
}