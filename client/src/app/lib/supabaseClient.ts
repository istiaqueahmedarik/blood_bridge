'use server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
const cookieStore = await cookies()
const sec = cookieStore.get('token')?.value || ''
const url = process.env.SUPABASE_URL || ''
console.log(url, sec)
const supabase = createClient(url, sec);
export { supabase }