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

app.get('/hospitals', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const get_hospital = (await sql`SELECT "Full_name","latitude","longitude" FROM "User"
        INNER JOIN "Institute" ON "Institute"."user_id" = "User"."ID"
        WHERE "Institute"."Type" = 'hospital'
      `)
    return c.json({
        data: get_hospital
    })
})

//console.log(reqType, req_date, location, contact, reason, units, bloodType)
/**
 * 
create table public."Hospital_req" (
  "ID" uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  "Blood_type_req" character varying null,
  "Unit_req" bigint null,
  "Reason" character varying null,
  "Contact_phone" character varying null,
  "Is_complete" boolean null,
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
app.post('auth/req_blood', async (c) => {
    const { reqType, req_date, location, contact, reason, units, bloodType } = await c.req.json()
    console.log(reqType, req_date, location, contact, reason, units, bloodType)
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload.id;
    const [lat, lng] = location.split(',')
    const res = await sql`
    INSERT INTO public."Hospital_req" ("Blood_type_req","Unit_req","Reason","Contact_phone","latitude","longitude","Date_needed","hospital_id","urgency")
    VALUES (${bloodType},${units},${reason},${contact},${lat},${lng},${req_date},${id},${reqType}) RETURNING *;
    `
        .catch((err) => {
            console.log(err)
            return c.json({
                status: 'error',
                message: 'Error occured'
            })
        })
    await sql`INSERT INTO public."Notification" ("User_id", "Text", "Type") VALUES (${id}, 'Blood request created', 'info') RETURNING "ID", "created_at";`
    return c.json({
        data: res
    })


})

/**
 * 
 *     id: string
    bloodType: string
    requestDate: Date
    hospitalName?: string
    status: "pending" | "onTheWay" | "cancelled"
 */

app.get('/auth/req_blood', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload.id;
    const res = await sql`SELECT "Hospital_req"."ID" as hosp_id, * FROM public."Hospital_req","User" u, "User" v,"Institute" WHERE  u."ID" = hospital_id and "Hospital_req"."Institute_id"="Institute"."ID" and "Institute".user_id=v."ID"`

    return c.json({
        data: res,
    })
})



app.post('/auth/req_blood/delete', async (c) => {
    const { reqId } = await c.req.json()
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const res = await sql`DELETE FROM public."Hospital_req" WHERE "ID" = ${reqId}`
        .catch((err) => {
            console.log(err)
            return c.json({
                status: 'error',
                message: 'Error occured'
            })
        })
    return c.json({
        data: res
    })
})

app.post('/auth/req_blood/delivered', async (c) => {
    const { reqId } = await c.req.json()
    console.log(reqId)
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const res = await sql`UPDATE public."Hospital_req" SET "is_delivered" = TRUE WHERE "ID" = ${reqId}`
        .catch((err) => {
            console.log(err)
            return c.json({
                status: 'error',
                message: 'Error occured'
            })
        })
    return c.json({
        data: res
    })
})


/**
 * 
 * create table public."Offer" (
  "ID" uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  "Institute_ID" uuid null default gen_random_uuid (),
  "Details" character varying null default ''::character varying,
  "Experid_at" timestamp without time zone null default (now() AT TIME ZONE 'utc'::text),
  "Min_Coin" bigint null,
  "Max_Coin" bigint null,
  constraint Offer_pkey primary key ("ID"),
  constraint Offer_Institute_ID_fkey foreign KEY ("Institute_ID") references "Institute" ("ID")
) TABLESPACE pg_default;
 */

app.post('/auth/offer', async (c) => {
    const { details, Service_name, minCoin, maxCoin, expDate } = await c.req.json()
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload.id;
    const ins_id = await sql`SELECT "ID" FROM public."Institute" WHERE "user_id" = ${id}`
    if (ins_id.length === 0) {
        return c.json({
            status: 'error',
            message: 'Institute not found'
        })
    }
    const __id = ins_id[0]['ID']
    const res = await sql`
    INSERT INTO public."Offer" ("Details","Service_name","Min_Coin","Max_Coin","Expired_at","Institute_ID")
    VALUES (${details},${Service_name},${minCoin},${maxCoin},${expDate},${__id}) RETURNING *;
    `
        .catch((err) => {
            console.log(err)
            return c.json({
                status: 'error',
                message: 'Error occured'
            })
        })
    return c.json({
        data: res
    })
})

app.get('/auth/offer', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload.id;
    const ins_id = await sql`SELECT "ID" FROM public."Institute" WHERE "user_id" = ${id}`
    if (ins_id.length === 0) {
        return c.json({
            status: 'error',
            message: 'Institute not found'
        })
    }
    const __id = ins_id[0]['ID']
    const res = await sql`SELECT * FROM public."Offer" WHERE "Institute_ID" = ${__id}`
    return c.json({
        data: res
    })
})

app.post('/auth/offer/delete', async (c) => {
    const { offerId } = await c.req.json()
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const res = await sql`DELETE FROM public."Offer" WHERE "ID" = ${offerId}`
        .catch((err) => {
            console.log(err)
            return c.json({
                status: 'error',
                message: 'Error occured'
            })
        })
    return c.json({
        data: res
    })
})


app.get('/', async (c) => {

    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const test = await sql`SELECT * FROM "User"`

    return c.text('Hello Hono!')
})








export default app
