import { Hono } from 'hono'
import auth from './auth'
import donor from './donor'
import bloodbank from './bloodbank'
import hospital from './hospital'
import emergency from './emergency'
import inbox from './inbox'
import institute from './institute'
import postgres from 'postgres'
import { JwtVariables } from 'hono/jwt'
import { generateText, Output } from 'ai'
import { createWorkersAI } from 'workers-ai-provider';
import { z } from 'zod'




type Variables = JwtVariables

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string,
  SUPABASE_URL: string,
  SUPABASE_SERVICE_ROLE_KEY: string,
  AI: Ai
}

const app = new Hono<{ Variables: Variables, Bindings: Bindings }>()

app.route('/', auth)
app.route('/donor', donor)
app.route('/bloodbank', bloodbank)
app.route('/hospital', hospital)
app.route('/emergency', emergency)
app.route('/inbox', inbox)
app.route('/institute', institute)


app.post('/search', async (c) => {
  const { res, lat, lng } = await c.req.json();
  console.log(res, lat, lng)
  const obj = JSON.parse(res)
  //object is in this format -  {
  // id: [{ type: 'donor', id: 'a2e01acf-0d38-4210-8a7f-e66a17248205' }],
  //   }
  const workersai = createWorkersAI({ binding: c.env.AI });

  const result = await generateText({
    model: workersai('@cf/meta/llama-3.3-70b-instruct-fp8-fast'),
    system: 'You find ids of user from an unstructured data. return only comma separated ids with single quotes nothing else',
    messages: [
      { role: 'user', content: `${res}... find the ids of the users if presents on the message` },
    ],
    maxTokens: 4000,
    experimental_output: Output.object({
      schema: z.object({
        ids: z.string().describe('find the ids of the users if presents on the message and return it with single quotes and comma separated'),
      }),
    }),
  });
  console.log(result.experimental_output.ids);
  let q = `
    SELECT "ID", "Full_name" as "name",
           latitude,
           longitude,
           "Address",
           (6371 * acos(
             cos(radians(${lat})) *
             cos(radians(latitude)) *
             cos(radians(longitude) - radians(${lng})) +
             sin(radians(${lat})) *
             sin(radians(latitude))
           )) AS distance
    FROM public."User"
    WHERE "ID" IN (${result.experimental_output.ids})`
  // // const ids = obj.id.map((entry: { id: string }) => "'" + entry.id + "'")
  // for (let i = 0; i < obj.id.length; i++) {
  //   if (obj.id[i].id === undefined || obj.id[i].id === null || obj.id[i].id === '' || obj.id[i].id === 'undefined' || obj.id[i].id === 'null' || obj.id === undefined || obj.id === null || obj.id === '' || obj.id === 'undefined' || obj.id === 'null') {
  //     continue
  //   }
  //   q += "'" + obj.id[i].id + "',"
  // }

  // q = q.slice(0, -1)
  // q += ')'
  console.log(q);
  const connectionString = c.env.DATABASE_URL || ''
  const sql = postgres(connectionString)
  const data = await sql.unsafe(q)
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.log(error)
    }
    )

  console.log(data);
  return c.json(
    { data }
  )
})


app.get('/events', async (c) => {
  const connectionString = c.env.DATABASE_URL || ''
  const sql = postgres(connectionString)

  const events = await sql`SELECT * FROM "Events"`

  return c.json(events)

})



export default app