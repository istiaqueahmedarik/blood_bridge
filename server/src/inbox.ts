import { Hono } from 'hono'
import { jwt, JwtVariables, sign, verify } from 'hono/jwt';
import postgres from 'postgres'
const nodemailer = require('nodemailer');

import { createClient } from '@supabase/supabase-js'
import { createMimeMessage } from 'mimetext';
import { upgradeWebSocket } from 'hono/cloudflare-workers';
var jwt_ = require('jsonwebtoken')



type Variables = JwtVariables

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
    SUPABASE_URL: string,
    SUPABASE_SERVICE_ROLE_KEY: string,
}

const app = new Hono<{ Variables: Variables, Bindings: Bindings }>()

app.use('/api/*', (c, next) => {
    const jwtMiddleware = jwt({
        secret: c.env.JWT_SECRET,
    })
    return jwtMiddleware(c, next)
})

app.get('/auth', async (c) => {
    return c.text('Hello Hono!')
})
var jwt_ = require('jsonwebtoken')


app.post('/api/send/:id', async (c) => {
    const { id } = c.req.param();
    const data = id
    const payload = c.get('jwtPayload');
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const ids = data.split(':')
    const user1 = (ids[0] > ids[1]) ? ids[1] : ids[0]
    const user2 = (ids[0] > ids[1]) ? ids[0] : ids[1]
    const my_email = payload['email']
    const my_id = await sql`SELECT "ID" FROM public."User" WHERE "email" = ${my_email}`
    if (my_id.length === 0) {
        return c.json({
            status: 'error',
            message: 'User not found'
        })
    }
    if (my_id[0]['ID'] != user1 && my_id[0]['ID'] != user2) {
        return c.json({
            status: 'error',
            message: 'Invalid user'
        })
    }
    const iid = await sql`SELECT "ID" FROM public."Inbox" WHERE ("sender_id" = ${user1} AND "reciever_id" = ${user2})`
    const { message } = await c.req.json()
    console.log("Message: ", message)
    const res = await sql`INSERT INTO public."Message" ("Inbox_id", "sender_id", "Text") VALUES (${iid[0]['ID']}, ${payload['id']}, ${message}) RETURNING *`;

    await sql`
      UPDATE public."Inbox"
      SET 
        "last_message" = ${message},
        "last_message_flag_sender_time" = NOW(),
        "last_message_flag_reciever_time" = NOW(),
        "last_message_flag_sender" = FALSE,
        "last_message_flag_reciever" = FALSE
      WHERE "ID" = ${iid[0]['ID']}
    `
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            console.log("Message sent")
        });

    return c.json({
        status: 'success',
        message: 'Message sent'
    })
})


app.get('/api/auth/inbox', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');

    const email = payload['email'];
    const userId = payload.id;

    let q = `
        SELECT u."ID", u."Full_name", u."Address", i."last_message_flag_sender_time"
        FROM public."Inbox" i
        JOIN public."User" u
            ON u."ID" = CASE
                    WHEN i."sender_id" = '${userId}' THEN i."reciever_id"
                    ELSE i."sender_id"
                END
        WHERE i."sender_id" = '${userId}' OR i."reciever_id" = '${userId}'
        ORDER BY i."last_message_flag_sender_time" DESC;
    `;
    const inboxUsers = await sql.unsafe(q);
    console.log(inboxUsers)

    // Extract IDs of users already in an inbox
    const inboxUserIds = []
    for (const item of inboxUsers) {
        inboxUserIds.push(`'${item['ID']}'`)
    }
    const inboxUserIdsStr = inboxUserIds.join(', ');
    console.log(inboxUserIdsStr)
    const q1 =
        inboxUserIds.length ? `
      SELECT "ID", "Full_name", "Address"
      FROM public."User"
      WHERE "ID" != '${payload['id']}'
        AND "ID" NOT IN (${inboxUserIdsStr})
    ` : `
        SELECT "ID", "Full_name", "Address"
        FROM public."User"
        WHERE "ID" != '${payload['id']}'
        `
    console.log(q1)
    const otherUsers = await sql.unsafe(q1);

    const data = [...inboxUsers, ...otherUsers];

    const uniqueUsers = new Set();
    const ret = [];
    for (const item of data) {
        if (!uniqueUsers.has(item['ID'])) {
            uniqueUsers.add(item['ID']);
            const user1 = (payload['id'] > item['ID']) ? item['ID'] : payload['id'];
            const user2 = (payload['id'] > item['ID']) ? payload['id'] : item['ID'];
            const url = user1 + ':' + user2;
            console.log(url);
            ret.push({
                ID: item['ID'],
                Full_name: item['Full_name'],
                Address: item['Address'],
                url
            });
        }
    }
    console.log("ret", ret);

    return c.json(ret);
})

app.get('/api/auth/inbox/:id', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const { id } = c.req.param();
    const data = id

    const ids = data.split(':')
    const user1 = (ids[0] > ids[1]) ? ids[1] : ids[0]
    const user2 = (ids[0] > ids[1]) ? ids[0] : ids[1]

    let res = (await sql`SELECT * FROM public."Inbox" WHERE ("sender_id" = ${user1} AND "reciever_id" = ${user2})`)
    if (res.length === 0) {
        res = await sql`INSERT INTO public."Inbox" ("sender_id", "reciever_id") VALUES (${user1}, ${user2}) RETURNING *`
    }
    const iid = res[0]['ID']
    const others_id = (user1 === payload['id']) ? user2 : user1
    const res1 = await sql`SELECT "ID", "Full_name", "Address" FROM public."User" WHERE "ID" = ${others_id}`
    const messages = await sql`
        SELECT
            *,
            CASE WHEN "sender_id" = ${payload.id} THEN 'me' ELSE 'other' END AS owner
        FROM public."Message"
        WHERE "Inbox_id" = ${iid}
    `

    if (payload.id == user1) {
        await sql`
            UPDATE public."Inbox"
            SET 
                "last_message_flag_sender" = TRUE
            WHERE "ID" = ${iid}
        `
    } else {
        await sql`
            UPDATE public."Inbox"
            SET 
                "last_message_flag_reciever" = TRUE
            WHERE "ID" = ${iid}
        `
    }

    return c.json({ iid, res1, messages, uid: payload.id })

})



export default app
