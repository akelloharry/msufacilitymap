import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req: Request) => {
  try {
    const payload = await req.json()

    console.log('Received Kobo submission:', payload)

    // Insert the submission into your table
    const { data, error } = await supabase
      .from('kobo_submissions')        // ← Change this if your table name is different
      .insert({
        submission_id: payload._id || payload._uuid,
        submitted_at: payload._submission_time || new Date().toISOString(),
        raw_data: payload,               // Store full Kobo data as JSON
        // Add your specific fields here, e.g.:
        // name: payload.name,
        // location: payload.location,
        // description: payload.description,
      })

    if (error) {
      console.error('Insert error:', error)
      throw error
    }

    console.log('Successfully inserted Kobo submission')

    return new Response(
      JSON.stringify({ success: true, message: 'Data saved to Supabase' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing Kobo webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
