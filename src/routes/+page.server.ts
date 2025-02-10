import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
  depends('supabase:db:streaks')
  const { data: streaks } = await supabase.from('streaks').select('id,streak_name,streak_days').order('id')
  return { streaks: streaks ?? [] }
}