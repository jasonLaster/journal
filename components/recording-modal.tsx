'use client'

import { useState } from 'react'
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
import { AudioRecorder } from './audio-recorder'

interface RecordingModalProps {
  isOpen: boolean
  onClose: () => void
  goal: { id: string, text: string } | null
  onEntryComplete: (entry: { goalId: string, text: string, summary: string }) => void
}

export default function RecordingModal({ isOpen, onClose, goal, onEntryComplete }: RecordingModalProps) {
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")

  const handleClose = () => {
    setRecordingComplete(false)
    setText("")
    setSummary("")
    onClose()
  }

  const handleSave = () => {
    if (goal) {
      onEntryComplete({ goalId: goal.id, text, summary })
    }
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{goal?.text}</DialogTitle>
        </DialogHeader>
        {!recordingComplete ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="text-xl">Ready to record</div>
            <AudioRecorder 
              onTranscription={(transcribedText, generatedSummary) => {
                setText(transcribedText)
                setSummary(generatedSummary)
                setRecordingComplete(true)
              }}
            />
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

