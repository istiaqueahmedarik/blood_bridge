import { Hono } from 'hono'
import { jwt, JwtVariables } from 'hono/jwt';
import postgres from 'postgres'

var jwt_ = require('jsonwebtoken')


type Variables = JwtVariables

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
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


app.post('/login', async (c) => {
  const connectionString = c.env.DATABASE_URL || ''
  const sql = postgres(connectionString)

  const body = await c.req.json();

  const { email, password } = body;

  console.log(email, password)


  const user = await sql`SELECT * FROM "User" WHERE "email" = ${email}`
  if (user.length) {

    const pass = await sql`SELECT * FROM "Password" WHERE "User_id" = ${user[0].ID}`

    console.log('pass', pass)

    if (pass[0].Password !== password) {
      return c.json({
        status: 'error',
        message: 'Password incorrect'
      })
    }
    const id = user[0].ID
    const type = 'Donor'
    const payload = { email, id, type }
    const token = jwt_.sign(payload, c.env.JWT_SECRET, { expiresIn: '1d' })
    console.log('token', token)
    return c.json({
      status: 'success',
      token,
      type: "Donor"
    })
  }

  return c.json({
    status: 'error',
    message: 'User not found'
  })

})

app.get('/', async (c) => {

  const connectionString = c.env.DATABASE_URL || ''
  const sql = postgres(connectionString)
  const test = await sql`SELECT * FROM "User"`
  console.log('test', test)
  return c.text('Hello Hono!')
})








export default app
