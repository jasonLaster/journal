import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Bike, Book, Brain, Pen, Lightbulb, Edit, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { AudioRecorder } from '@/components/audio-recorder'

interface Entry {
  id?: string;
  date?: string;
  text?: string;
  summary?: string;
}

interface EntriesPanelProps {
  entries: Entry[]
  isOpen: boolean
  goalName: string
  onClose: () => void
  onEditEntry: (entry: Entry) => void
}

export function EntriesPanel({ entries, isOpen, goalName, onClose, onEditEntry }: EntriesPanelProps) {
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null)
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  const getRelativeDate = (date: string) => {
    const now = new Date()
    const entryDate = new Date(date)
    const diffTime = Math.abs(now.getTime() - entryDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  const getIconForSummary = (summary: string) => {
    if (summary.toLowerCase().includes('bike') || summary.toLowerCase().includes('exercise')) return <Bike className="w-5 h-5 mr-2" />
    if (summary.toLowerCase().includes('read')) return <Book className="w-5 h-5 mr-2" />
    if (summary.toLowerCase().includes('meditate')) return <Brain className="w-5 h-5 mr-2" />
    if (summary.toLowerCase().includes('write') || summary.toLowerCase().includes('journal')) return <Pen className="w-5 h-5 mr-2" />
    return <Lightbulb className="w-5 h-5 mr-2" />
  }

  return (
    <div 
      className={`fixed inset-0 bg-gray-800 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ height: '100vh' }}
    >
      <Card className="w-full h-full rounded-none bg-gray-800">
        <CardHeader className="flex flex-row items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-600">
            <ArrowLeft className="h-5 w-5 text-gray-400" />
          </Button>
          <CardTitle style={{marginTop: "0 !important"}} className="text-gray-100 ml-2 mt-0 leading-10">{goalName}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <Card key={entry.id} className="mb-4 bg-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-grow cursor-pointer" onClick={() => setExpandedEntryId(expandedEntryId === entry.id ? null : entry.id)}>
                        {getIconForSummary(entry.summary)}
                        <p className="text-sm text-gray-200">{entry.summary}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-400 mr-2">{getRelativeDate(entry.date)}</p>
                        <Button variant="ghost" size="icon" onClick={() => setEditingEntry(entry)} className="hover:bg-gray-600">
                          <Edit className="h-4 w-4 text-gray-400" />
                        </Button>
                      </div>
                    </div>
                    {expandedEntryId === entry.id && (
                      <p className="text-sm mt-2 text-gray-300">{entry.text}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-400">No entries yet for this goal.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      <EditingPanel
        entry={editingEntry}
        onSave={(updatedEntry) => {
          onEditEntry(updatedEntry);
          setEditingEntry(null);
        }}
        onClose={() => setEditingEntry(null)}
      />
    </div>
  )
}

const EditingPanel = ({ entry, onSave, onClose }: { entry: Entry | null, onSave: (entry: Entry) => void, onClose: () => void }) => {
  if (!entry) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 border-t border-gray-700 transition-transform duration-300 ease-in-out transform"
         style={{ transform: entry ? 'translateY(0)' : 'translateY(100%)' }}>
      <h3 className="text-lg font-semibold mb-2 text-gray-100">Edit Entry</h3>
      <input
        type="text"
        value={entry.summary}
        onChange={(e) => onSave({ ...entry, summary: e.target.value })}
        className="w-full mb-2 p-2 border border-gray-700 rounded bg-gray-800 text-gray-100 focus:outline-none focus:border-blue-500"
      />
      <div className="flex items-center gap-2 mb-2">
        <textarea
          value={entry.text}
          onChange={(e) => onSave({ ...entry, text: e.target.value })}
          className="flex-grow p-2 border border-gray-700 rounded bg-gray-800 text-gray-100 focus:outline-none focus:border-blue-500"
          rows={3}
        />
        <AudioRecorder 
          onTranscription={(text, summary) => {
            onSave({ 
              ...entry, 
              text: entry.text ? `${entry.text}\n\n${text}` : text,
            })
          }}
          isEditing={true}
        />
      </div>
      <div className="flex justify-end mt-2">
        <Button variant="outline" size="sm" onClick={onClose} className="mr-2 border-gray-600 bg-gray-800 hover:text-gray-200 text-gray-300 hover:bg-gray-800">
          Cancel
        </Button>
        <Button variant="default" size="sm" onClick={onClose} className="bg-blue-600 text-white hover:bg-blue-700">
          Save
        </Button>
      </div>
    </div>
  );
};

