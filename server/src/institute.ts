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

app.post('/auth/booked', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const { start_time, end_time } = await c.req.json()
    const data = await sql`INSERT
    INTO
        public."Booked_time"("user_id", "start_time", "end_time")
    VALUES
        (${id}, ${start_time}, ${end_time})
    RETURNING *`;


    return c.json({ data })

})

app.get('/auth/booked', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const data = await sql`SELECT * FROM public."Booked_time" WHERE "user_id" = ${id}`

    const data1 = await sql`
     SELECT "Appointment"."ID" as "app_id", *
FROM "Appointment", "User", "Donor"
WHERE "Pref_date_end" > now()
    AND NOT EXISTS (
        SELECT 1
        FROM "Booked_time"
        WHERE "Appointment"."Pref_date_start" BETWEEN start_time AND end_time
        AND "Booked_time"."user_id" = ${id}
    )
    AND "Appointment"."Institute_id" IS NULL
    AND "Appointment"."Donor_id" = "Donor"."Donor_id"
    AND "Donor"."User_id" = "User"."ID"
ORDER BY 
    (6371 * acos(cos(radians("User"."latitude")) * cos(radians(split_part("Appointment"."Location", ',', 1)::float)) * cos(radians(split_part("Appointment"."Location", ',', 2)::float) - radians("User"."longitude")) + sin(radians("User"."latitude")) * sin(radians(split_part("Appointment"."Location", ',', 1)::float)))) ASC;
    `
    return c.json({ data, data1 })
})

app.post('/auth/booked/accept', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID" 
FROM public."User", public."Institute" 
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const { appointment_id } = await c.req.json();
    console.log(appointment_id)
    const data = await sql`UPDATE public."Appointment" SET "Institute_id" = ${ins_id} WHERE "ID" = ${appointment_id} RETURNING *`
    return c.json({ data })

})

app.post('/auth/booked/reject', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const { appointment_id, user_id, explanation } = await c.req.json();
    console.log(appointment_id, user_id, explanation)
    const data = await sql`UPDATE public."Appointment" SET "Institute_id" = NULL WHERE "ID" = ${appointment_id} RETURNING *`
    const data1 = await sql`INSERT INTO public."Notification"("User_id", "Text", "Type") VALUES (${user_id}, 'Your appointment has been rejected', 'Rejected') RETURNING *`
    return c.json({ data, data1 })

})


app.get('/auth/booked/accepted', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID" 
FROM public."User", public."Institute" 
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const data = await sql`
   SELECT "Appointment"."ID" as "app_id", * 
FROM "Appointment", "Donor", "User"
where "Appointment"."Institute_id" is not null
and "Appointment"."Donor_id"="Donor"."Donor_id"
and "Donor"."User_id"= "User"."ID" AND "Institute_id"=${ins_id}
AND "Pref_date_end" > now()
ORDER BY "Pref_date_start" ASC
    `

    return c.json({ data })
})

app.post('/auth/booked/delete', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const { start_time, end_time } = await c.req.json()
    const data = await sql`DELETE FROM public."Booked_time" WHERE "user_id" = ${id} AND "start_time" = ${start_time} AND "end_time" = ${end_time}`
    return c.json({ data })
})





app.get('/', async (c) => {

    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const test = await sql`SELECT * FROM "User"`

    return c.text('Hello Hono!')
})








export default app
