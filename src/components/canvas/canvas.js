import React, { useState } from 'react';
import { TwitterPicker } from 'react-color'
import {useSelector, useDispatch } from 'react-redux';

import './canvas.css'

import { Stage, Layer, Line, Text } from 'react-konva';

import { socketRef } from '../socket/socket';

function Canvas() {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [colorPen, setColorPen] = useState("#000000");
  const isDrawing = React.useRef(false);
  const [shardDraw, setShardDraw] = useState();
  var lastLine;
  const name=useSelector((state)=>state.member.name)
   

  socketRef.on("drawingListener",(lines)=>{
    setLines(lines)
    console.log(lines,"lineson");
    })

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    console.log("pos",pos);
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
      console.log
      ("dawn")
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    console.log(stage, 's')
    const point = stage.getPointerPosition();
    console.log(point, 'p')

    lastLine = lines[lines.length - 1];
    lastLine.color = colorPen;
    lastLine.name=name;
    console.log(lastLine, 'll')

    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setShardDraw(lastLine.points)
    console.log("sendDraw");
    socketRef.emit("sendDraw", lines)
    
    // event
    console.log(lastLine.points, 'emit')

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    console.log(lines, 'lines');
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

 const handleChangeComplete = (color) => {
   console.log("ccc", color.hex)
    setColorPen(color.hex);
  };

  return (
    <div>
      <Stage 
      className="stage_canvas"
        width={120}
        height={200}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      {/* <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select> */}
      <TwitterPicker className="picker_canvas" 
       color={ colorPen }
       onChangeComplete={ handleChangeComplete }/>
    </div>
  );
};

export default Canvas