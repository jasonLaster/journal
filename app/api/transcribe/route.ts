import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { File } from '@web-std/file'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function generateSummary(text: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that creates short, concise summaries (2-4 words) of journal entries. Focus on the main topic or action."
      },
      {
        role: "user",
        content: `Please summarize this journal entry in 2-4 words: "${text}"`
      }
    ],
    temperature: 0.7,
    max_tokens: 20,
  })

  return completion.choices[0].message.content.trim()
}

export async function POST(request: Request) {
  try {
    console.log('Transcribing audio...')
    const formData = await request.formData()
    const audio = formData.get('audio') as Blob

    if (!audio) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    // Convert Blob to File with proper name and type
    const audioFile = new File([audio], 'audio.mp3', { type: 'audio/mp3' })

    // 1. First get the transcription
    const transcript = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    })

    console.log('Transcript:', transcript.text)

    // 2. Then generate a summary
    const summary = await generateSummary(transcript.text)
    console.log('Summary:', summary)

    return NextResponse.json({
      text: transcript.text,
      summary: summary
    })
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Transcription failed' },
      { status: 500 }
    )
  }
} 