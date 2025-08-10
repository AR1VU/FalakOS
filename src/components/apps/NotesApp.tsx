import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search, Edit3, Save, Trash2, FileText, Bold, Italic, Type, List, AlignLeft, AlignCenter, AlignRight, Undo, Redo } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  isRichText: boolean;
}

interface NotesAppProps {
  initialNote?: {
    title: string;
    content: string;
  };
}

const NotesApp: React.FC<NotesAppProps> = ({ initialNote }) => {
  const [notes, setNotes] = useState<Note[]>([
    { 
      id: 1, 
      title: 'Welcome to FalakOS Notes', 
      content: '<h2>Welcome to the Future of Note-Taking!</h2><p>This is your enhanced notes app with <strong>rich text editing</strong> capabilities. You can format your text with:</p><ul><li><strong>Bold text</strong></li><li><em>Italic text</em></li><li>Different heading sizes</li><li>Lists and more!</li></ul><p>Experience the smooth, <em>glassmorphism</em> interface designed for the future.</p>', 
      createdAt: '2024-01-15T10:00:00Z',
      modifiedAt: '2024-01-15T10:00:00Z',
      isRichText: true
    },
    { 
      id: 2, 
      title: 'Features to Explore', 
      content: '<h3>Rich Text Features</h3><p>Try out these formatting options:</p><ul><li><strong>Bold formatting</strong> for emphasis</li><li><em>Italic text</em> for style</li><li>Different <strong><em>combinations</em></strong></li></ul><h3>File Integration</h3><p>Open .txt files from the File Explorer and they\'ll load directly into this Notes app!</p>', 
      createdAt: '2024-01-14T15:30:00Z',
      modifiedAt: '2024-01-14T16:45:00Z',
      isRichText: true
    },
    { 
      id: 3, 
      title: 'Design Philosophy', 
      content: '<h2>Glassmorphism Design</h2><p>FalakOS embraces the future with:</p><ul><li><strong>Glassmorphism effects</strong> - Beautiful transparency and blur</li><li><strong>Smooth animations</strong> - Buttery transitions between states</li><li><strong>Modern typography</strong> - Clean, readable fonts</li><li><strong>Intuitive interactions</strong> - Everything responds to your touch</li></ul><p>The interface adapts beautifully to both <strong>light</strong> and <strong>dark</strong> themes.</p>', 
      createdAt: '2024-01-13T09:15:00Z',
      modifiedAt: '2024-01-13T09:15:00Z',
      isRichText: true
    },
  ]);
  
  const [selectedNote, setSelectedNote] = useState<Note>(notes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize with external note if provided
  useEffect(() => {
    if (initialNote) {
      const newNote: Note = {
        id: Date.now(),
        title: initialNote.title,
        content: initialNote.content.replace(/\n/g, '<br>'),
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        isRichText: true
      };
      setNotes(prev => [newNote, ...prev]);
      setSelectedNote(newNote);
      setIsEditing(true);
    }
  }, [initialNote]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '<p>Start writing your note here...</p>',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isRichText: true
    };
    setNotes([newNote, ...notes]);
    selectNoteWithTransition(newNote);
    setIsEditing(true);
  };

  const selectNoteWithTransition = (note: Note) => {
    if (note.id === selectedNote.id) return;
    
    setFadeClass('opacity-0');
    setTimeout(() => {
      setSelectedNote(note);
      setFadeClass('opacity-100');
      setIsEditing(false);
    }, 150);
  };

  const saveNote = () => {
    if (editorRef.current) {
      const updatedNote = {
        ...selectedNote,
        content: editorRef.current.innerHTML,
        modifiedAt: new Date().toISOString()
      };
      setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
      setSelectedNote(updatedNote);
    }
    setIsEditing(false);
  };

  const updateNoteTitle = (newTitle: string) => {
    const updatedNote = { ...selectedNote, title: newTitle, modifiedAt: new Date().toISOString() };
    setSelectedNote(updatedNote);
    setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
  };

  const deleteNote = (noteId: number) => {
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotes(newNotes);
    if (selectedNote.id === noteId && newNotes.length > 0) {
      selectNoteWithTransition(newNotes[0]);
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ToolbarButton: React.FC<{
    onClick: () => void;
    icon: React.ComponentType<any>;
    tooltip: string;
    isActive?: boolean;
  }> = ({ onClick, icon: Icon, tooltip, isActive = false }) => (
    <button
      onClick={onClick}
      title={tooltip}
      className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm border ${
        isActive 
          ? 'bg-blue-500/30 text-blue-300 border-blue-400/50' 
          : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border-white/20'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

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
              className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200 font-mono text-sm"
            />
          </div>
          
          {/* Add Note Button */}
          <button
            onClick={addNewNote}
            className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-500 hover:to-purple-500 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </div>
        
        {/* Notes List */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-3">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => selectNoteWithTransition(note)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedNote.id === note.id
                    ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10'
                }`}
              >
                <h3 className="text-white font-medium text-sm mb-2 truncate font-mono">{note.title}</h3>
                <p 
                  className="text-white/60 text-xs leading-relaxed line-clamp-3 mb-3 font-mono"
                  dangerouslySetInnerHTML={{ 
                    __html: note.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' 
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs font-mono">
                    {formatDate(note.modifiedAt)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
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
                onChange={(e) => updateNoteTitle(e.target.value)}
                disabled={!isEditing}
                className="text-2xl font-semibold text-white bg-transparent border-none focus:outline-none flex-1 placeholder-white/50 font-mono"
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
            
            {/* Formatting Toolbar */}
            {isEditing && (
              <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 p-1 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <ToolbarButton
                      onClick={() => formatText('bold')}
                      icon={Bold}
                      tooltip="Bold"
                    />
                    <ToolbarButton
                      onClick={() => formatText('italic')}
                      icon={Italic}
                      tooltip="Italic"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1 p-1 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <ToolbarButton
                      onClick={() => formatText('formatBlock', 'h1')}
                      icon={Type}
                      tooltip="Heading 1"
                    />
                    <ToolbarButton
                      onClick={() => formatText('formatBlock', 'h2')}
                      icon={Type}
                      tooltip="Heading 2"
                    />
                    <ToolbarButton
                      onClick={() => formatText('formatBlock', 'p')}
                      icon={Type}
                      tooltip="Paragraph"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1 p-1 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <ToolbarButton
                      onClick={() => formatText('insertUnorderedList')}
                      icon={List}
                      tooltip="Bullet List"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1 p-1 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <ToolbarButton
                      onClick={() => formatText('justifyLeft')}
                      icon={AlignLeft}
                      tooltip="Align Left"
                    />
                    <ToolbarButton
                      onClick={() => formatText('justifyCenter')}
                      icon={AlignCenter}
                      tooltip="Align Center"
                    />
                    <ToolbarButton
                      onClick={() => formatText('justifyRight')}
                      icon={AlignRight}
                      tooltip="Align Right"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1 p-1 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <ToolbarButton
                      onClick={() => formatText('undo')}
                      icon={Undo}
                      tooltip="Undo"
                    />
                    <ToolbarButton
                      onClick={() => formatText('redo')}
                      icon={Redo}
                      tooltip="Redo"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Content Editor */}
            <div className={`flex-1 p-6 transition-opacity duration-300 ${fadeClass}`}>
              <div
                ref={editorRef}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: selectedNote.content }}
                className={`w-full h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200 leading-relaxed overflow-y-auto custom-scrollbar ${
                  isEditing ? 'cursor-text' : 'cursor-default'
                }`}
                style={{ 
                  minHeight: '400px',
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                }}
                onInput={() => {
                  if (editorRef.current) {
                    const updatedNote = {
                      ...selectedNote,
                      content: editorRef.current.innerHTML,
                      modifiedAt: new Date().toISOString()
                    };
                    setSelectedNote(updatedNote);
                  }
                }}
              />
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm text-white/50 font-mono">
                <div className="flex items-center gap-4">
                  <span>Created: {formatDate(selectedNote.createdAt)}</span>
                  <span>Modified: {formatDate(selectedNote.modifiedAt)}</span>
                </div>
                <span>{selectedNote.content.replace(/<[^>]*>/g, '').length} characters</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotesApp;