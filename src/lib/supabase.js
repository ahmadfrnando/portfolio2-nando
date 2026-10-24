import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// null kalau env belum di-set, supaya portfolio tetap jalan pakai data fallback.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const IMAGE_BUCKET = 'project-images';
