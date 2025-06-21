import React, { useState, useEffect, useRef } from "react";
import {  Eraser, Download, Trash2, Users, Pencil, Circle, Square, ArrowRight} from "lucide-react";



const ToolBar = ({
  color,
  setColor,
  penSize,
  setPenSize,
  
  setIsEraser,
  tool,
  setTool,
  onClearCanvas,
  onExportCanvas,
  connectedUsers
}) => {
  const tools = [
    { id: 'pen', icon: Pencil, label: 'Pen' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'square', icon: Square, label: 'Rectangle' },
    { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
   
  ];

  const presetColors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl">
          {tools.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setTool(id);
                setIsEraser(id === 'eraser');
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                tool === id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              }`}
              title={label}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-2 bg-gray-50 rounded-xl flex-wrap">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                  color === presetColor ? 'border-gray-800 scale-110' : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: presetColor }}
              />
            ))}
          </div>
          <input
            value={color}
            onChange={(e) => setColor(e.target.value)}
            type="color"
            className="w-12 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
            title="Custom Color"
          />
        </div>

        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
          <span className="text-sm font-medium text-gray-700">Size:</span>
          <input
            min="1"
            max="50"
            value={penSize}
            onChange={(e) => setPenSize(e.target.value)}
            type="range"
            className="w-20 accent-blue-500"
          />
          <span className="text-sm font-medium text-gray-700 w-8">{penSize}px</span>
        </div>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
            <Users size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-700">{connectedUsers} online</span>
          </div>
          
          <button
            onClick={onExportCanvas}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Download size={16} />
            Export
          </button>
          
          <button
            onClick={onClearCanvas}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
export default ToolBar;