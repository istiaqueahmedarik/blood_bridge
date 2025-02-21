import { Hono } from 'hono'
import { jwt, JwtVariables } from 'hono/jwt';
import postgres from 'postgres'


var jwt_ = require('jsonwebtoken')


type Variables = JwtVariables

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
    SUPABASE_URL: string,
    SUPABASE_SERVICE_ROLE_KEY: string,
    EMAILJS_KEY: string
}

const app = new Hono<{ Variables: Variables, Bindings: Bindings }>()


app.get('/auth', async (c) => {
    return c.text('Hello Hono!')
})


app.post('/request', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const { Name, Age, Blood_type_req, Unit_req, Hospital_name, Hospital_location, Reason, Contact_name, Contact_phone, latitude, longitude } = await c.req.json();
    const res = await sql`
        INSERT INTO public."Emergency" (
  "Name", 
  "Age", 
  "Blood_type_req", 
  "Unit_req", 
  "Hospital_name", 
  "Hospital_location", 
  "Reason", 
  "Contact_name", 
  "Contact_phone", 
  "Anonymous", 
  "Is_complete", 
  "latitude", 
  "longitude"
) VALUES (
  ${Name}, 
  ${Age}, 
  ${Blood_type_req}, 
  ${Unit_req}, 
  ${Hospital_name}, 
  ${Hospital_location}, 
  ${Reason}, 
  ${Contact_name}, 
  ${Contact_phone}, 
  false, 
  false, 
  ${latitude}, 
  ${longitude}
) RETURNING *;
    `
    const user = await sql`
        SELECT "email", 6371 * acos(
            cos(radians(${latitude})) * cos(radians(latitude)) *
            cos(radians(longitude) - radians(${longitude})) +
            sin(radians(${latitude})) * sin(radians(latitude))
        ) AS distance
    FROM public."User"
    WHERE (
        6371 * acos(
            cos(radians(${latitude})) * cos(radians(latitude)) *
            cos(radians(longitude) - radians(${longitude})) +
            sin(radians(${latitude})) * sin(radians(latitude))
        )
    ) <= 10;
    `



    user.forEach(async (element: any) => {
        const body = {
            distance: `${element.distance.toFixed(2)} km`,
            link: `${element.email}`,
            reply_to: `${element.email}`,
        }



    });

    return c.json({ res, user })
})



app.get('/', async (c) => {

    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const test = await sql`SELECT * FROM "User"`

    return c.text('Hello Hono!')
})

app.get('/em/:id', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const { id } = c.req.param();
    const events = await sql`SELECT * FROM "Emergency" WHERE "ID" = ${id}`
    return c.json(events)
})


app.get('/em', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const events = await sql`SELECT * FROM "Emergency"`
    return c.json(events)
})






export default app
