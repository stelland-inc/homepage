"use client"
import { useCallback } from "react"
import { useLanguage } from "@/contexts/LanguageContext";
import { phrase } from "@/utils/phrases";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css';

// Custom node styles
const nodeStyles = {
  dark: {
    background: "#1a1b26",
    border: "none",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "white",
    fontSize: "14px",
    width: 200,
  },
  category: {
    background: "#252732",
    border: "none",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    width: 200,
  },
}

// Define initial nodes
const initialNodes: Node[] = [
  // Center node
  {
    id: "refine",
    data: { label: "Stelland" },
    position: { x: 300, y: 300 },
    style: {
      ...nodeStyles.dark,
      background: "#FFF0EC",
      fontSize: "20px",
      fontWeight: "bold",
      width: 200,
      height: 80,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#000",
    },
  },

  // Output categories
  { id: "IP_Management", data: { label: "IP Management" }, position: { x: 100, y: 450 }, style: nodeStyles.dark },
  { id: "Global_Distribution", data: { label: "Global Distribution" }, position: { x: 500, y: 450 }, style: nodeStyles.dark },
  // { id: "Localization", data: { label: "Localization" }, position: { x: 500, y: 550 }, style: nodeStyles.dark },
  // { id: "Toonyz", data: { label: "Toonyz" }, position: { x: 700, y: 550 }, style: nodeStyles.dark },

  { id: "nextjs", data: { label: "NextJS" }, position: { x: 100, y: 120 }, style: nodeStyles.dark },
  { id: "Toonyz", data: { label: "Toonyz" }, position: { x: 100, y: 180 }, style: nodeStyles.dark },

  {
    id: "Localization-list",
    data: {
      label: (
        <>
        <p className="text-lg font-bold">Localization Process</p>
        <ol className="list-disc pl-5 space-y-2 text-start">
          <li>Planning & Preparing</li>
          <li>Translation</li>
          <li>Quality inspection</li>
          <li>Typesetting</li>
          <li>Finalization</li>
        </ol>
        </>
      )
    },
    position: { x: 300, y: 20 },
    style: nodeStyles.dark
  },
  // { id: "Localization", data: { label: "Localization" }, position: { x: 300, y: 180 }, style: nodeStyles.dark },

  // Auth nodes
  { id: "auth0", data: { label: "Auth0" }, position: { x: 500, y: 120 }, style: nodeStyles.dark },
  { id: "google", data: { label: "Google Auth" }, position: { x: 500, y: 180 }, style: nodeStyles.dark },
]

// Define edges connecting the nodes
const initialEdges: Edge[] = [
  // Connect platforms to Refine
  { id: "nextjs-refine", source: "nextjs", target: "refine", animated: true, style: { stroke: "#6366f1" } },
  { id: "refine-Toonyz", source: "Toonyz", target: "refine", animated: true, style: { stroke: "#6366f1" } },

  // 
{ id: "Localization-refine", source: "Localization-list", target: "refine", animated: true, style: { stroke: "#3b82f6" } },  
// { id: "refine-Localization", source: "Localization", target: "refine", animated: true, style: { stroke: "#3b82f6" } },

  // Connect Auth to Refine
  { id: "auth0-refine", source: "auth0", target: "refine", animated: true, style: { stroke: "#ec4899" } },
  { id: "google-refine", source: "google", target: "refine", animated: true, style: { stroke: "#ec4899" } },

  // Connect Refine to outputs
  { id: "refine-IP_Management", source: "refine", target: "IP_Management", animated: true, style: { stroke: "#ef4444" } },
  { id: "refine-admin", source: "refine", target: "Global_Distribution", animated: true, style: { stroke: "#3b82f6" } },
  // { id: "refine-b2b", source: "refine", target: "Localization", animated: true, style: { stroke: "#ec4899" } },
  // { id: "refine-forms", source: "refine", target: "forms", animated: true, style: { stroke: "#6366f1" } },
]

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { dictionary, language } = useLanguage();
  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="bottom-left"
    >
      <Controls />
      {/* <MiniMap style={{ background: "#eee" }} nodeColor="#fff" /> */}
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
    </ReactFlow>
  )
}

export default function FlowDiagram() {
  return (
    <div className="w-full h-[500px] bg-[#fff]">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  )
}

