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


app.get('/auth/booked/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const data = await sql`SELECT * FROM public."Booked_time" WHERE "user_id" = ${id}`

    const data1 = await sql`
     SELECT "Checkup"."ID" as "app_id", *
FROM "Checkup", "User", "Donor"
WHERE "Pref_date_end" > now()
    AND NOT EXISTS (
        SELECT 1
        FROM "Booked_time"
        WHERE "Checkup"."Pref_date_start" BETWEEN start_time AND end_time
        AND "Booked_time"."user_id" = ${id}
    )
    AND "Checkup"."Institute_id" IS NULL
    AND "Checkup"."Donor_id" = "Donor"."Donor_id"
    AND "Donor"."User_id" = "User"."ID"
ORDER BY 
    (6371 * acos(cos(radians("User"."latitude")) * cos(radians(split_part("Checkup"."Test_location", ',', 1)::float)) * cos(radians(split_part("Checkup"."Test_location", ',', 2)::float) - radians("User"."longitude")) + sin(radians("User"."latitude")) * sin(radians(split_part("Checkup"."Test_location", ',', 1)::float)))) ASC;
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

app.post('/auth/booked/accept/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID" 
FROM public."User", public."Institute" 
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const { appointment_id } = await c.req.json();
    console.log(appointment_id)
    const data = await sql`UPDATE public."Checkup" SET "Institute_id" = ${ins_id} WHERE "ID" = ${appointment_id} RETURNING *`
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


app.post('/auth/booked/reject/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const { appointment_id, user_id, explanation } = await c.req.json();
    console.log(appointment_id, user_id, explanation)
    const data = await sql`UPDATE public."Checkup" SET "Institute_id" = NULL WHERE "ID" = ${appointment_id} RETURNING *`
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

app.get('/auth/booked/accepted/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID" 
FROM public."User", public."Institute" 
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const data = await sql`
   SELECT "Checkup"."ID" as "app_id", * 
FROM "Checkup", "Donor", "User"
where "Checkup"."Institute_id" is not null
and "Checkup"."Donor_id"="Donor"."Donor_id"
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

/**
 * 

 */

app.get('/auth/booked/needReport', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    console.log(ins_id)
    const data = await sql`
    select "User"."ID" as id, "Full_name" as "fullName", "email" from "Appointment", "Institute", "User","Donor"
where
"Appointment"."Institute_id" is not null
and "Appointment"."Institute_id" = "Institute"."ID"
and "Appointment"."Donor_id" = "Donor"."Donor_id" and "Donor"."User_id"="User"."ID" and "Appointment"."Completed" is true and "Appointment"."isTested" is false and "Institute_id"=${ins_id}`
    return c.json({ data })
})

app.get('/auth/booked/needReport/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    console.log(ins_id)
    const data = await sql`
    select "User"."ID" as id, "Full_name" as "fullName", "email" from "Checkup", "Institute", "User","Donor"
where
"Checkup"."Institute_id" is not null
and "Checkup"."Institute_id" = "Institute"."ID"
and "Checkup"."Donor_id" = "Donor"."Donor_id" and "Donor"."User_id"="User"."ID" and "Checkup"."Completed" is true and "Checkup"."isTested" is false and "Institute_id"=${ins_id}`
    return c.json({ data })
})


app.get('/auth/booked/futureReport', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    console.log(ins_id)
    const data = await sql`
   select 
    "Appointment"."Donor_id" as id, 
    "Full_name" as "name", 
    to_timestamp("Appointment"."Pref_date_start" || ' ' || "Appointment"."Pref_time_start", 'YYYY-MM-DD HH24:MI:SS.US') AT TIME ZONE 'UTC' as "date", 
    "Appointment"."Completed" as "completed" 
from 
    "Appointment", 
    "Institute", 
    "User", 
    "Donor"
where
    "Appointment"."Institute_id" is not null
    and "Appointment"."Institute_id" = "Institute"."ID"
    and "Appointment"."Donor_id" = "Donor"."Donor_id" 
    and "Donor"."User_id" = "User"."ID" 
    and "Institute_id"=${ins_id}`
    return c.json({ data })
})

app.get('/auth/booked/futureReport/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    console.log(ins_id)
    const data = await sql`
   select 
    "Checkup"."Donor_id" as id, 
    "Full_name" as "name", 
    to_timestamp("Checkup"."Pref_date_start" || ' ' || "Checkup"."Pref_time_start", 'YYYY-MM-DD HH24:MI:SS.US') AT TIME ZONE 'UTC' as "date", 
    "Checkup"."Completed" as "completed" 
from 
    "Checkup", 
    "Institute", 
    "User", 
    "Donor"
where
    "Checkup"."Institute_id" is not null
    and "Checkup"."Institute_id" = "Institute"."ID"
    and "Checkup"."Donor_id" = "Donor"."Donor_id" 
    and "Donor"."User_id" = "User"."ID" 
    and "Institute_id"=${ins_id}`
    return c.json({ data })
})


app.post('/auth/booked/app_complete', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const { donor_id, completed } = await c.req.json();
    console.log(donor_id, completed)
    const data = await sql`UPDATE public."Appointment" SET "Completed" = ${completed} WHERE "Donor_id" = ${donor_id} AND "Institute_id"=${ins_id} RETURNING *`
    return c.json({ data });
})


app.post('/auth/booked/app_complete/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const { donor_id, completed } = await c.req.json();
    console.log(donor_id, completed)
    const data = await sql`UPDATE public."Checkup" SET "Completed" = ${completed} WHERE "Donor_id" = ${donor_id} AND "Institute_id"=${ins_id} RETURNING *`
    return c.json({ data });
})


app.post('/auth/booked/add_report', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const { userId, Is_safe, fullName, email, report, inventory, explanation, future_cause, intro, secondary, others } = await c.req.json();

    console.log(inventory)

    const r1: any = await sql`
    UPDATE public."Appointment"
SET "isTested" = true
FROM public."Donor", public."User"
WHERE "Appointment"."Donor_id" = "Donor"."Donor_id"
AND "Donor"."User_id" = "User"."ID"
AND "User"."ID" = ${userId}
AND "Appointment"."Institute_id" = ${ins_id}
RETURNING *;
    `
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((err) => {
            console.log(err)
            return c.json({ data: 'Error' })
        })


    const res = await sql`
        INSERT INTO public."Test_result" ("userId", "Is_safe","institute_id", "explanation", "future_cause", "intro", "secondary", "others")
VALUES (${userId}, ${inventory}, ${ins_id},
${explanation}, ${future_cause}, ${intro}, ${secondary}, ${others})
RETURNING *;
    `.catch((err) => {
        console.log(err)
        const r2 = sql`
    UPDATE public."Appointment"
SET "isTested" = false
FROM public."Donor", public."User"
WHERE "Appointment"."Donor_id" = "Donor"."Donor_id"
AND "Donor"."User_id" = "User"."ID"
AND "User"."ID" = ${userId}
AND "Appointment"."Institute_id" = ${ins_id}
RETURNING *;
        `
        return c.json({ data: 'Error' })
    })

    if (inventory === true) {

        console.log(r1[0].Unit, r1[0].Blood_type)

        const isExist = await sql`
    SELECT * FROM public."Inventory"
WHERE "Institute_id" = ${ins_id} AND "Blood_type" = ${r1[0].Blood_type}
    `
        if (isExist.length === 0) {
            const r2 = await sql`
    INSERT INTO public."Inventory" ("Institute_id", "Blood_type", "Amount")
VALUES (${ins_id}, ${r1[0].Blood_type}, 0)
RETURNING *;`
        }

        const r2 = await sql`
    UPDATE public."Inventory"
SET "Amount" = "Amount" + ${r1[0].Unit}
WHERE "Institute_id" = ${ins_id} AND "Blood_type" = ${r1[0].Blood_type}
RETURNING *;
    `.catch((err) => {
            console.log(err)
            const r3 = sql`
    UPDATE public."Appointment"
SET "isTested" = false
FROM public."Donor", public."User"
WHERE "Appointment"."Donor_id" = "Donor"."Donor_id"
AND "Donor"."User_id" = "User"."ID"
AND "User"."ID" = ${userId}
AND "Appointment"."Institute_id" = ${ins_id}
RETURNING *;`
            const r4 = sql`
        DELETE FROM public."Test_result" WHERE "userId" = ${userId} AND "institute_id" = ${ins_id}
        `



            return c.json({ data: 'Error' })
        })

    }
    return c.json({ data: res })
})


app.post('/auth/booked/add_report/hospital', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const { userId, Is_safe, fullName, email, report, inventory, explanation, future_cause, intro, secondary, others } = await c.req.json();

    console.log(inventory)

    const r1: any = await sql`
    UPDATE public."Checkup"
SET "isTested" = true
FROM public."Donor", public."User"
WHERE "Checkup"."Donor_id" = "Donor"."Donor_id"
AND "Donor"."User_id" = "User"."ID"
AND "User"."ID" = ${userId}
AND "Checkup"."Institute_id" = ${ins_id}
RETURNING *;
    `
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((err) => {
            console.log(err)
            return c.json({ data: 'Error' })
        })


    const res = await sql`
        INSERT INTO public."Test_result" ("userId", "Is_safe","institute_id", "explanation", "future_cause", "intro", "secondary", "others")
VALUES (${userId}, ${inventory}, ${ins_id},
${explanation}, ${future_cause}, ${intro}, ${secondary}, ${others})
RETURNING *;
    `.catch((err) => {
        console.log(err)
        const r2 = sql`
    UPDATE public."Checkup"
SET "isTested" = false
FROM public."Donor", public."User"
WHERE "Checkup"."Donor_id" = "Donor"."Donor_id"
AND "Donor"."User_id" = "User"."ID"
AND "User"."ID" = ${userId}
AND "Checkup"."Institute_id" = ${ins_id}
RETURNING *;
        `
        return c.json({ data: 'Error' })
    })

    return c.json({ data: res })
})



app.get('/auth/inventory', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const data = await sql`
    SELECT "Blood_type" as "type", "Amount" as "amount" FROM public."Inventory" WHERE "Institute_id" = ${ins_id}
    `
    return c.json({ data })
})

app.post('/auth/inventory/add', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const { bloodType, amount } = await c.req.json()
    console.log(bloodType, amount)
    const payload = c.get('jwtPayload');
    const id = payload['id']
    const ins_id = (await sql`SELECT "Institute"."ID"
FROM public."User", public."Institute"
WHERE "Institute"."user_id" = "User"."ID" AND "User"."ID"=${id}`)[0].ID
    const isPresent = await sql`
    SELECT * FROM public."Inventory" WHERE "Institute_id" = ${ins_id} AND "Blood_type" = ${bloodType}
    `
    if (isPresent.length === 0) {
        const data = await sql`
    INSERT INTO public."Inventory" ("Institute_id", "Blood_type", "Amount")
VALUES (${ins_id}, ${bloodType}, ${amount})
RETURNING *;
    `
        return c.json({ data })
    }
    const data = await sql`
    UPDATE public."Inventory"   
SET "Amount" = "Amount" + ${amount}
WHERE "Institute_id" = ${ins_id} AND "Blood_type" = ${bloodType}
RETURNING *;
    `
    return c.json({ data })
})


app.get('/', async (c) => {

    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const test = await sql`SELECT * FROM "User"`

    return c.text('Hello Hono!')
})


app.get('/auth/institute_details', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const Institute = (await sql`SELECT * 
FROM 
    public."Institute" d  
JOIN 
    public."User" u ON d."user_id" = u."ID" 
WHERE 
    d."user_id" = ${payload['id']}`)[0]

    return c.json({ Institute })

})






export default app
