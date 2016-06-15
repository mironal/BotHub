"use strict"

const Subscriber = require("../subscriber")
const assert = require("chai").assert

describe("Subscriber", () => {

  it("add", () => {

    let subscriber = new Subscriber()

    assert.lengthOf(subscriber.actions, 0)

    subscriber.__add("issues", (body, cb) => {
      cb(null)
    })

    assert.lengthOf(subscriber.actions, 1)
  })

  it("convenience add", () => {

    let subscriber = new Subscriber()

    let f = () => {}

    subscriber.issues(f)
    subscriber.issue_comment(f)
    subscriber.pull_request(f)
    subscriber.pull_request_review_comment(f)
    subscriber.push(f)
    subscriber.status(f)

    assert.lengthOf(subscriber.actions, 6)
    assert.equal(subscriber.actions[0].event, "issues")
  })

  it("exec", (done) => {

    let subscriber = new Subscriber()

    subscriber.__add("issues", (body, cb) => {
      assert.equal(body.action, "opened")
      cb(null)
    })

    subscriber.__add("issues", (body, cb) => {
      assert.equal(body.action, "opened")
      cb(null)
    })

    subscriber.__add("issue_comment", (body, cb) => {
      assert.fail()
      cb("fail")
    })

    let body = require("./data/open_issues.json")
    subscriber.__exec("issues", body, (err) => {
      assert.isNull(err)
      done()
    })
  })
})

