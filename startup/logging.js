const winston = require("winston");
//require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
    })
  );

  // winston.add(
  //   new winston.transports.MongoDB({ db: "mongodb://localhost:27017/vidly2" })
  // );

  winston.exceptions.handle(
    new winston.transports.File({ filename: "unhandledExceptions.log" }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    })
  );

  // process.on("uncaughtException", (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  //   process.on("unhandledRejection", (ex) => {
  //     winston.error(ex.message, ex);
  //     process.exit(1);
  //   });
};
