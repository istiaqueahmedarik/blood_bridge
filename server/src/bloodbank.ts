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

app.get('/bloodbanks', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const get_blood_bank_id = (await sql`SELECT "Full_name","latitude","longitude" FROM "User"
        INNER JOIN "Institute" ON "Institute"."user_id" = "User"."ID"
        WHERE "Institute"."Type" = 'bloodbank'
      `)
    return c.json(get_blood_bank_id)
})

app.get('/auth/hospital_req', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const get_user_id = payload['id'];
    console.log(get_user_id)
    const data = await sql`select * 
from "User" u , (SELECT 
    hr.*, 

    (6371 * acos(cos(radians(u.latitude)) * cos(radians(hr.latitude)) * cos(radians(hr.longitude) - radians(u.longitude)) + sin(radians(u.latitude)) * sin(radians(hr.latitude)))) AS distance
FROM 
    public."Hospital_req" hr
CROSS JOIN 
    (SELECT "latitude", "longitude" FROM public."User" WHERE "ID" = ${get_user_id}) AS u 
WHERE 
    (6371 * acos(cos(radians(u.latitude)) * cos(radians(hr.latitude)) * cos(radians(hr.longitude) - radians(u.longitude)) + sin(radians(u.latitude)) * sin(radians(hr.latitude)))) <= 10
ORDER BY 
    hr.urgency, distance,hr."Is_complete") hh

where hh.hospital_id =  u."ID";`
    return c.json({ data })
})

/**
 * 
 * create table public."Inventory" (
  "ID" uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  "Institute_id" uuid null default gen_random_uuid (),
  "Blood_type" character varying null,
  "Amount" bigint null,
  constraint Inventory_pkey primary key ("ID"),
  constraint Inventory_Institute_id_fkey foreign KEY ("Institute_id") references "Institute" ("ID")
) TABLESPACE pg_default;
 */

/**
 * create table public."Hospital_req" (
  "ID" uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  "Blood_type_req" text null,
  "Unit_req" bigint null,
  "Reason" text null,
  "Contact_phone" text null,
  "Is_complete" boolean null default false,
  latitude double precision null,
  longitude double precision null,
  urgency text null default 'High'::text,
  "Institute_id" uuid null,
  "Date_needed" timestamp with time zone null default (now() AT TIME ZONE 'utc'::text),
  hospital_id uuid null,
  constraint emergency_pkey primary key ("ID"),
  constraint Hospital_req_Institute_id_fkey foreign KEY ("Institute_id") references "Institute" ("ID") on update CASCADE on delete CASCADE,
  constraint Hospital_req_hospital_id_fkey foreign KEY (hospital_id) references "User" ("ID") on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
 */
app.post('/auth/req_blood/accept', async (c) => {
    const { id } = await c.req.json()
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const get_user_id = payload['id'];
    const ins_id = (await sql`SELECT "ID" FROM "Institute" WHERE "user_id" = ${get_user_id}`)[0]['ID']
    console.log("Hospital id")
    const hosp_req = await sql`SELECT * FROM "Hospital_req" WHERE "ID" = ${id}`
    if (hosp_req.length === 0) {
        return c.json({
            status: 'error',
            message: 'Request not found'
        })
    }
    const blood_type = hosp_req[0]['Blood_type_req']
    const unit_req = hosp_req[0]['Unit_req']
    console.log("Blood type and unit req")
    console.log(blood_type, unit_req)
    const inventory = await sql`SELECT * FROM "Inventory","User","Institute" WHERE "Blood_type" = ${blood_type} AND "Amount" >= ${unit_req} AND "User"."ID" = ${get_user_id} AND "User"."ID" = "Institute"."user_id"`


    await sql`UPDATE "Hospital_req" SET "Is_complete" = TRUE,"Institute_id"= ${ins_id} WHERE "ID" = ${id}`
    if (inventory.length === 0) {
        return c.json({
            status: 'error',
            message: 'Blood not available'
        })
    }

    //update the inventory
    const new_amount = inventory[0]['Amount'] - unit_req
    await sql`UPDATE "Inventory" SET "Amount" = ${new_amount} WHERE "ID" = ${inventory[0]['ID']}`
    //update the request
    await sql`UPDATE "Hospital_req" SET "Is_complete" = TRUE WHERE "ID" = ${id}`
    return c.json({
        status: 'success',
        message: 'Blood request accepted'
    })
})

app.get('/auth/tests', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    /**
     * 
     */

    const data = await sql`
        SELECT *
        FROM "Appointment"
        WHERE "Final_Time" > now()
            AND NOT EXISTS (
                SELECT 1
                FROM "Booked_time"
                WHERE "Appointment"."Pref_date_start" BETWEEN start_time AND end_time
            )
    `


    return c.json(data)
})

app.get('/', async (c) => {

    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const test = await sql`SELECT * FROM "User"`

    return c.text('Hello Hono!')
})



app.get('/auth/test_count', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const iid = (await sql`SELECT "ID" FROM "Institute" WHERE "user_id" = ${id}`)[0]['ID']
    console.log(iid)
    const data = (await sql`SELECT COUNT(*) FROM "Appointment" WHERE "Institute_id" = ${iid}`)[0]['count']
    const data1 = (await sql`SELECT COUNT(*) FROM "Appointment" WHERE "Institute_id" = ${iid} AND "Appointment"."donationType"='whole_blood'`)[0]['count']
    const data2 = (await sql`SELECT COUNT(*) FROM "Appointment" WHERE "Institute_id" = ${iid} AND "Appointment"."donationType"='apheresis'`)[0]['count']

    const bloodTestsByDay = await sql`
        SELECT DATE("Pref_date_start") AS day, COUNT(*) AS "bloodTests"
        FROM "Appointment"
        WHERE "isTested" = true
        GROUP BY day
        ORDER BY day
    `
    return c.json(
        {
            data,
            data1,
            data2,
            bloodTestsByDay
        }
    )
})


app.get('/auth/test_count/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const iid = (await sql`SELECT "ID" FROM "Institute" WHERE "user_id" = ${id}`)[0]['ID']
    console.log(iid)
    const data = (await sql`SELECT COUNT(*) FROM "Checkup" WHERE "Institute_id" = ${iid}`)[0]['count']


    const bloodTestsByDay = await sql`
        SELECT DATE("Pref_date_start") AS day, COUNT(*) AS "bloodTests"
        FROM "Checkup"
        WHERE "isTested" = true
        GROUP BY day
        ORDER BY day
    `
    return c.json(
        {
            data,

            bloodTestsByDay
        }
    )
})



export default app
