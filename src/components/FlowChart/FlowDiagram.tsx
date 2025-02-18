"use client"
import { useCallback } from "react"
import { useLanguage } from "@/contexts/LanguageContext";
import { phrase } from "@/utils/phrases";
import "./page.module.css";
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
  type EdgeTypes,
  type Connection,
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import CustomEdge from "@/components/FlowChart/CustomEdge";
import CustomEdgeStartEnd from "@/components/FlowChart/CustomEdgeStartEnd";
import Image from "next/image";

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
    id: "stelland",
    data: {
      label: (
        <div className="flex flex-col items-center justify-center gap-y-2">
          <Image
            src="/stelland_logo.svg"
            alt="Stelland"
            width={100}
            height={100}
            className="invert" />
          <span className="text-[10px] text-gray-800">Your favorite story universe</span>
        </div>
      )
    },
    position: { x: 330, y: 300 },
    style: {
      ...nodeStyles.dark,
      background: "#FFF0EC",
      fontSize: "20px",
      fontWeight: "bold",
      width: 240,
      height: 80,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#000",
    },
  },
  // outer nodes
  {
    id: "IP_Management",
    data: {
      label: (
        <>
          <p className="text-lg font-bold">IP Management</p>
          <ol className="list-decimal pl-5 space-y-2 text-start">
            <li>Develop IP</li>
            <li>Manage IP</li>
            <li>IP Incubation</li>
            <li>Perform & Control</li>
            <li>Control & License</li>
          </ol>
        </>
      )
    },
    position: { x: 220, y: -150 },
    style: nodeStyles.dark
  },

  {
    id: "Global_Distribution",
    data: {
      label: (
        <>
          <p className="text-lg font-bold">Global Distribution</p>
          <ol className="list-decimal pl-5 space-y-2 text-start">
            <li>Preparing localization</li>
            <li>Submission of a work</li>
            <li>Entering local market</li>
            <li>Design & Marketing</li>
            <li>Strategic Promotion</li>
          </ol>
        </>
      )
    },
    position: { x: 700, y: 10 },
    style: nodeStyles.dark
  },
  {
    id: "Toonyz",
    data: {
      label: (
        <>
          <p className="text-lg font-bold">Toonyz</p>
          <ol className="list-decimal pl-5 space-y-2 text-start">
            <li>Run Toonyz Platform</li>
            <li>Toonyz Marketing</li>
            <li>Toonyz Creators</li>
            <li>Toonyz Studio</li>
            <li>Toonyz AI</li>
          </ol>
        </>
      )
    },
    position: { x: 10, y: 20 },
    style: nodeStyles.dark
  },

  {
    id: "Localization",
    data: {
      label: (
        <>
          <p className="text-lg font-bold">Localization</p>
          <ol className="list-decimal pl-5 space-y-2 text-start">
            <li>Planning & Preparing</li>
            <li>Translation</li>
            <li>Quality inspection</li>
            <li>Typesetting</li>
            <li>Finalization</li>
          </ol>
        </>
      )
    },
    position: { x: 460, y: -120 },
    style: nodeStyles.dark
  },

]

// Define edges connecting the nodes
const initialEdges: Edge[] = [
  // label for Toonyz
  {
    id: 'Toonyz-to-stelland-labeled',
    source: 'Toonyz',
    target: 'stelland',
    data: {
      label: 'Global Story Platform',
      color: 'bg-[#ff0000]'
    },
    type: 'custom',
  },
  { id: "Toonyz-to-stelland", source: "Toonyz", target: "stelland", animated: true, style: { stroke: "#ec4899" } },
  // label for localization
  {
    id: 'Localization-to-stelland-labeled',
    source: 'Localization',
    target: 'stelland',
    data: {
      label: 'Localization Process',
      color: 'bg-[#ec4899]'
    },
    type: 'custom',
  },


  { id: "Localization-to-stelland", source: "Localization", target: "stelland", animated: true, style: { stroke: "#3b82f6" } },

  // label for IP Management
  {
    id: 'IP_Management-to-stelland-labeled',
    source: 'IP_Management',
    target: 'stelland',
    data: {
      label: 'Original Super IP',
      color: 'bg-[#eccb48]',
    },
    type: 'custom',
    style: {
        translate: '10px, 10px'
    }
  },

  { id: "IP_Management-to-stelland", source: "Localization", target: "stelland", animated: true, style: { stroke: "#3b82f6" } },

  // { id: "IP_Management-to-stelland", source: "IP_Management", target: "stelland", animated: true, style: { stroke: "#ef4444" } },

  { id: "Global_Distribution-to-stelland", source: "Global_Distribution", target: "stelland", animated: true, style: { stroke: "#3b82f6" } },
  // { id: "refine-b2b", source: "refine", target: "b2b", animated: true, style: { stroke: "#ec4899" } },
]

const edgeTypes: EdgeTypes = {
  custom: (props) => <CustomEdge {...props} style={props.data?.style} />,
  'start-end': CustomEdgeStartEnd,
};

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
      edgeTypes={edgeTypes}
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

