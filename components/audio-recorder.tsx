'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Square, Loader2 } from 'lucide-react'

interface AudioRecorderProps {
  onTranscription: (text: string, summary: string) => void
  isEditing?: boolean
}

export function AudioRecorder({ onTranscription, isEditing }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
    }
  }

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) return

    return new Promise<Blob>((resolve) => {
      mediaRecorderRef.current!.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/mpeg' })
        resolve(audioBlob)
      }
      mediaRecorderRef.current!.stop()
      mediaRecorderRef.current!.stream.getTracks().forEach(track => track.stop())
    })
  }

  const handleRecordingComplete = async () => {
    setIsRecording(false)
    setIsProcessing(true)

    try {
      const audioBlob = await stopRecording()
      const formData = new FormData()
      formData.append('audio', audioBlob)

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Transcription failed')

      const { text, summary } = await response.json()
      onTranscription(text, summary)
    } catch (err) {
      console.error('Error processing audio:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {isProcessing ? (
        <Button disabled variant="outline" size="icon" title="Processing audio...">
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : isRecording ? (
        <Button
          onClick={handleRecordingComplete}
          variant="destructive"
          size="icon"
          title="Stop recording"
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button 
          onClick={startRecording} 
          variant="outline" 
          size="icon"
          title={isEditing ? "Record to update entry" : "Record new entry"}
        >
          <Mic className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 