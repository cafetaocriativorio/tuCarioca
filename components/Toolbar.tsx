
import React from 'react';
import type { Tool, ToolDefinition } from '../types';
import { PresetsIcon } from './icons/PresetsIcon';
import { EditObjectIcon } from './icons/EditObjectIcon';
import { FaceIcon } from './icons/FaceIcon';
import { BackgroundIcon } from './icons/BackgroundIcon';
import { UpscaleIcon } from './icons/UpscaleIcon';
import { PromptIcon } from './icons/PromptIcon';


interface ToolbarProps {
  activeTool: Tool | null;
  onSelectTool: (tool: Tool) => void;
}

const tools: ToolDefinition[] = [
  { id: 'presets', name: 'Presets', icon: PresetsIcon },
  { id: 'editObject', name: 'Objects', icon: EditObjectIcon },
  { id: 'facialMood', name: 'Faces', icon: FaceIcon },
  { id: 'background', name: 'Background', icon: BackgroundIcon },
  { id: 'upscale', name: 'Upscale', icon: UpscaleIcon },
  { id: 'prompt', name: 'Prompt', icon: PromptIcon },
];

export const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onSelectTool }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-2">
      <div className="flex justify-around items-center max-w-3xl mx-auto">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg w-20 h-20 transition-all duration-200 ${
              activeTool === tool.id ? 'bg-purple-600 text-white scale-110' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
            title={tool.name}
          >
            <tool.icon className="w-8 h-8 mb-1" />
            <span className="text-xs font-medium">{tool.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
