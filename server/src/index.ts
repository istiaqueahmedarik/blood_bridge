import { Hono } from 'hono'
import auth from './auth'
import donor from './donor'
import bloodbank from './bloodbank'
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


app.get('/events', async (c) => {
  const connectionString = c.env.DATABASE_URL || ''
  const sql = postgres(connectionString)

  const events = await sql`SELECT * FROM "Events"`

  return c.json(events)

})
export default app