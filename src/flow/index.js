/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  updateEdge,
} from "react-flow-renderer";

import initialElements from "./initialElems";
import EmailNode from "./nodeTypes/EmailNode";
import MeetingNode from "./nodeTypes/MeetingNode";
import ReminderNode from "./nodeTypes/ReminderNode";

const onLoad = (reactFlowInstance) => {
  console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const OverviewFlow = () => {
  const [elements, setElements] = useState();

  useEffect(() => {
    setElements(initialElements);
  }, []);

  const nodeTypes = {
    emailNode: EmailNode,
    meetingNode: MeetingNode,
    reminderNode: ReminderNode,
  };

  const connectionLineStyle = { animated: true, stroke: "#FB3606 " };

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  const onNodeDragStop = (event, node) => console.log("drag stop", node);
  const onElementClick = (event, element) => console.log("click", element);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      connectionLineStyle={connectionLineStyle}
      onConnect={onConnect}
      onLoad={onLoad}
      onEdgeUpdate={onEdgeUpdate}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      snapGrid={[15, 15]}
      onNodeDragStop={onNodeDragStop}
      onElementClick={onElementClick}
      defaultZoom={0.9}
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === "input") return "#0041d0";
          if (n.type === "output") return "#ff0072";
          if (n.type === "default") return "#1a192b";

          return "#eee";
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return "#fff";
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
