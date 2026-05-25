import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvuwqdedxspuirrlaswt.supabase.co";
const supabaseKey = "sb_publishable_SyGmdh21r8ldqO-4KoRUEA_A4GA6BLM";

export const supabase = createClient(supabaseUrl, supabaseKey);
