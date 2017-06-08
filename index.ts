#!/usr/bin/env node
import * as express from 'express'
import * as notifier from 'node-notifier'
import * as minimist from 'minimist'

interface Args {
  port: string,
  _: string
}

const argv = minimist<Args>(process.argv.slice(2))
const app = express()
const log = (...messages: any[]) => console.log('Notifier service:', ...messages)

const booleanify = <T>(obj: T, props: string[]): T => {
  const objAny = obj as any
  return props.reduce((obj, prop) =>
    Object.assign(obj, { [prop]: objAny[prop] === 'true' || objAny[prop] === true }),
    obj)
}

const cb = (req: express.Request, res: express.Response) => {
  const params: notifier.Notification =
    booleanify(req.body || req.query, ['wait', 'sound', 'replay'])
  log(params)
  const note = notifier.notify(params,
    (error, response) => {
      if (error) {
        res.status(500).send(error)
      } else {
        res.send(response)
      }
    })
}

app.get('/notify', cb)
app.post('/notify', cb)

const port = argv.port || 7777
log('litenning on ' + port)
app.listen(port)
