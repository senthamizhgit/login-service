module.exports = {
    jwtSecret: 'hereisthesecret',
    port: 3300,
    mongodb: {
        connection: 'mongodb+srv://hbdba:hbdba123@hurly-burly-dvff6.mongodb.net/authentication_db?retryWrites=true&w=majority',
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    },
    rabbitmq: {
        connection: 'amqp://dqosyrbk:O9zM1TDgCGq8iSLzgKhhnkd-tG-Qqtbg@wasp.rmq.cloudamqp.com/dqosyrbk'
    }
}