import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://zqihxpomvoeragzpcerx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxaWh4cG9tdm9lcmFnenBjZXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MzMxNzIsImV4cCI6MjA0MDEwOTE3Mn0.OG2Jd_I8Z5TxktzbiZXyI5A5Gb6CObus8NTriMhKGvA')
export { supabase }