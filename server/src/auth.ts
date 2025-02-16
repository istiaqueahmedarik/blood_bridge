import { Hono } from 'hono'
import { jwt, JwtVariables } from 'hono/jwt';
import postgres from 'postgres'
const nodemailer = require('nodemailer');

var jwt_ = require('jsonwebtoken')
import { createClient } from '@supabase/supabase-js'
import { createMimeMessage } from 'mimetext';


type Variables = JwtVariables

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
    SUPABASE_URL: string,
    SUPABASE_SERVICE_ROLE_KEY: string,
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


/**
 * 



 */

app.post('/donor_signup', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)

    const body = await c.req.json();

    const { name, present_address, email, phone, password, bloodType, dob, fathersName, mothersName, nid, permanentAddress, croppedImage, nidImage } = body;
    let ok = true;
    const [lat, lng] = present_address.split(',');

    const findDonor = await sql`SELECT * FROM "Donor" WHERE "nid" = ${nid}`
    if (findDonor.length > 0) {
        return c.json({
            status: 'error',
            message: 'Donor already exists'
        })
    }

    try {
        const user = await sql`INSERT INTO "User" ("Full_name","email", "Address","Verification_url","latitude","longitude","Verified") VALUES (${name}, ${email}, ${permanentAddress}, ${nidImage},${lat},${lng},${ok}) RETURNING *`

        const user_id = user[0].ID

        const donor = await sql`INSERT INTO "Donor" ("Phone_number", "Father's_name", "Mother's_name", "Date_of_birth", "Blood_type", "Profile_picture", "User_id","nid") VALUES (${phone}, ${fathersName}, ${mothersName}, ${dob}, ${bloodType}, ${croppedImage}, ${user_id},${nid}) RETURNING *`

        const pass = await sql`INSERT INTO "Password" ("Password", "User_id") VALUES (${password}, ${user_id}) RETURNING *`


        return c.json({
            status: 'success',
            data: donor
        })
    }
    catch (e) {
        console.log('error', e)
        return c.json({
            status: 'error',
            message: e
        })
    }
})


app.post('/institute_signup', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)

    const file = await c.req.parseBody();


    const LcCard = file['LcCard']
    const Institute_name = file['Institute_name'] as string
    const license_no = file['license_no'] as string
    const Email_Address = file['Email_Address'] as string
    const Phone_Number = file['Phone_Number'] as string
    const permanentAddress = file['permanentAddress'] as string
    const address = file['address'] as string
    const city = file['city'] as string
    const upazilla = file['upazilla'] as string
    const password = file['password'] as string
    const confirm_password = file['confirm_password'] as string
    const instituteType = file['instituteType'] as string



    const supabaseUrl = c.env.SUPABASE_URL
    const supabaseKey = c.env.SUPABASE_SERVICE_ROLE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    let fileBuffer: Buffer
    if (typeof LcCard === 'string') {
        fileBuffer = Buffer.from(LcCard, 'base64')
    } else {
        fileBuffer = Buffer.from(await LcCard.arrayBuffer())
    }

    const fileName = `license_${Date.now()}`
    const { data, error } = await supabase.storage.from('license').upload(fileName, fileBuffer, {
        contentType: 'image/png'
    })

    if (error) {
        console.error('Supabase upload error:', error)
        return c.json({ status: 'error', message: 'Failed to upload license card.' })
    }

    const { data: licenseData } = supabase.storage.from('license').getPublicUrl(fileName)
    const publicURL = licenseData.publicUrl



    let ok = false;
    let [lat, lng] = address.split(',');

    const findUser = await sql`SELECT * FROM "User" WHERE "email" = ${Email_Address}`
    if (findUser.length > 0) {
        return c.json({
            status: 'error',
            message: 'User already exists'
        })
    }

    try {
        const user = await sql`INSERT INTO "User" ("Full_name","email", "Address","Verification_url","latitude","longitude","Verified") VALUES (${Institute_name}, ${Email_Address}, ${permanentAddress}, ${publicURL},${lat},${lng},${ok}) RETURNING *`

        const user_id = user[0].ID

        const donor = await sql`INSERT INTO "Institute" ("Type", "user_id", "city", "upazilla") VALUES (${instituteType}, ${user[0].ID}, ${city}, ${upazilla}) RETURNING *`

        const pass = await sql`INSERT INTO "Password" ("Password", "User_id") VALUES (${password}, ${user_id}) RETURNING *`


        return c.json({
            status: 'success',
            data: donor
        })
    }
    catch (e) {
        console.log('error', e)
        return c.json({
            status: 'error',
            message: e
        })
    }
})


app.post('/login', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)

    const body = await c.req.json();

    const { email, password } = body;




    const user = await sql`SELECT * FROM "User" , "Donor" WHERE "email" = ${email} and "User"."ID" = "Donor"."User_id"`
    const user1 = await sql`SELECT * FROM "User" , "Institute" WHERE "email" = ${email} and "User"."ID" = "Institute"."user_id"`
    if (user.length || user1.length) {

        const pass = await sql`SELECT * FROM "Password" WHERE "User_id" = ${user.length ? user[0].ID : user1[0].user_id}`



        if (pass[0].Password !== password) {
            return c.json({
                status: 'error',
                message: 'Password incorrect'
            })
        }
        const id = user.length ? user[0].ID : user1[0].user_id
        const type = user.length ? 'donor' : user1[0].Type
        const payload = { email, id, type }
        const token = jwt_.sign(payload, c.env.JWT_SECRET, { expiresIn: '1d' })

        return c.json({
            status: 'success',
            token,
            type: type
        })
    }




    return c.json({
        status: 'error',
        message: 'User not found'
    })

})

app.get('/auth/type', async (c) => {
    const payload = c.get('jwtPayload');
    return c.json({
        status: 'success',
        type: payload.type
    })
})

app.get('/', async (c) => {

    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const msg = createMimeMessage();

    return c.text('Hello Hono1!')

})


app.post('/auth/em/ac', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const body = await c.req.json();
    const eid = body.eid;
    const type = body.val;
    const payload = c.get('jwtPayload');
    const email = payload.email;
    const user = await sql`SELECT * FROM "User" WHERE "email" = ${email}`
    if (user.length === 0) {
        return c.json({
            status: 'error',
            message: 'User not found'
        })
    }
    const user_id = user[0].ID
    console.log(type)
    if (type === "ac") {
        const res = await sql`INSERT INTO public."Responder" ("Emergency_id", "User_id")
VALUES (${eid}, ${user_id}) RETURNING *;`
            .catch((e) => {
                return c.json({
                    status: 'error',
                    message: e
                })
            })
        console.log(res)
    }
    else {
        try {
            const res = await sql`DELETE FROM public."Responder" WHERE "Emergency_id" = ${eid} and "User_id" = ${user_id};`
        }
        catch (e) {
            return c.json({
                status: 'error',
                message: e
            })
        }
    }

    return c.json({
        status: 'success'
    })

})

app.get('/auth/em', async (c) => {
    const connectionString = c.env.DATABASE_URL || ''
    const sql = postgres(connectionString)
    const payload = c.get('jwtPayload');
    const email = payload.email;
    const user = await sql`SELECT * FROM "User" WHERE "email" = ${email}`
    if (user.length === 0) {
        return c.json({
            status: 'error',
            message: 'User not found'
        })
    }
    const user_id = user[0].ID
    const res = await sql`SELECT * FROM "Responder" WHERE "User_id" = ${user_id}`
    return c.json({
        status: 'success',
        present: res.length > 0,
    })
})





export default app
