'use strict';

const Subscriber = require("../bothub").Subscriber

const subscriber = new Subscriber()

subscriber.issues((body, callback) => {
  console.log("Hello Basic Subscriber")
  callback(null)
});

module.exports = subscriber

