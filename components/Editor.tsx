
import React, { useState } from 'react';
import type { Tool } from '../types';
import { Toolbar } from './Toolbar';
import { ToolPanel } from './ToolPanel';
import { UndoIcon } from './icons/UndoIcon';
import { ResetIcon } from './icons/ResetIcon';

interface EditorProps {
  image: string;
  onEdit: (prompt: string, loadingText: string) => void;
  onUndo: () => void;
  onReset: () => void;
  canUndo: boolean;
}

export const Editor: React.FC<EditorProps> = ({ image, onEdit, onUndo, onReset, canUndo }) => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleToolSelect = (tool: Tool) => {
    setActiveTool(tool === activeTool ? null : tool);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      <header className="flex-shrink-0 bg-gray-800/50 p-2 flex justify-between items-center z-20">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">ImageCraft AI</h1>
        <div className="flex items-center space-x-2">
            <button 
                onClick={onUndo} 
                disabled={!canUndo}
                className="p-2 rounded-full bg-gray-700 hover:bg-purple-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                title="Undo"
            >
                <UndoIcon className="w-5 h-5" />
            </button>
            <button 
                onClick={onReset}
                className="p-2 rounded-full bg-gray-700 hover:bg-purple-600 transition-colors"
                title="Reset to Original"
            >
                <ResetIcon className="w-5 h-5" />
            </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
            <img src={image} alt="Editable content" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"/>
        </div>
      </main>

      <footer className="flex-shrink-0 z-20">
        {activeTool && <ToolPanel tool={activeTool} onEdit={onEdit} onClose={() => setActiveTool(null)} />}
        <Toolbar activeTool={activeTool} onSelectTool={handleToolSelect} />
      </footer>
    </div>
  );
};
