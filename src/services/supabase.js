import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ohglkegoezfpbowoxbyb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZ2xrZWdvZXpmcGJvd294YnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzkwMjksImV4cCI6MjA2NjE1NTAyOX0.VXxjs10cf47KBhIuF2azE0Xzvo1Hb1msPfiihYbgVrw";
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;