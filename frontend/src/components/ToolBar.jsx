import React, { useRef } from "react";
import {
  Eraser,
  Download,
  X,
  Users,
  Pencil,
  Circle,
  Square,
  ArrowRight,
} from "lucide-react";

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
  connectedUsers,
}) => {
  const tools = [
    { id: "pen", icon: Pencil, label: "Pen" },
    { id: "eraser", icon: Eraser, label: "Eraser" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "square", icon: Square, label: "Rectangle" },
    { id: "arrow", icon: ArrowRight, label: "Arrow" },
  ];

  const presetColors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
  ];

  const colorInputRef = useRef(null);

  return (
    <div className="bg-blue-100 backdrop-blur-xl bg-opacity-70 rounded-xl shadow-lg p-4 inset-x-0 fixed top-0 z-50">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-5 xl:grid-cols-10 gap-1 bg-white rounded-full p-2 shadow-sm">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => setColor(presetColor)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 transition-all duration-200 ${
                  color === presetColor
                    ? "border-gray-800 scale-110"
                    : "border-gray-300 hover:scale-105"
                }`}
                style={{ backgroundColor: presetColor }}
                title={presetColor}
              />
            ))}
          </div>

          <div
            onClick={() => colorInputRef.current.click()}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
            style={{
              background:
                "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
            }}
            title="Pick custom color"
          ></div>

          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="hidden"
          />
        </div>

        <div className="flex items-center gap-2 p-2 bg-white rounded-xl shadow-sm">
          {tools.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setTool(id);
                setIsEraser(id === "eraser");
              }}
              className={`p-2 rounded-lg transition-all duration-200 tooltip ${
                tool === id
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
              title={label}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-white rounded-xl shadow-sm flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 font-medium">Size:</span>
            <input
              min="1"
              max="50"
              value={penSize}
              onChange={(e) => setPenSize(e.target.value)}
              type="range"
              className="w-24 accent-blue-600"
            />
            <span className="text-sm font-semibold text-gray-800 w-8">
              {penSize}px
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCanvas}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              <Download size={16} />
              Download
            </button>
            <button
              onClick={onClearCanvas}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
            >
              <X size={16} />
              Clear
            </button>
          </div>
        </div>

        <div className="ml-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-xl shadow-sm text-green-800">
            <Users size={16} />
            <span className="text-sm font-medium">
              {connectedUsers} online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
