"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type CollegeContextType = {
  collegeName: string
  setCollegeName: (name: string) => void
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined)

const STORAGE_KEY = 'collegeName'
const DEFAULT_COLLEGE = "Demo College"

export function CollegeProvider({ children }: { children: React.ReactNode }) {
  const [collegeName, setCollegeName] = useState(DEFAULT_COLLEGE)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const loadCollegeName = () => {
      try {
        const storedName = localStorage.getItem(STORAGE_KEY)
        if (storedName) {
          setCollegeName(storedName)
        }
      } catch (error) {
        console.error('Error loading college name:', error)
      } finally {
        setIsInitialized(true)
      }
    }

    loadCollegeName()
  }, [])

  const updateCollegeName = (name: string) => {
    setCollegeName(name)
    try {
      localStorage.setItem(STORAGE_KEY, name)
    } catch (error) {
      console.error('Error saving college name:', error)
    }
  }

  if (!isInitialized) {
    return null
  }

  return (
    <CollegeContext.Provider value={{ 
      collegeName, 
      setCollegeName: updateCollegeName 
    }}>
      {children}
    </CollegeContext.Provider>
  )
}

export function useCollege() {
  const context = useContext(CollegeContext)
  if (context === undefined) {
    throw new Error('useCollege must be used within a CollegeProvider')
  }
  return context
}

