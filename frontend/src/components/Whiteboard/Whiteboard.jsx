import React, { useRef, useState } from "react";
import ToolBar from "../ToolBar";
import JoinRoom from "../JoinRoom";
import Canvas from "./Canvas";
import useWhiteboard from "./useWhiteboard";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  const {
    color,
    penSize,
    isEraser,
    tool,
    setColor,
    setPenSize,
    setIsEraser,
    setTool,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleJoinRoom,
    clearCanvas,
    exportCanvas,
    roomId,
    joined,
    connectedUsers,
  } = useWhiteboard(canvasRef, overlayCanvasRef);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 pb-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Collaborative Whiteboard
          </h1>
          {joined && (
            <p className="text-gray-600">
              Room:{" "}
              <span className="font-mono bg-gray-200 px-2 py-1 rounded">
                {roomId}
              </span>
            </p>
          )}
        </header>

        {!joined ? (
          <JoinRoom onJoin={handleJoinRoom} />
        ) : (
          <>
            <ToolBar
              color={color}
              setColor={setColor}
              penSize={penSize}
              setPenSize={setPenSize}
              isEraser={isEraser}
              setIsEraser={setIsEraser}
              tool={tool}
              setTool={setTool}
              onClearCanvas={clearCanvas}
              onExportCanvas={exportCanvas}
              connectedUsers={connectedUsers}
            />
            <Canvas
              canvasRef={canvasRef}
              overlayCanvasRef={overlayCanvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Whiteboard;
