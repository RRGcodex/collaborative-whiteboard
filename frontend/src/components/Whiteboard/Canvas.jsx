import React from "react";

const Canvas = ({
  canvasRef,
  overlayCanvasRef,
  onMouseDown,
  onMouseMove,
  onMouseUp
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-[600px] cursor-crosshair"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      />
      <canvas
        ref={overlayCanvasRef}
        className="absolute inset-0 w-full h-[600px] cursor-crosshair pointer-events-none"
      />
      <div className="w-full h-[600px]" />
    </div>
  );
};

export default Canvas;
