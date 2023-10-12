import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yteymbjybehfmpavaxsu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0ZXltYmp5YmVoZm1wYXZheHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5ODMwMzQsImV4cCI6MjAxMjU1OTAzNH0.MZnIzcwMb0a2QzQVQiSgNWCgRM6neori8Itg9z8CDJo";

export const supabase = createClient(supabaseUrl, supabaseKey);
