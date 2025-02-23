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




type Variables = JwtVariables

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string,
  SUPABASE_URL: string,
  SUPABASE_SERVICE_ROLE_KEY: string
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

  const ids = obj.id.map((entry: { id: string }) => entry.id)
  const connectionString = c.env.DATABASE_URL || ''
  const sql = postgres(connectionString)
  const data = await sql`
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
    WHERE "ID" IN (${ids})
  `

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