import { Hono } from 'hono'
import { jwt, JwtVariables } from 'hono/jwt';
import postgres from 'postgres'

var jwt_ = require('jsonwebtoken')
import { createClient } from '@supabase/supabase-js'


type Variables = JwtVariables

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
    SUPABASE_URL: string,
    SUPABASE_SERVICE_ROLE_KEY: string
}

const app = new Hono<{ Variables: Variables, Bindings: Bindings }>()

app.use('/auth/*', (c, next) => {
    const jwtMiddleware = jwt({
        secret: c.env.JWT_SECRET,
    })
    return jwtMiddleware(c, next)
})

app.get('/auth', async (c) => {
    return c.text('Hello Hono!')
})


app.get('/auth/donor_history', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');

    const get_user_id = payload['id'];
    const get_donor_id = (await sql`SELECT "Donor_id" FROM "Donor" WHERE "User_id" = ${get_user_id}`)[0]['Donor_id']
    const count = (await sql`SELECT COUNT(*) FROM "Donor_donation_history" WHERE "Donor_id" = ${get_donor_id}`)[0]['count']
    const sum = (await sql`SELECT SUM("Unit") FROM "Donor_donation_history" WHERE "Donor_id" = ${get_donor_id}`)[0]['sum']
    const data = await sql`SELECT
    d."Donor_id",
    d."Institute_id",
    d."Unit",
    d."Address",
    d."Date",
    d."Time",
    i."Type",  
    i."city",  
    i."upazilla"  
FROM
    public."Donor_donation_history" d
JOIN
    public."Institute" i ON d."Institute_id" = i."ID"
WHERE
    d."Donor_id" = ${get_donor_id}
ORDER BY
    d."created_at" DESC
LIMIT 100;
    `

    return c.json({ data, count, sum })
})

app.get('/auth/donor_details', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const donor = (await sql`SELECT * 
FROM 
    public."Donor" d  
JOIN 
    public."User" u ON d."User_id" = u."ID" 
WHERE 
    d."User_id" = ${payload['id']}`)[0]

    return c.json({ donor })

})


app.get('/auth/appointments', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const donor_id = (await sql`SELECT "Donor_id" FROM "Donor" WHERE "User_id" = ${payload['id']}`)[0]['Donor_id'];
    try {
        const appointments = await sql`SELECT * FROM "Appointment" 
            LEFT JOIN "Institute" ON "Appointment"."Institute_id" = "Institute"."ID"
            LEFT JOIN "User" ON "Institute"."user_id" = "User"."ID"
            WHERE "Donor_id" = ${donor_id}
        `

        return c.json({ appointments, len: appointments.length })
    }
    catch (error) {
        return c.json({ error })
    }
})


app.post('/auth/appointment', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const donor_id = await sql`SELECT "Donor_id" FROM "Donor" WHERE "User_id" = ${payload['id']}`
        .then((res) => res[0]['Donor_id'])
        .catch((error) => { return c.json({ error }) })
    const body = await c.req.json();
    if (!body.location || !body.start_date || !body.end_date || !body.start_time || !body.end_time || !body.donationType) {
        return c.json({ error: 'Invalid request' })
    }


    const res = await sql`INSERT INTO public."Appointment" ("Donor_id", "Location", "Pref_date_start", "Pref_date_end", "Pref_time_start", "Pref_time_end", "Add_info", "Completed", "donationType") VALUES (${donor_id},${body.location},${body.start_date},${body.end_date},${body.start_time},${body.end_time},${body.add_info},${false},${body.donationType}) RETURNING *;`

    return c.json({ body })
})


app.post('/auth/test_appointment', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const donor_id = await sql`SELECT "Donor_id" FROM "Donor" WHERE "User_id" = ${payload['id']}`
        .then((res) => res[0]['Donor_id'])
        .catch((error) => { return c.json({ error }) })
    const body = await c.req.json();
    console.log(body.location, body.start_date, body.end_date, body.start_time, body.end_time, body.symptoms, body.test_type)


    try {
        const res = await sql`INSERT INTO public."Checkup" ("Donor_id", "Test_location", "Pref_date_start", "Pref_date_end", "Pref_time_start", "Pref_time_end", "Add_info", "Test_type","Reason") VALUES (${donor_id},${body.location},${body.start_date},${body.end_date},${body.start_time},${body.end_time},${body.add_info},${body.test_type},${body.symptoms}) RETURNING *;`
        console.log(res);
        return c.json({ res })
    }
    catch (error) {
        console.log(error)
        return c.json({ error })
    }
})




app.get('/auth/user_log', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    try {
        const user_log = (await sql`SELECT * FROM "User_log" u WHERE "User_id" = ${payload['id']} ORDER BY
    u."created_at" DESC LIMIT 50`)
        return c.json({ user_log })
    }
    catch (error) {
        return c.json({ error })
    }
})


app.get('/', async (c) => {

    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const test = await sql`SELECT * FROM "User"`

    return c.text('Hello Hono!')
})








export default app
