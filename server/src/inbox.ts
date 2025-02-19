import { Hono } from 'hono'
import { jwt, JwtVariables } from 'hono/jwt';
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

app.get(
    '/ws/:id',
    upgradeWebSocket((c) => {

        return {
            onMessage(event, ws) {



                const connectionString = c.env.DATABASE_URL || ''
                const sql = postgres(connectionString)
                const { id } = c.req.param();
                const data = jwt_.verify(id, c.env.JWT_SECRET)
                if (!data) {
                    ws.send('Invalid URL')
                    return
                }

            },
            onClose: () => {
                console.log('Connection closed')
            },
        }
    })
)

app.get('/api/auth/inbox', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');

    const email = payload['email'];
    console.log(email)
    const get_user_id = (await sql`SELECT "ID" FROM public."User" WHERE "email" = ${email}`)
    if (get_user_id.length === 0) {
        return c.json({
            status: 'error',
            message: 'User not found'
        })
    }
    console.log(get_user_id[0]['ID'])
    const data = await sql`SELECT "ID", "Full_name", "Address" from public."User" WHERE "ID" != ${get_user_id[0]['ID']}`

    const ret = data.map((item) => {
        // const data = get_user_id[0]['ID'] + ':' + item['ID'];
        const user1 = (get_user_id[0]['ID'] > item['ID']) ? item['ID'] : get_user_id[0]['ID']
        const user2 = (get_user_id[0]['ID'] > item['ID']) ? get_user_id[0]['ID'] : item['ID']
        const data = user1 + ':' + user2;
        const encryptedData = jwt_.sign(data, c.env.JWT_SECRET)
        return {
            ID: item['ID'],
            Full_name: item['Full_name'],
            Address: item['Address'],
            url: encryptedData
        }
    })


    return c.json(ret)
})


app.get('/api/auth/inbox/:id', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const { id } = c.req.param();
    const data = jwt_.verify(id, c.env.JWT_SECRET)
    const ids = data.split(':')
    const user1 = (ids[0] > ids[1]) ? ids[1] : ids[0]
    const user2 = (ids[0] > ids[1]) ? ids[0] : ids[1]
    console.log(user1, user2, ids)
    let res = (await sql`SELECT * FROM public."Inbox" WHERE ("sender_id" = ${user1} AND "reciever_id" = ${user2})`)
    if (res.length === 0) {
        res = await sql`INSERT INTO public."Inbox" ("sender_id", "reciever_id") VALUES (${user1}, ${user2}) RETURNING *`
    }
    const iid = res[0]['ID']
    const others_id = (user1 === payload['id']) ? user2 : user1
    const res1 = await sql`SELECT "ID", "Full_name", "Address" FROM public."User" WHERE "ID" = ${others_id}`
    const messages = await sql`SELECT * FROM public."Message" WHERE "Inbox_id" = ${iid}`
    return c.json({ iid, res1, messages })

})



export default app
