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
  {
    id: "IP_Management", 
    data: { 
    label: (
      <>
        <p className="text-lg font-bold">IP Management</p>
        <ol className="list-disc pl-5 space-y-2 text-start">
          <li>Develop project</li>
          <li>Manage project</li>
          <li>Monitor project</li>
          <li>Perform project</li>
          <li>Control project</li>
        </ol>
      </>
    )
  }, 
  position: { x: 100, y: 450 }, 
  style: nodeStyles.dark },

{ id: "Global_Distribution", 
  data: { 
  label: (
    <>
    <p className="text-lg font-bold">Global Distribution</p>
    <ol className="list-disc pl-5 space-y-2 text-start">
          <li>Preparing localization</li>
          <li>Submission of a work</li>
          <li>Entering local market</li>
          <li>Design & Marketing</li>
          <li>Strategic Promotion</li>
        </ol>
      </>
    )
  }, position: { x: 450, y: 450 }, style: nodeStyles.dark },

{ id: "Toonyz", 
  data: { 
  label: (
    <>
    <p className="text-lg font-bold">Toonyz</p>
    <ol className="list-disc pl-5 space-y-2 text-start">
      <li>Run Toonyz Platform</li>
      <li>Toonyz Marketing</li>
      <li>Toonyz Creators</li>
      <li>Toonyz Studio</li>
      <li>Toonyz AI</li>
    </ol>
    </>
  )
  }, 
  position: { x: 100, y: 20 }, 
  style: nodeStyles.dark 
},

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
  position: { x: 400, y: 20 },
  style: nodeStyles.dark
},

]

// Define edges connecting the nodes
const initialEdges: Edge[] = [
  { id: "refine-Toonyz", source: "refine", target: "Toonyz", animated: true, style: { stroke: "#ec4899" } },

  { id: "Localization-refine", source: "Localization-list", target: "refine", animated: true, style: { stroke: "#3b82f6" } },
  // Connect Refine to outputs
  { id: "refine-IP_Management", source: "refine", target: "IP_Management", animated: true, style: { stroke: "#ef4444" } },
  { id: "refine-Global_Distribution", source: "refine", target: "Global_Distribution", animated: true, style: { stroke: "#3b82f6" } },
  // { id: "refine-b2b", source: "refine", target: "b2b", animated: true, style: { stroke: "#ec4899" } },
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

