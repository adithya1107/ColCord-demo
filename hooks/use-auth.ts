import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient" // Example using Supabase

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  return { user, loading }
}