import React, { useState } from 'react';
import { Folder, File, Image, Music, Video, ChevronRight, Home, Star, Clock, Trash2, Search, Grid3X3, List, FolderOpen, FileText, Play, Eye, ArrowLeft } from 'lucide-react';
import { useWindows } from '../../context/WindowContext';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  extension?: string;
  size?: string;
  modified: string;
  icon: React.ComponentType<any>;
  color: string;
  children?: FileItem[];
  content?: string;
}

const FilesApp: React.FC = () => {
  const { openWindow } = useWindows();
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock file system structure
  const fileSystem: { [key: string]: FileItem[] } = {
    'Home': [
      {
        name: 'Documents',
        type: 'folder',
        modified: '2024-01-15',
        icon: Folder,
        color: 'text-blue-400',
        children: []
      },
      {
        name: 'Pictures',
        type: 'folder',
        modified: '2024-01-14',
        icon: Folder,
        color: 'text-green-400',
        children: []
      },
      {
        name: 'Music',
        type: 'folder',
        modified: '2024-01-13',
        icon: Folder,
        color: 'text-purple-400',
        children: []
      },
      {
        name: 'Apps',
        type: 'folder',
        modified: '2024-01-12',
        icon: Folder,
        color: 'text-orange-400',
        children: []
      },
      {
        name: 'FalakOS_Guide.txt',
        type: 'file',
        extension: 'txt',
        size: '2.3 KB',
        modified: '2024-01-15',
        icon: FileText,
        color: 'text-cyan-400',
        content: 'Welcome to FalakOS!\n\nThis is your futuristic operating system with beautiful glassmorphism effects and smooth animations.\n\nFeatures:\n- Drag and drop windows\n- Multiple themes\n- Interactive file system\n- Modern applications\n\nEnjoy exploring your new digital environment!'
      },
      {
        name: 'System_Info.txt',
        type: 'file',
        extension: 'txt',
        size: '1.1 KB',
        modified: '2024-01-14',
        icon: FileText,
        color: 'text-cyan-400',
        content: 'FalakOS System Information\n\nVersion: 2.1.3\nBuild: 20240115\nArchitecture: WebOS\nTheme Engine: Glassmorphism v2\nWindow Manager: Advanced\n\nSystem Status: Optimal\nMemory Usage: 45%\nStorage: 2.1TB Available'
      }
    ],
    'Documents': [
      {
        name: 'Projects',
        type: 'folder',
        modified: '2024-01-15',
        icon: Folder,
        color: 'text-blue-400',
        children: []
      },
      {
        name: 'Notes',
        type: 'folder',
        modified: '2024-01-14',
        icon: Folder,
        color: 'text-green-400',
        children: []
      },
      {
        name: 'Meeting_Notes.txt',
        type: 'file',
        extension: 'txt',
        size: '3.2 KB',
        modified: '2024-01-15',
        icon: FileText,
        color: 'text-cyan-400',
        content: 'Meeting Notes - January 15, 2024\n\nAttendees: Team Alpha\nTopic: FalakOS Development\n\nKey Points:\n- UI improvements completed\n- File system integration successful\n- Next phase: Advanced applications\n- Timeline: Q1 2024\n\nAction Items:\n- Finalize theme system\n- Test window management\n- Prepare demo presentation'
      },
      {
        name: 'Todo_List.txt',
        type: 'file',
        extension: 'txt',
        size: '1.8 KB',
        modified: '2024-01-14',
        icon: FileText,
        color: 'text-cyan-400',
        content: 'FalakOS Development Todo\n\n✓ Implement window system\n✓ Create file explorer\n✓ Add theme switching\n✓ Design glassmorphism UI\n\n⏳ In Progress:\n- Music player app\n- Image viewer app\n- Advanced notifications\n\n📋 Upcoming:\n- Video player\n- Code editor\n- System settings\n- App store'
      },
      {
        name: 'Budget_2024.txt',
        type: 'file',
        extension: 'txt',
        size: '2.1 KB',
        modified: '2024-01-13',
        icon: FileText,
        color: 'text-cyan-400',
        content: 'Annual Budget 2024\n\nDevelopment Costs:\n- UI/UX Design: $15,000\n- Frontend Development: $25,000\n- Testing & QA: $8,000\n- Documentation: $3,000\n\nTotal Estimated: $51,000\n\nQuarterly Breakdown:\nQ1: $20,000 (UI Foundation)\nQ2: $15,000 (Core Features)\nQ3: $10,000 (Advanced Apps)\nQ4: $6,000 (Polish & Launch)'
      }
    ],
    'Pictures': [
      {
        name: 'Screenshots',
        type: 'folder',
        modified: '2024-01-15',
        icon: Folder,
        color: 'text-blue-400',
        children: []
      },
      {
        name: 'Wallpapers',
        type: 'folder',
        modified: '2024-01-14',
        icon: Folder,
        color: 'text-purple-400',
        children: []
      },
      {
        name: 'FalakOS_Screenshot.jpg',
        type: 'file',
        extension: 'jpg',
        size: '1.8 MB',
        modified: '2024-01-15',
        icon: Image,
        color: 'text-pink-400'
      },
      {
        name: 'Desktop_Wallpaper.jpg',
        type: 'file',
        extension: 'jpg',
        size: '3.2 MB',
        modified: '2024-01-14',
        icon: Image,
        color: 'text-pink-400'
      },
      {
        name: 'UI_Mockup.jpg',
        type: 'file',
        extension: 'jpg',
        size: '2.1 MB',
        modified: '2024-01-13',
        icon: Image,
        color: 'text-pink-400'
      },
      {
        name: 'Logo_Design.jpg',
        type: 'file',
        extension: 'jpg',
        size: '856 KB',
        modified: '2024-01-12',
        icon: Image,
        color: 'text-pink-400'
      }
    ],
    'Music': [
      {
        name: 'Synthwave',
        type: 'folder',
        modified: '2024-01-15',
        icon: Folder,
        color: 'text-purple-400',
        children: []
      },
      {
        name: 'Ambient',
        type: 'folder',
        modified: '2024-01-14',
        icon: Folder,
        color: 'text-blue-400',
        children: []
      },
      {
        name: 'Cyberpunk_Dreams.mp3',
        type: 'file',
        extension: 'mp3',
        size: '4.2 MB',
        modified: '2024-01-15',
        icon: Music,
        color: 'text-purple-400'
      },
      {
        name: 'Neon_Nights.mp3',
        type: 'file',
        extension: 'mp3',
        size: '3.8 MB',
        modified: '2024-01-14',
        icon: Music,
        color: 'text-purple-400'
      },
      {
        name: 'Digital_Horizon.mp3',
        type: 'file',
        extension: 'mp3',
        size: '5.1 MB',
        modified: '2024-01-13',
        icon: Music,
        color: 'text-purple-400'
      },
      {
        name: 'Future_Bass.mp3',
        type: 'file',
        extension: 'mp3',
        size: '4.7 MB',
        modified: '2024-01-12',
        icon: Music,
        color: 'text-purple-400'
      }
    ],
    'Apps': [
      {
        name: 'System',
        type: 'folder',
        modified: '2024-01-15',
        icon: Folder,
        color: 'text-red-400',
        children: []
      },
      {
        name: 'Utilities',
        type: 'folder',
        modified: '2024-01-14',
        icon: Folder,
        color: 'text-green-400',
        children: []
      },
      {
        name: 'Calculator.app',
        type: 'file',
        extension: 'app',
        size: '2.1 MB',
        modified: '2024-01-15',
        icon: File,
        color: 'text-blue-400'
      },
      {
        name: 'Notes.app',
        type: 'file',
        extension: 'app',
        size: '3.4 MB',
        modified: '2024-01-14',
        icon: File,
        color: 'text-yellow-400'
      },
      {
        name: 'Files.app',
        type: 'file',
        extension: 'app',
        size: '4.2 MB',
        modified: '2024-01-13',
        icon: File,
        color: 'text-green-400'
      }
    ]
  };

  const getCurrentFiles = (): FileItem[] => {
    const pathKey = currentPath[currentPath.length - 1];
    return fileSystem[pathKey] || [];
  };

  const filteredFiles = getCurrentFiles().filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToFolder = (folderName: string) => {
    if (fileSystem[folderName]) {
      setCurrentPath([...currentPath, folderName]);
      setSelectedItem(null);
      setSearchTerm('');
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const navigateToBreadcrumb = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
    setSelectedItem(null);
  };

  const handleDoubleClick = (file: FileItem) => {
    if (file.type === 'folder') {
      navigateToFolder(file.name);
    } else {
      // Open appropriate app based on file extension
      switch (file.extension) {
        case 'txt':
          openWindow(`text-viewer-${Date.now()}`, `Text Viewer - ${file.name}`, 
            <TextViewerApp fileName={file.name} content={file.content || 'File content not available.'} />
          );
          break;
        case 'jpg':
        case 'png':
        case 'gif':
          openWindow(`image-viewer-${Date.now()}`, `Image Viewer - ${file.name}`, 
            <ImageViewerApp fileName={file.name} />
          );
          break;
        case 'mp3':
        case 'wav':
        case 'flac':
          openWindow(`music-player-${Date.now()}`, `Music Player - ${file.name}`, 
            <MusicPlayerApp fileName={file.name} />
          );
          break;
        default:
          openWindow(`file-viewer-${Date.now()}`, `File Viewer - ${file.name}`, 
            <div className="p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">File: {file.name}</h2>
              <p>File type not supported for preview.</p>
            </div>
          );
      }
    }
  };

  const sidebarItems = [
    { name: 'Home', icon: Home, color: 'text-blue-400', path: 'Home' },
    { name: 'Documents', icon: FileText, color: 'text-cyan-400', path: 'Documents' },
    { name: 'Pictures', icon: Image, color: 'text-pink-400', path: 'Pictures' },
    { name: 'Music', icon: Music, color: 'text-purple-400', path: 'Music' },
    { name: 'Apps', icon: Folder, color: 'text-orange-400', path: 'Apps' },
  ];

  const quickAccessItems = [
    { name: 'Recent', icon: Clock, color: 'text-green-400' },
    { name: 'Favorites', icon: Star, color: 'text-yellow-400' },
    { name: 'Trash', icon: Trash2, color: 'text-red-400' },
  ];

  const formatFileSize = (size: string) => {
    if (!size || size === '-') return '-';
    return size;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="h-full flex bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-white">Files</h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 flex-1">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath[currentPath.length - 1] === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentPath([item.path]);
                    setSelectedItem(null);
                    setSearchTerm('');
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 hover:scale-105 ${
                    isActive
                      ? 'bg-white/20 backdrop-blur-sm border border-white/30'
                      : 'hover:bg-white/10 backdrop-blur-sm border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-white font-medium text-sm">{item.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wider">Quick Access</h3>
            <div className="space-y-2">
              {quickAccessItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-white/70 text-sm">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            {currentPath.length > 1 && (
              <button
                onClick={navigateBack}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
            )}
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-white/60 font-mono text-sm">
              {currentPath.map((path, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight className="w-4 h-4" />}
                  <button
                    onClick={() => navigateToBreadcrumb(index)}
                    className={`hover:text-white transition-colors ${
                      index === currentPath.length - 1 ? 'text-white font-medium' : 'hover:underline'
                    }`}
                  >
                    {path}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200 w-64 font-mono text-sm"
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* File Content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FolderOpen className="w-16 h-16 text-white/20 mb-4" />
              <h3 className="text-white/60 text-lg font-medium mb-2">
                {searchTerm ? 'No files found' : 'Empty folder'}
              </h3>
              <p className="text-white/40 text-sm">
                {searchTerm ? `No files match "${searchTerm}"` : 'This folder is empty'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-6 gap-4">
              {filteredFiles.map((file, index) => {
                const Icon = file.icon;
                const isSelected = selectedItem === file.name;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(file.name)}
                    onDoubleClick={() => handleDoubleClick(file)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected
                        ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-white/10 rounded-2xl mb-3 backdrop-blur-sm">
                        <Icon className={`w-8 h-8 ${file.color}`} />
                      </div>
                      <div className="text-white text-sm font-medium truncate w-full mb-1 font-mono">
                        {file.name}
                      </div>
                      <div className="text-white/50 text-xs font-mono">
                        {formatFileSize(file.size || '-')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file, index) => {
                const Icon = file.icon;
                const isSelected = selectedItem === file.name;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(file.name)}
                    onDoubleClick={() => handleDoubleClick(file)}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected
                        ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10'
                    }`}
                  >
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Icon className={`w-5 h-5 ${file.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate font-mono">{file.name}</div>
                      <div className="text-white/50 text-sm font-mono">{formatDate(file.modified)}</div>
                    </div>
                    <div className="text-white/60 text-sm font-mono">
                      {formatFileSize(file.size || '-')}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-white/60 text-sm font-mono">
            {filteredFiles.length} items
          </span>
          {selectedItem && (
            <span className="text-white/60 text-sm font-mono">
              Selected: {selectedItem}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Text Viewer App Component
const TextViewerApp: React.FC<{ fileName: string; content: string }> = ({ fileName, content }) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl">
      <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl backdrop-blur-sm">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Text Viewer</h1>
            <p className="text-white/60 text-sm font-mono">{fileName}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <pre className="text-white font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Image Viewer App Component
const ImageViewerApp: React.FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl">
      <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Image Viewer</h1>
            <p className="text-white/60 text-sm font-mono">{fileName}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
          <Image className="w-24 h-24 text-white/40 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">Image Preview</h3>
          <p className="text-white/60 text-sm font-mono mb-4">{fileName}</p>
          <p className="text-white/40 text-xs">Image preview not available in demo mode</p>
        </div>
      </div>
    </div>
  );
};

// Music Player App Component
const MusicPlayerApp: React.FC<{ fileName: string }> = ({ fileName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutes demo

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl">
      <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl backdrop-blur-sm">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Music Player</h1>
            <p className="text-white/60 text-sm font-mono">{fileName}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 text-center max-w-md w-full">
          {/* Album Art Placeholder */}
          <div className="w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Music className="w-16 h-16 text-white/40" />
          </div>
          
          {/* Track Info */}
          <h3 className="text-white text-xl font-semibold mb-2">{fileName.replace('.mp3', '')}</h3>
          <p className="text-white/60 text-sm mb-6">Unknown Artist</p>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-white/60 text-xs font-mono">
              <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
              <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-2xl transition-all duration-200 hover:scale-110 shadow-lg"
            >
              {isPlaying ? (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </button>
            
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesApp;