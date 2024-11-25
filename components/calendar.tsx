'use client'

import { useState, useEffect, useRef } from 'react'

interface CalendarProps {
  entries: string[]  // Array of dates (YYYY-MM-DD) when entries were made
}

export function Calendar({ entries }: CalendarProps) {
  const [visibleDays, setVisibleDays] = useState(30)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateVisibleDays = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const dayWidth = 18 // 14px width + 4px gap
        const newVisibleDays = Math.floor(width / dayWidth)
        setVisibleDays(Math.min(30, Math.max(7, newVisibleDays))) // Ensure between 7 and 30 days
      }
    }

    updateVisibleDays()
    window.addEventListener('resize', updateVisibleDays)
    return () => window.removeEventListener('resize', updateVisibleDays)
  }, [])

  const getDaysArray = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < visibleDays; i++) {
      const date = new Date()
      date.setDate(today.getDate() - i)
      days.push(date)
    }
    return days
  }

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  const getActivityLevel = (date: string) => {
    const hasEntry = entries.includes(date)
    return hasEntry ? 'bg-blue-500' : 'bg-gray-700'
  }

  const days = getDaysArray()

  return (
    <div ref={containerRef} className="p-2 bg-gray-800 rounded overflow-hidden">
      <div className="flex gap-1 justify-start">
        {days.map((date) => {
          const formattedDate = formatDate(date)
          return (
            <div
              key={formattedDate}
              className={`w-3.5 h-3.5 rounded-sm ${getActivityLevel(formattedDate)}`}
              title={`${formattedDate}: ${entries.filter(entry => entry === formattedDate).length} entries`}
            />
          )
        })}
      </div>
    </div>
  )
}

