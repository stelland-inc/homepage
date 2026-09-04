"use client"
import { useCallback, useEffect } from "react"
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


function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { dictionary, language } = useLanguage();
  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [language]); // Reinitialize when language changes


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
              src="/apple-touch-icon.png"
              alt="Stelland"
              width={130}
              height={130}
              className="p-2 rounded-full" />
              
            {/* <Image
              src="/stelland_logo.svg"
              alt="Stelland"
              width={100}
              height={20}
              className="invert" /> */}
            {/* <span className="text-[10px] text-gray-800">
              Entertainment
            </span> */}
          </div>
        )
      },
      position: { x: 330, y: 300 },
      style: {
        ...nodeStyles.dark,
        background: "#FFF0EC",
        fontSize: "20px",
        fontWeight: "bold",
        width: 160,
        height: 160,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
        borderRadius: "100%",
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
              <li>{language === 'en' ? 'Develop IP' : 'IP 개발'}</li>
              <li>{language === 'en' ? 'Manage IP' : 'IP 관리'}</li>
              <li>{language === 'en' ? 'IP Incubation' : 'IP 육성'}</li>
              <li>{language === 'en' ? 'Perform & Control' : '실행 및 제어'}</li>
              <li>{language === 'en' ? 'Control & License' : '제어 및 라이선스'}</li>
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
            <p className="text-lg font-bold">{language === 'en' ? 'Global Distribution' : '글로벌 배포'}</p>
            <ol className="list-decimal pl-5 space-y-2 text-start">
              <li>{language === 'en' ? 'Preparing localization' : '현지화 준비'}</li>
              <li>{language === 'en' ? 'Submission of a work' : '작품 투고'}</li>
              <li>{language === 'en' ? 'Entering local market' : '로컬 시장 진출'}</li>
              <li>{language === 'en' ? 'Design & Marketing' : '디자인 및 마케팅'}</li>
              <li>{language === 'en' ? 'Strategic Promotion' : '전략적 홍보'}</li>
            </ol>
          </>
        )
      },
      position: { x: 700, y: 10 },
      style: nodeStyles.dark
    },
    {
      id: "Localization",
      data: {
        label: (
          <>
            <p className="text-lg font-bold">{language === 'en' ? 'Localization' : '현지화'}</p>
            <ol className="list-decimal pl-5 space-y-2 text-start">
              <li>{language === 'en' ? 'Planning & Preparing' : '계획 및 준비'}</li>
              <li>{language === 'en' ? 'Translation' : '번역'}</li>
              <li>{language === 'en' ? 'Quality inspection' : '품질 검사'}</li>
              <li>{language === 'en' ? 'Typesetting' : '편집'}</li>
              <li>{language === 'en' ? 'Finalization' : '최종 검수'}</li>
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
        style: {
          translate: '-25%, -350%'
        }
      },
      type: 'custom',
    
    },

    { id: "IP_Management-to-stelland", source: "Localization", target: "stelland", animated: true, style: { stroke: "#3b82f6" } },
    // label for IP Management
    {
      id: 'Global_Distribution-to-stelland-labeled',
      source: 'Global_Distribution',
      target: 'stelland',
      data: {
        label: 'Specialized Distribution',
        color: 'bg-[#3b82f6]',
        style: {
          translate: '30%, -290%'
        }
      },
      type: 'custom',
    },

    { id: "Global_Distribution-to-stelland", source: "Global_Distribution", target: "stelland", animated: true, style: { stroke: "#3b82f6" } },
  ]

  const edgeTypes: EdgeTypes = {
    custom: (props) => <CustomEdge {...props} style={props.data?.style} />,
    'start-end': CustomEdgeStartEnd,
  };


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

