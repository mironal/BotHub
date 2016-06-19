"use strict"

const EventEmitter = require("events").EventEmitter
const Subscriber = require("./subscriber")

class BotHub extends EventEmitter {

  constructor() {
    super()
    this.subscribers = new Map()
  }

  use(path, subscriber) {
    let s = this.__get_subscriber(path)
    s.__addAll(subscriber.actions)
  }

  subscribe(path) {
    return this.__get_subscriber(path)
  }

  exec(event, body, callback) {
    let path = body.repository.full_name
    let s = this.__get_subscriber(path)
    s.__exec(event, body, callback)
  }

  __get_subscriber(path) {

    if (this.subscribers.has(path)) {
      return this.subscribers.get(path)
    } else {
      this.subscribers.set(path, new Subscriber())
      return this.subscribers.get(path)
    }
  }
}


module.exports = BotHub
module.exports.Subscriber = Subscriber

