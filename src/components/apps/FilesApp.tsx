import React, { useState } from 'react';
import { Folder, File, Image, Music, Video, ChevronRight, Home, Star, Clock, Trash2, Search, Grid3X3, List, FolderOpen } from 'lucide-react';

const FilesApp: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const files = [
    { name: 'Documents', type: 'folder', size: '-', modified: '2024-01-15', icon: Folder, color: 'text-blue-400' },
    { name: 'Pictures', type: 'folder', size: '-', modified: '2024-01-14', icon: Folder, color: 'text-green-400' },
    { name: 'Music', type: 'folder', size: '-', modified: '2024-01-13', icon: Folder, color: 'text-purple-400' },
    { name: 'Downloads', type: 'folder', size: '-', modified: '2024-01-12', icon: Folder, color: 'text-orange-400' },
    { name: 'FalakOS_Guide.pdf', type: 'file', size: '2.3 MB', modified: '2024-01-15', icon: File, color: 'text-red-400' },
    { name: 'Screenshot_2024.png', type: 'image', size: '1.8 MB', modified: '2024-01-14', icon: Image, color: 'text-cyan-400' },
    { name: 'Synthwave_Mix.mp3', type: 'audio', size: '4.2 MB', modified: '2024-01-13', icon: Music, color: 'text-pink-400' },
    { name: 'Demo_Video.mp4', type: 'video', size: '25.6 MB', modified: '2024-01-12', icon: Video, color: 'text-yellow-400' },
  ];

  const sidebarItems = [
    { name: 'Home', icon: Home, color: 'text-blue-400', path: '/' },
    { name: 'Favorites', icon: Star, color: 'text-yellow-400', path: '/favorites' },
    { name: 'Recent', icon: Clock, color: 'text-green-400', path: '/recent' },
    { name: 'Trash', icon: Trash2, color: 'text-red-400', path: '/trash' },
  ];

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (size: string) => {
    if (size === '-') return size;
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
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => setCurrentPath(item.path)}
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
              {['Documents', 'Pictures', 'Downloads'].map((folder) => (
                <button
                  key={folder}
                  className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                >
                  <Folder className="w-4 h-4 text-white/50" />
                  <span className="text-white/70 text-sm">{folder}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/60">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{currentPath === '/' ? 'Home' : currentPath}</span>
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
                className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200 w-64"
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
        <div className="flex-1 p-6 overflow-y-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-6 gap-4">
              {filteredFiles.map((file, index) => {
                const Icon = file.icon;
                const isSelected = selectedItem === file.name;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(file.name)}
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
                      <div className="text-white text-sm font-medium truncate w-full mb-1">
                        {file.name}
                      </div>
                      <div className="text-white/50 text-xs">
                        {formatFileSize(file.size)}
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
                      <div className="text-white font-medium truncate">{file.name}</div>
                      <div className="text-white/50 text-sm">{formatDate(file.modified)}</div>
                    </div>
                    <div className="text-white/60 text-sm font-mono">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-white/60 text-sm">
            {filteredFiles.length} items
          </span>
          {selectedItem && (
            <span className="text-white/60 text-sm">
              Selected: {selectedItem}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilesApp;