// src/components/AIAgentsArchitecture.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, User, Bot, BrainCircuit, Wrench, Database, Zap, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

const agentNodes = [
  { id: 'user', label: 'USER QUERY', icon: User, desc: 'Complex natural language instruction and multi-modal context.' },
  { id: 'agent', label: 'AI AGENT', icon: Bot, desc: 'Orchestrator managing sub-goals, memory buffers, and state graphs.' },
  { id: 'llm', label: 'LLM REASONING', icon: BrainCircuit, desc: 'High-capability reasoning core producing tool-invocation plans.' },
  { id: 'tools', label: 'TOOL CALLING / MCP', icon: Wrench, desc: 'Dynamic invocation of Python runtimes, Web APIs, and sensors.' },
  { id: 'db', label: 'VECTOR DATABASE', icon: Database, desc: 'Semantic retrieval via embeddings (Chroma / Pinecone / pgvector).' },
  { id: 'action', label: 'AUTONOMOUS ACTION', icon: Zap, desc: 'Code execution, API mutation, or structured data synthesis.' },
  { id: 'result', label: 'VERIFIED RESULT', icon: CheckCircle2, desc: 'Evaluated response with citation grounding and safety guardrails.' },
];

export default function AIAgentsArchitecture() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 font-mono text-xs text-[#00F0FF] mb-3">
          <Network size={13} />
          <span>AUTONOMOUS SYSTEMS // 05</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide uppercase glow-text-cyan">
          GENERATIVE AI & AGENTIC ARCHITECTURE
        </h2>
        <p className="mt-3 text-slate-400 font-mono text-sm max-w-2xl">
          Engineering beyond static prompts: orchestrating multi-agent graph workflows, Model Context Protocol (MCP), and real-time tool grounding.
        </p>
      </div>

      {/* Interactive Agent Flow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
        {agentNodes.map((node, idx) => {
          const Icon = node.icon;
          const isSelected = activeStep === idx;
          return (
            <div
              key={node.id}
              onClick={() => {
                soundFx.playBeep(600 + idx * 40, 0.04);
                setActiveStep(idx);
              }}
              className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#00F0FF]/15 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                  : 'bg-black/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? 'bg-[#00F0FF] text-black' : 'bg-slate-900 text-[#00F0FF]'
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xs text-white mb-2">
                  {node.label}
                </h3>
              </div>
              <p className="text-[10px] font-sans text-slate-400 font-light leading-relaxed">
                {node.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary Highlight Box */}
      <div className="cyber-panel rounded-2xl p-6 border border-[#00F0FF]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[#00F0FF] block mb-1">
            CURRENT ARCHITECTURE FOCUS
          </span>
          <h4 className="font-display text-lg font-bold text-white mb-1">
            LangGraph Multi-Agent Collaboration & Custom MCP Servers
          </h4>
          <p className="text-slate-300 text-xs font-light max-w-2xl leading-relaxed">
            Specialized agent roles (Planner, Search Retriever, Coder, Critic) communicating through typed state objects to produce hallucination-resistant outputs.
          </p>
        </div>
        <div className="font-mono text-xs text-[#00FF88] bg-black/60 border border-[#00FF88]/40 px-4 py-2 rounded-xl shrink-0">
          STATUS: AGENTIC GRAPH ACTIVE
        </div>
      </div>
    </section>
  );
}
