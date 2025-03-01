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
    const payload = c.get('jwtPayload')

    // Get the donor ID for the current user.
    const get_user_id = payload['id']
    const get_donor_id = (
        await sql`SELECT "Donor_id" FROM "Donor" WHERE "User_id" = ${get_user_id}`
    )[0]['Donor_id']

    // Count and sum the records from the Appointment table.
    const count = (
        await sql`SELECT COUNT(*) FROM "Appointment" WHERE "Donor_id" = ${get_donor_id}`
    )[0]['count']
    const sum = (
        await sql`SELECT SUM("Unit") FROM "Appointment" WHERE "Donor_id" = ${get_donor_id}`
    )[0]['sum']

    // Retrieve appointment records along with related institute information.
    const data = await sql`
    SELECT
      a."Donor_id",
      a."Institute_id",
      a."Unit",
      a."Location" AS "Address",
      a."Pref_date_start" AS "Date",
      a."Pref_time_start" AS "Time",
      i."Type",  
      i."city",  
      i."upazilla"  
    FROM
      public."Appointment" a
    JOIN
      public."Institute" i ON a."Institute_id" = i."ID"
    WHERE
      a."Donor_id" = ${get_donor_id}
    ORDER BY
      a."created_at" DESC
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

    const last_appointment = await sql`SELECT * FROM "Appointment" WHERE "Donor_id" = ${donor_id} ORDER BY "created_at" DESC LIMIT 1`
    if (last_appointment.length > 0) {
        const last_appointment_date = new Date(last_appointment[0]['Pref_date_start'])
        const current_date = new Date(body.start_date)
        const diffTime = Math.abs(current_date.getTime() - last_appointment_date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 21) {
            return c.json({ error: 'You can only donate blood after 3 weeks of last donation' })
        }
    }

    const res = await sql`INSERT INTO public."Appointment" ("Donor_id", "Location", "Pref_date_start", "Pref_date_end", "Pref_time_start", "Pref_time_end", "Add_info", "Completed", "donationType") VALUES (${donor_id},${body.location},${body.start_date},${body.end_date},${body.start_time},${body.end_time},${body.add_info},${false},${body.donationType}) RETURNING *;`
        .then(async () => {
            await sql`INSERT INTO public."Notification" ("User_id", "Text", "Type") 
VALUES (${payload['id']}, 'You added an appointment', 'info') 
RETURNING "ID", "created_at";)`
        })


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



    try {
        const res = await sql`INSERT INTO public."Checkup" ("Donor_id", "Test_location", "Pref_date_start", "Pref_date_end", "Pref_time_start", "Pref_time_end", "Add_info", "Test_type","Reason") VALUES (${donor_id},${body.location},${body.start_date},${body.end_date},${body.start_time},${body.end_time},${body.add_info},${body.test_type},${body.symptoms}) RETURNING *;`

        return c.json({ res })
    }
    catch (error) {

        return c.json({ error })
    }
})

/**
 * 
 * create table public."Offer" (
  "ID" uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  "Institute_ID" uuid null default gen_random_uuid (),
  "Service_name" text null,
  "Expired_at" timestamp with time zone null,
  "Min_Coin" bigint null,
  "Max_Coin" bigint null,
  "Details" text null,
  constraint Offer_pkey primary key ("ID"),
  constraint Offer_Institute_ID_fkey foreign KEY ("Institute_ID") references "Institute" ("ID")
) TABLESPACE pg_default;
 */

/**
 * 
 * create table public."Service_Using" (
  "ID" uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  "Donor_ID" uuid null default gen_random_uuid (),
  "Offer_ID" uuid null default gen_random_uuid (),
  "Expired_at" timestamp without time zone null default (now() AT TIME ZONE 'utc'::text),
  "Coin_Used" bigint null,
  constraint Service_Using_pkey primary key ("ID"),
  constraint Service_Using_Donor_ID_fkey foreign KEY ("Donor_ID") references "Donor" ("Donor_id"),
  constraint Service_Using_Offer_ID_fkey foreign KEY ("Offer_ID") references "Offer" ("ID")
) TABLESPACE pg_default;
 */

/**
 * 
 * create table public."Service_Using" (
  "ID" uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  "Donor_ID" uuid null default gen_random_uuid (),
  "Offer_ID" uuid null default gen_random_uuid (),
  "Expired_at" timestamp without time zone null default (now() AT TIME ZONE 'utc'::text),
  "Coin_Used" bigint null,
  constraint Service_Using_pkey primary key ("ID"),
  constraint Service_Using_Donor_ID_fkey foreign KEY ("Donor_ID") references "Donor" ("Donor_id"),
  constraint Service_Using_Offer_ID_fkey foreign KEY ("Offer_ID") references "Offer" ("ID")
) TABLESPACE pg_default;
 */

app.get('/auth/services', async (c) => {
    //all services that is on offer but not on service using
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const donor_id = (await sql`SELECT "Donor_id" FROM "Donor" WHERE "User_id" = ${payload['id']}`)[0]['Donor_id'];
    const count = (await sql`SELECT COUNT(*) FROM "Donor_donation_history" WHERE "Donor_id" = ${donor_id}`)[0]['count']

    const cost = (await sql`SELECT SUM("Coin_Used") FROM "Service_Using" WHERE "Donor_ID" = ${donor_id}`)[0]['sum']
    console.log("cost", cost)
    console.log("count", count)
    const services = await sql`
        SELECT 
            "Offer"."ID" as "offer_id",
            "Offer".*, 
            "Institute".*, 
            "User".*, 
            (
                (("Offer"."Max_Coin" + "Offer"."Min_Coin") / 2) * (${count}::numeric / 100)
            ) AS token_need, 
             ${count - cost} AS token_left
        FROM "Offer", "Institute", "User"
        WHERE "Offer"."ID" NOT IN (
            SELECT "Offer_ID" FROM "Service_Using" WHERE "Donor_ID" = ${donor_id}
        )
        AND "Institute"."ID" = "Offer"."Institute_ID" 
        AND "User"."ID" = "Institute"."user_id" 
        ORDER BY "Offer"."created_at" DESC
    `
    return c.json({ services, token_left: count - cost })
})

app.post('/auth/service/accept', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const donor_id = (await sql`SELECT "Donor_id" FROM "Donor" WHERE "User_id" = ${payload['id']}`)[0]['Donor_id'];
    const body = await c.req.json();
    const offer_id = body.offer_id;
    console.log("offer_id", offer_id)
    const offer = (await sql`SELECT * FROM "Offer" WHERE "ID" = ${offer_id}`)[0];
    const count = (await sql`SELECT COUNT(*) FROM "Donor_donation_history" WHERE "Donor_id" = ${donor_id}`)[0]['count']
    const cost = ((Number(offer['Max_Coin']) + Number(offer['Min_Coin'])) / 2) * (count / 100)
    const token_left = (await sql`SELECT COUNT(*) FROM "Donor_donation_history" WHERE "Donor_id" = ${donor_id}`)[0]['count'] - (await sql`SELECT SUM("Coin_Used") FROM "Service_Using" WHERE "Donor_ID" = ${donor_id}`)[0]['sum']
    console.log(offer, token_left, cost)
    if (token_left < cost) {
        return c.json({ error: 'Not enough tokens' })
    }
    console.log("cost", cost)
    console.log(donor_id, offer_id, offer['Expired_at'], cost)
    const res = await sql`INSERT INTO public."Service_Using" ("Donor_ID", "Offer_ID","Expired_at","Coin_Used") VALUES (${donor_id},${offer_id},${offer['Expired_at']},${Math.round(cost)});`
        .catch((error) => {
            console.log(error)
            return c.json({ error })
        })
    console.log(res)
    return c.json({ res })
})

app.get('/auth/service/using', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const donor_id = (await sql`SELECT "Donor_id" FROM "Donor" WHERE "User_id" = ${payload['id']}`)[0]['Donor_id'];
    const services = await sql`
    SELECT 
        "Service_Using".*, 
        "Offer".*, 
        "Institute".*, 
        "User".*
    FROM "Service_Using", "Offer", "Institute", "User"
    WHERE "Service_Using"."Donor_ID" = ${donor_id}
    AND "Service_Using"."Offer_ID" = "Offer"."ID"
    AND "Offer"."Institute_ID" = "Institute"."ID"
    AND "User"."ID" = "Institute"."user_id"
    ORDER BY "Service_Using"."created_at" DESC
    `
    return c.json({ services })
})


app.get('/auth/test_results', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');

    const tests = await sql`
    SELECT 
        "Test_result".*, 
        "Institute".*,
        "User".*
    FROM "Test_result", "User","Institute"
    WHERE "Test_result"."userId" = ${payload['id']}
    AND "Test_result"."institute_id" = "Institute"."ID"
    AND "User"."ID" = "Institute"."user_id"
    ORDER BY "Test_result"."created_at" DESC
    `
    return c.json({ tests })
})


app.get('/auth/user_log', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    try {
        console.log("searchin..", payload['id']);
        const user_log = (await sql`SELECT * FROM "Notification" u WHERE "User_id" = ${payload['id']} ORDER BY
    u."created_at" DESC LIMIT 50`)
        console.log(user_log)
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
