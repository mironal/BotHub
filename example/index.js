// example for AWS lambda

'use strict';

const BotHub = require("../bothub")
const basicSubscriber = require("./basic_subscriber")

const bothub = new BotHub()

bothub.use("repo/name", basicSubscriber)
bothub.subscribe("repo/name").issues((body, callback) => {
  console.log("Hello !")
  callback(null)
})

bothub.subscribe("other/repo").issues((body, callback) => {
  console.log("bye")
  callback(null)
});

// exports.handler =
const handler = (event, context, callback) => {

    let ghEvent = event.Records[0].Sns.MessageAttributes["X-Github-Event"].Value
    let body = JSON.parse(event.Records[0].Sns.Message)

    bothub.exec(ghEvent, body, (err) => {
      callback(err)
    });
};

let event = require("./test.json")

// for test
handler(event, null, (err) => {
  console.log("finish")
})

