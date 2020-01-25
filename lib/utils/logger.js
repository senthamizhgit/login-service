const winston = require('winston');
const path =  require('path');

let Logger = (function() {
    var logme;

    function createLogger() {
        let loggerObj = winston.createLogger({
            
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: './logs/info.log', level: 'info'}),
                new winston.transports.File({filename: './logs/error.log',level: 'error'})
            ]
        })
        return  loggerObj;
    }

    return {
        getLogger: function() {
            if(!logme) {
                logme =  createLogger();
            }
            return logme;
        }
    }
})();

module.exports = Logger;