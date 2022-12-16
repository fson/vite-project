import { CSSProperties, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Node,
  SnapGrid,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import { CommentsPopover } from "./CommentsPopover";
import { ClockIcon, EllipsisIcon } from "./icons";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: {
      label: (
        <>
          Welcome to <strong>React Flow!</strong>
        </>
      ),
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: {
      label: (
        <>
          This is a default node.
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: {
      label: (
        <>
          This one has a <strong>custom style</strong>
        </>
      ),
    },
    position: { x: 400, y: 100 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 180,
    },
  },
  {
    id: "4",
    position: { x: 250, y: 200 },
    data: {
      label: (
        <>
          You can find the docs on{" "}
          <a
            href="https://github.com/wbkd/react-flow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </>
      ),
    },
  },
  {
    id: "5",
    data: {
      label: (
        <>
          Or check out the other <strong>examples</strong>
        </>
      ),
    },
    position: { x: 250, y: 325 },
  },
  {
    id: "6",
    type: "output",
    data: {
      label: (
        <>
          An <strong>output node (not deletable)</strong>
        </>
      ),
    },
    position: { x: 100, y: 480 },
    deletable: false,
  },
  {
    id: "7",
    type: "output",
    data: { label: "Another output node" },
    position: { x: 400, y: 450 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", label: "this is an edge label" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e4-5", source: "4", target: "5", label: "edge with arrow head" },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    deletable: false,
    label: "smooth step edge (not deletable)",
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    type: "step",
    style: { stroke: "#f6ab6c" },
    label: "a step edge",
    animated: true,
    labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
  },
];

const connectionLineStyle: CSSProperties = { stroke: "#ddd" };
const snapGrid: SnapGrid = [25, 25];

export const Flow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      attributionPosition="bottom-right"
      maxZoom={Infinity}
    >
      <Controls
        position="bottom-center"
        showInteractive={false}
        style={{
          display: "flex",
        }}
      />
      <Background color="#aaa" gap={25} />
      <Menu />
    </ReactFlow>
  );
};

function Menu() {
  return (
    <div className="z-10 absolute top-4 right-4 flex">
      <CommentsPopover />

      <button
        disabled
        type="button"
        className="font-medium text-sm flex justify-center items-center space-x-1 focus:outline-none shadow-none bg-white border-gray-200 border-y px-0 w-8 h-8"
      >
        <ClockIcon />
      </button>
      <button
        disabled
        type="button"
        className="font-medium text-sm flex justify-center items-center space-x-1 focus:outline-none shadow-none bg-white border-gray-200 border px-0 rounded-r-lg w-8 h-8"
      >
        <EllipsisIcon />
      </button>
    </div>
  );
}
