import React, { useEffect, useRef, useState } from "react";
import { BaseWindow, BaseWindowProps } from "./BaseWindow";
import { useWindow } from "@rees/hooks";

interface Props
  extends Omit<
    BaseWindowProps,
    | "children"
    | "title"
    | "iconPath"
    | "minWidth"
    | "minHeight"
    | "width"
    | "height"
    | "top"
    | "left"
    | "setWidth"
    | "setHeight"
    | "setTop"
    | "setLeft"
  > {}

const WIDTH = 800;
const HEIGHT = 600;
const TOOLBAR_HEIGHT = 40;

type Tool = "freehand" | "rectangle" | "circle" | "bucket";

export function PaintWindow(props: Props) {
  const windowPosition = useWindow({
    initWidth: WIDTH + 20,
    initHeight: HEIGHT + TOOLBAR_HEIGHT + 100,
    initTop: 300,
    initLeft: 275,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<Tool>("freehand");
  const [painting, setPainting] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Start drawing (initialize freehand or shapes)
  const startPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setPainting(true);
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    setStartX(x); // Update startX to current mouse position
    setStartY(y); // Update startY to current mouse position

    if (tool === "freehand") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(x, y); // Use the current position to start the drawing
    }
  };

  // End drawing (finalize shape or freehand)
  const endPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!painting) return;
    setPainting(false);

    if (tool !== "freehand" && tool !== "bucket") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const endX = e.nativeEvent.offsetX;
      const endY = e.nativeEvent.offsetY;

      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;

      // Draw the shapes
      if (tool === "rectangle") {
        const width = endX - startX;
        const height = endY - startY;
        ctx.strokeRect(startX, startY, width, height);
        //ctx.fillStyle = color; // Fill the rectangle
        ctx.fillRect(startX, startY, width, height);
      } else if (tool === "circle") {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = color; // Fill the circle
        ctx.fill();
      }
    }
  };

  // Draw freehand as the mouse moves
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!painting || tool !== "freehand") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    if (x <= 0 || x >= WIDTH || y <= 0 || y >= HEIGHT) {
      setPainting(false);
      return;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.lineTo(x, y); // Draw the freehand line
    ctx.stroke();
  };

  // Flood fill algorithm to fill color inside clicked region
  const fillBucket = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const startColor = getColorAtPixel(x, y, pixels);

    if (startColor === color) return; // Skip if clicked on a pixel with the same color

    floodFill(x, y, startColor, color, pixels, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
  };

  // Helper function to get color at a pixel
  const getColorAtPixel = (x: number, y: number, pixels: Uint8ClampedArray) => {
    const index = (y * WIDTH + x) * 4;
    return `rgb(${pixels[index]}, ${pixels[index + 1]}, ${pixels[index + 2]})`;
  };

  // Flood fill algorithm with boundary checks
  const floodFill = (
    x: number,
    y: number,
    startColor: string,
    targetColor: string,
    pixels: Uint8ClampedArray,
    width: number,
    height: number
  ) => {
    const stack = [[x, y]];
    const targetR = parseInt(targetColor.slice(1, 3), 16);
    const targetG = parseInt(targetColor.slice(3, 5), 16);
    const targetB = parseInt(targetColor.slice(5, 7), 16);

    while (stack.length > 0) {
      const [currentX, currentY] = stack.pop()!;

      // Skip if out of bounds or pixel is not the start color
      if (currentX < 0 || currentY < 0 || currentX >= width || currentY >= height) {
        continue;
      }

      const index = (currentY * width + currentX) * 4;
      const pixelColor = getColorAtPixel(currentX, currentY, pixels);
      if (pixelColor !== startColor) continue;

      // Set the pixel to the target color
      pixels[index] = targetR;
      pixels[index + 1] = targetG;
      pixels[index + 2] = targetB;
      pixels[index + 3] = 255; // Set alpha to fully opaque

      // Push neighboring pixels onto the stack
      stack.push([currentX - 1, currentY]); // Left
      stack.push([currentX + 1, currentY]); // Right
      stack.push([currentX, currentY - 1]); // Up
      stack.push([currentX, currentY + 1]); // Down
    }
  };

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <BaseWindow
      {...props}
      {...windowPosition}
      title="MS Paint"
      iconPath="/icons/paint.png"
      minWidth={WIDTH + 20}
      minHeight={HEIGHT + TOOLBAR_HEIGHT + 10}
    >
      <div className="w-full h-full flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-2 bg-gray-300 p-2 w-full h-[40px]">
          <label>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="ml-2"
            />
          </label>
          <label>
            Brush Size:
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
              className="ml-2"
            />
          </label>
          <button
            onClick={clearCanvas}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Clear
          </button>
          <label>
            Tool:
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value as Tool)}
              className="ml-2"
            >
              <option value="freehand">Freehand</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="bucket">Bucket</option>
            </select>
          </label>
        </div>

        {/* Canvas Container */}
        <div className="flex-grow w-full flex justify-center items-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className="border border-black bg-white"
            width={WIDTH}
            height={HEIGHT}
            onMouseDown={startPosition}
            onMouseUp={endPosition}
            onMouseLeave={endPosition}
            onMouseMove={draw}
            onClick={tool === "bucket" ? fillBucket : undefined}
            style={{
              width: "100%",
              height: "100%",
              maxHeight: `calc(100% - ${TOOLBAR_HEIGHT}px)`,
              display: "block",
            }}
          />
        </div>
      </div>
    </BaseWindow>
  );
}
