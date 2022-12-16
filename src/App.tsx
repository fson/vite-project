import {
  CollabkitProvider,
  CustomTheme,
  Inbox,
  ThemeProvider,
  useUnreadThreadsCount,
} from "@collabkit/react";
import * as Popover from "@radix-ui/react-popover";
import {
  MouseEvent as ReactMouseEvent,
  CSSProperties,
  useCallback,
} from "react";
import ReactFlow, {
  addEdge,
  Node,
  Viewport,
  SnapGrid,
  Connection,
  Edge,
  ReactFlowInstance,
  useNodesState,
  useEdgesState,
  OnSelectionChangeParams,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import { MessageIcon, ClockIcon, EllipsisIcon } from "./icons";

const theme: CustomTheme = {
  color: {
    background: "hsl(0, 0%, 100%)",
    surface: "rgb(247 247 248)",
    surfaceOverlay: "rgba(0, 0, 0, 0.08)",
    textPrimary: "#071324",
    textSecondary: "#63676D",
    textDisabled: "rgb(99, 103, 109)",
    textLink: "#0180FE",
    border: "rgb(239, 240, 241)",
    icon: "rgb(162, 166, 172)",
    attention: "#0180FE",
  },
  inbox: {
    width: "320px",
    item: {
      borderBottom: "1px solid #EFF0F1",
      hover: {
        background: "#F7F7F8",
      },
    },
  },
};

const log = (...args: any[]) => {
  // console.log(...args);
};

const onNodeDragStart = (_: ReactMouseEvent, node: Node, nodes: Node[]) =>
  log("drag start", node, nodes);
const onNodeDrag = (_: ReactMouseEvent, node: Node, nodes: Node[]) =>
  log("drag", node, nodes);
const onNodeDragStop = (_: ReactMouseEvent, node: Node, nodes: Node[]) =>
  log("drag stop", node, nodes);
const onNodeDoubleClick = (_: ReactMouseEvent, node: Node) =>
  log("node double click", node);
const onPaneClick = (event: ReactMouseEvent) => log("pane click", event);
const onPaneScroll = (event?: ReactMouseEvent) => log("pane scroll", event);
const onPaneContextMenu = (event: ReactMouseEvent) =>
  log("pane context menu", event);
const onSelectionDrag = (_: ReactMouseEvent, nodes: Node[]) =>
  log("selection drag", nodes);
const onSelectionDragStart = (_: ReactMouseEvent, nodes: Node[]) =>
  log("selection drag start", nodes);
const onSelectionDragStop = (_: ReactMouseEvent, nodes: Node[]) =>
  log("selection drag stop", nodes);
const onSelectionContextMenu = (event: ReactMouseEvent, nodes: Node[]) => {
  event.preventDefault();
  log("selection context menu", nodes);
};
const onNodeClick = (_: ReactMouseEvent, node: Node) =>
  log("node click:", node);

const onSelectionChange = ({ nodes, edges }: OnSelectionChangeParams) =>
  log("selection change", nodes, edges);
const onInit = (reactFlowInstance: ReactFlowInstance) => {
  log("pane ready:", reactFlowInstance);
};

const onMoveStart = (_: MouseEvent | TouchEvent, viewport: Viewport) =>
  log("zoom/move start", viewport);
const onMoveEnd = (_: MouseEvent | TouchEvent, viewport: Viewport) =>
  log("zoom/move end", viewport);
const onEdgeContextMenu = (_: ReactMouseEvent, edge: Edge) =>
  log("edge context menu", edge);
const onEdgeMouseEnter = (_: ReactMouseEvent, edge: Edge) =>
  log("edge mouse enter", edge);
const onEdgeMouseMove = (_: ReactMouseEvent, edge: Edge) =>
  log("edge mouse move", edge);
const onEdgeMouseLeave = (_: ReactMouseEvent, edge: Edge) =>
  log("edge mouse leave", edge);
const onEdgeDoubleClick = (_: ReactMouseEvent, edge: Edge) =>
  log("edge double click", edge);
const onNodesDelete = (nodes: Node[]) => log("nodes delete", nodes);
const onEdgesDelete = (edges: Edge[]) => log("edges delete", edges);
const onPaneMouseMove = (e: ReactMouseEvent) =>
  log("pane move", e.clientX, e.clientY);

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
          This is a <strong>default node</strong>
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

const OverviewFlow = () => {
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
      onNodeClick={onNodeClick}
      onConnect={onConnect}
      onPaneClick={onPaneClick}
      onPaneScroll={onPaneScroll}
      onPaneContextMenu={onPaneContextMenu}
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onNodeDoubleClick={onNodeDoubleClick}
      onSelectionDragStart={onSelectionDragStart}
      onSelectionDrag={onSelectionDrag}
      onSelectionDragStop={onSelectionDragStop}
      onSelectionContextMenu={onSelectionContextMenu}
      onSelectionChange={onSelectionChange}
      onMoveStart={onMoveStart}
      onMoveEnd={onMoveEnd}
      onInit={onInit}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      onEdgeContextMenu={onEdgeContextMenu}
      onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseMove={onEdgeMouseMove}
      onEdgeMouseLeave={onEdgeMouseLeave}
      onEdgeDoubleClick={onEdgeDoubleClick}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      attributionPosition="bottom-right"
      maxZoom={Infinity}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      onPaneMouseMove={onPaneMouseMove}
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

function CommentsPopover() {
  const unreadCount = useUnreadThreadsCount();
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="relative font-medium text-sm flex justify-center items-center space-x-1 focus:outline-none shadow-none bg-white border-gray-200 border px-0 rounded-l-lg w-8 h-8 hover:bg-gray-100"
          aria-label="Open comments"
        >
          <MessageIcon hasUnread={unreadCount > 0} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="relative bg-white drop-shadow-2p rounded-lg z-40 transition-transform flex flex-col"
          sideOffset={2}
          arrowPadding={20}
          align="end"
        >
          <div className="flex justify-between px-4 py-3 border-b border-[#EFF0F1]">
            <div className="uppercase text-[#63676D] font-bold text-xs">
              Comments
            </div>
            <Popover.Close className="">
              <CloseIcon />
            </Popover.Close>
          </div>
          <ThemeProvider theme={theme}>
            <Inbox maxHeight="calc(100vh - 12rem)" />
            <button className="text-sm m-4 py-1.5 rounded-lg bg-[#0080FF] text-white font-semibold">
              Add comment
            </button>
          </ThemeProvider>
          <Popover.Arrow asChild>
            <svg
              width="28"
              height="11.928888"
              viewBox="0 0 28 11.928888"
              fill="none"
              className="visible"
            >
              <path
                d="m 10.4645,10.46443 c 1.9526,1.952613 5.1185,1.952611 7.0711,-10e-6 L 28,0 H 0 Z"
                fill="#ffffff"
              />
            </svg>
          </Popover.Arrow>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default () => (
  <CollabkitProvider
    appId="add me"
    apiKey="add me"
    workspace={{
      id: 'demo',
      name: 'Workspace',
    }}
    user={{
      id: 'user-1',
      name: 'Anonymous',
    }}
    theme={theme}
    mentionableUsers={'allWorkspace'}
  >
    <div style={{ height: "100vh" }}>
      <OverviewFlow />
    </div>
  </CollabkitProvider>
);
