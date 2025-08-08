import React, { useState } from 'react';
import { Plus, Search, Edit3, Save, Trash2, FileText } from 'lucide-react';

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Welcome to FalakOS', content: 'This is your first note in the futuristic OS! Experience the smooth, glass-like interface with beautiful animations and modern design.', date: '2024-01-15' },
    { id: 2, title: 'Features to Explore', content: 'Try dragging windows, switching themes, and opening multiple apps. The interface is designed to be intuitive and beautiful.', date: '2024-01-14' },
    { id: 3, title: 'Design Philosophy', content: 'FalakOS embraces minimalism with glassmorphism effects, smooth animations, and a clean aesthetic that puts content first.', date: '2024-01-13' },
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      date: new Date().toISOString().split('T')[0]
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const saveNote = () => {
    setNotes(notes.map(note => note.id === selectedNote.id ? selectedNote : note));
    setIsEditing(false);
  };

  const deleteNote = (noteId: number) => {
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotes(newNotes);
    if (selectedNote.id === noteId && newNotes.length > 0) {
      setSelectedNote(newNotes[0]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="h-full flex bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-white">Notes</h1>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          {/* Add Note Button */}
          <button
            onClick={addNewNote}
            className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-500 hover:to-purple-500 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </div>
        
        {/* Notes List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-3">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedNote.id === note.id
                    ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10'
                }`}
              >
                <h3 className="text-white font-medium text-sm mb-2 truncate">{note.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed line-clamp-3 mb-3">{note.content}</p>
                <span className="text-white/40 text-xs">{formatDate(note.date)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                disabled={!isEditing}
                className="text-2xl font-semibold text-white bg-transparent border-none focus:outline-none flex-1 placeholder-white/50"
                placeholder="Note title..."
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-3 rounded-2xl transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm ${
                    isEditing 
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-400/30' 
                      : 'bg-white/10 text-white/60 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                {isEditing && (
                  <button
                    onClick={saveNote}
                    className="p-3 bg-green-500/20 text-green-400 border border-green-400/30 rounded-2xl transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => deleteNote(selectedNote.id)}
                  className="p-3 bg-red-500/20 text-red-400 border border-red-400/30 rounded-2xl transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6">
              <textarea
                value={selectedNote.content}
                onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
                disabled={!isEditing}
                placeholder="Start writing your note..."
                className="w-full h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200 leading-relaxed"
                style={{ minHeight: '400px' }}
              />
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm text-white/50">
                <span>Last modified: {formatDate(selectedNote.date)}</span>
                <span>{selectedNote.content.length} characters</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotesApp;