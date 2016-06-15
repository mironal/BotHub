"use strict"

class Subscriber {

  constructor() {
    this.actions = []
  }

  issues(action) {
    this.__add("issues", action)
  }

  issue_comment(action) {
    this.__add("issue_comment", action)
  }

  pull_request(action) {
    this.__add("pull_request", action)
  }

  pull_request_review_comment(action) {
    this.__add("pull_request_review_comment", action)
  }

  push(action) {
    this.__add("push", action)
  }

  status(action) {
    this.__add("status", action)
  }

  __add(event, action) {
    let a = new Action(event, action)
    this.actions.push(a)
  }

  __addAll(actions) {

    actions.forEach( a => {
      if (a instanceof Action) {
        this.actions.push(a)
      }
    })
  }

  __clear() {
    this.actions.length = 0
  }

  __exec(event, body, callback) {

    let toPromise = (action) => {
      return new Promise((resolve, reject) => {
        action.action(body, err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    let actions = this.actions.filter((a) => {
      return a.event === event
    }).map(a => { return toPromise(a) })

    Promise.all(actions).then((val) => {
      callback(null, val)
    }).catch((err) => {
      callback(err)
    })
  }
}

class Action {
  constructor(event, action) {
    this.event = event
    this.action = action
  }
}

module.exports = Subscriber

