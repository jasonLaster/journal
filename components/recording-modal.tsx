'use client'

import { useState, useEffect } from 'react'
import { Mic, StopCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface RecordingModalProps {
  isOpen: boolean
  onClose: () => void
  goal: { id: string, text: string } | null
  onEntryComplete: (entry: { goalId: string, text: string, summary: string }) => void
}

export default function RecordingModal({ isOpen, onClose, goal, onEntryComplete }: RecordingModalProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    // Here you would typically start the actual audio recording
    // This is just a placeholder for the UI
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    // Here you would typically stop the recording, send it for transcription and summarization
    // This is just a placeholder for the UI
    setTimeout(() => {
      const mockText = "This is a mock transcription of the audio recording."
      const mockSummary = "Mock summary of the transcribed text."
      setText(mockText)
      setSummary(mockSummary)
      setRecordingComplete(true)
    }, 1000)
  }

  const handleSave = () => {
    if (goal) {
      onEntryComplete({ goalId: goal.id, text, summary })
    }
    handleClose()
  }

  const handleClose = () => {
    setIsRecording(false)
    setRecordingTime(0)
    setRecordingComplete(false)
    setText("")
    setSummary("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{goal?.text}</DialogTitle>
        </DialogHeader>
        {!recordingComplete ? (
          <div className="flex flex-col items-center gap-4 py-4">
            {isRecording ? (
              <div className="text-2xl font-bold text-primary animate-pulse">
                Recording: {recordingTime}s
              </div>
            ) : (
              <div className="text-xl">Ready to record</div>
            )}
            <Button
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              {isRecording ? (
                <>
                  <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Start Recording
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
              <Textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700">Full Text</label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          {recordingComplete && (
            <Button onClick={handleSave}>Save Entry</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

