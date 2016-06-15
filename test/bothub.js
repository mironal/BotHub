"use strict"

const Subscriber = require("../subscriber")
const BotHub = require("../bothub")
const assert = require("chai").assert

describe("BotHub", () => {

  it("subscribe", () => {

    let bothub = new BotHub()

    bothub.subscribe("name/repo").issues(() => {})
    bothub.subscribe("name/repo").issues(() => {})
    bothub.subscribe("name/repo").issue_comment(() => {})

    bothub.subscribe("other/repo").issues(() => {})

    {
      let s = bothub.subscribe("name/repo")
      assert.lengthOf(s.actions, 3)
      assert.equal(s.actions[0].event, "issues")
      assert.equal(s.actions[1].event, "issues")
      assert.equal(s.actions[2].event, "issue_comment")
    }

    {
      let s = bothub.subscribe("other/repo")
      assert.lengthOf(s.actions, 1)
      assert.equal(s.actions[0].event, "issues")
    }
  })

  it("use", () => {

    let subscriber = new Subscriber()
    subscriber.issues(() => {})
    subscriber.push(() => {})

    let bothub = new BotHub()

    bothub.use("repo/name", subscriber)

    assert.equal(bothub.subscribe("repo/name").actions[0].event, "issues")
    assert.equal(bothub.subscribe("repo/name").actions[1].event, "push")

    bothub.subscribe("repo/name").issues(() => {})

    assert.equal(bothub.subscribe("repo/name").actions[0].event, "issues")
    assert.equal(bothub.subscribe("repo/name").actions[1].event, "push")
    assert.equal(bothub.subscribe("repo/name").actions[2].event, "issues")

    assert.lengthOf(subscriber.actions, 2)
  })

  it("exec", (done) => {

    let bothub = new BotHub()

    bothub.subscribe("repo/name").issues((body, cb) => {
      cb(null)
    })

    bothub.subscribe("other/repo").issues(() => {
      assert.fail()
    })

    bothub.exec("issues", {repository: {full_name: "repo/name"}}, (err) => {
      assert.isNull(err)
      done()
    })
  })
})

