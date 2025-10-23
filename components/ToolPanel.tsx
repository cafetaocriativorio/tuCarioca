
import React, { useState } from 'react';
import type { Tool } from '../types';

interface ToolPanelProps {
  tool: Tool;
  onEdit: (prompt: string, loadingText: string) => void;
  onClose: () => void;
}

const PRESETS = {
  'Vibrant Summer': 'Apply a vibrant summer preset with bright colors and high saturation.',
  'Vintage Film': 'Give the image a vintage film look with faded colors and slight grain.',
  'Dramatic B&W': 'Convert the image to a dramatic, high-contrast black and white.',
  'Urban Gritty': 'Add a gritty, urban feel with high sharpness and cool tones.',
  'Sunset Glow': 'Enhance the image with a warm, golden sunset glow.',
};

const FACIAL_MOODS = {
  'Happier': 'Make the person in the photo look slightly happier, with a natural smile.',
  'More Serious': 'Give the person in the photo a more serious, contemplative expression.',
  'Surprised': 'Subtly alter the expression to look surprised.',
};

export const ToolPanel: React.FC<ToolPanelProps> = ({ tool, onEdit, onClose }) => {
  const [prompt, setPrompt] = useState('');

  const renderContent = () => {
    switch (tool) {
      case 'presets':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Intelligent Presets</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {Object.entries(PRESETS).map(([name, prompt]) => (
                <button
                  key={name}
                  onClick={() => onEdit(prompt, `Applying ${name}...`)}
                  className="bg-gray-600 hover:bg-purple-600 p-2 rounded-lg text-sm transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        );
      case 'editObject':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Edit Objects</h3>
            <p className="text-sm text-gray-400 mb-2">Describe what to add, remove, or change. E.g., "add a cat on the sofa" or "remove the car in the background".</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Add a red balloon"
                className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button onClick={() => onEdit(prompt, 'Editing objects...')} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold">Apply</button>
            </div>
          </div>
        );
      case 'facialMood':
        return (
            <div>
              <h3 className="text-lg font-semibold mb-3">Alter Facial Mood</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(FACIAL_MOODS).map(([name, prompt]) => (
                  <button
                    key={name}
                    onClick={() => onEdit(prompt, `Changing mood to ${name}...`)}
                    className="bg-gray-600 hover:bg-purple-600 p-2 rounded-lg text-sm transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          );
      case 'background':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Background Tools</h3>
            <div className="flex space-x-2">
                <button onClick={() => onEdit('Remove the background, make it transparent', 'Removing background...')} className="flex-grow bg-gray-600 hover:bg-purple-600 px-4 py-2 rounded-md font-semibold">Remove Background</button>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe new background..."
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button onClick={() => onEdit(`Change the background to: ${prompt}`, 'Changing background...')} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold">Generate</button>
            </div>
          </div>
        );
      case 'upscale':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-3">Super Resolution</h3>
            <p className="text-sm text-gray-400 mb-3">Enhance image quality and details. This may take a moment.</p>
            <button onClick={() => onEdit('Upscale this image, enhance the details and resolution to 4K', 'Upscaling to 4K...')} className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold">Enhance to 4K</button>
          </div>
        );
      case 'prompt':
        return (
            <div>
              <h3 className="text-lg font-semibold mb-3">Freeform Prompt</h3>
              <p className="text-sm text-gray-400 mb-2">Describe any change you want to make to the image.</p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Make the sky more blue and add clouds"
                  className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button onClick={() => onEdit(prompt, 'Applying your prompt...')} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-semibold">Generate</button>
              </div>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm p-4 border-t-2 border-purple-500/50">
       <div className="max-w-3xl mx-auto relative">
         <button onClick={onClose} className="absolute -top-1 -right-1 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
         </button>
         {renderContent()}
       </div>
    </div>
  );
};
