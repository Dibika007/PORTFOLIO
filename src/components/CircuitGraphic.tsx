import React, { useState } from 'react';

export const CircuitGraphic: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    { id: 1, cx: 120, cy: 90, label: 'ALU / Logic', tech: 'Core Computation' },
    { id: 2, cx: 280, cy: 80, label: 'Neural Bus', tech: 'AI Inference' },
    { id: 3, cx: 380, cy: 160, label: 'GPIO / I/O', tech: 'Sensor Interface' },
    { id: 4, cx: 340, cy: 300, label: 'Flash / SRAM', tech: 'Embedded Memory' },
    { id: 5, cx: 180, cy: 340, label: 'Clock Osc', tech: 'Synchronous Timing' },
    { id: 6, cx: 80, cy: 220, label: 'RF / Comm', tech: 'Signal Processing' },
  ];

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4F8CFF]/15 via-[#8B5CF6]/10 to-[#36D9E8]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <svg
        viewBox="0 0 460 440"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        aria-label="Engineering circuit diagram representing embedded systems and software architecture"
      >
        <defs>
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#36D9E8" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10172A" />
            <stop offset="100%" stopColor="#0B1020" />
          </linearGradient>

          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-slate-700/20 dark:text-slate-700/40"
            />
          </pattern>
        </defs>

        {/* Blueprint background grid */}
        <rect x="20" y="20" width="420" height="400" rx="16" fill="url(#gridPattern)" />

        {/* PCB Traces */}
        <g className="circuit-traces" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Main bus lines */}
          <path
            d="M 120 90 L 120 180 L 190 180"
            className="stroke-slate-400/40 dark:stroke-slate-600/60"
          />
          <path
            d="M 280 80 L 280 160 L 250 160"
            className="stroke-[#4F8CFF]/70"
            strokeDasharray="4 3"
          />
          <path
            d="M 380 160 L 300 160 L 270 200"
            className="stroke-[#36D9E8]/70"
          />
          <path
            d="M 340 300 L 270 300 L 260 250"
            className="stroke-slate-400/40 dark:stroke-slate-600/60"
          />
          <path
            d="M 180 340 L 180 260 L 200 250"
            className="stroke-[#8B5CF6]/70"
            strokeDasharray="5 3"
          />
          <path
            d="M 80 220 L 160 220 L 190 220"
            className="stroke-[#4F8CFF]/70"
          />

          {/* Diagonal routing */}
          <path d="M 60 60 L 100 60 L 120 90" className="stroke-slate-500/30" />
          <path d="M 400 60 L 320 60 L 280 80" className="stroke-slate-500/30" />
          <path d="M 420 380 L 370 380 L 340 300" className="stroke-slate-500/30" />
          <path d="M 40 360 L 120 360 L 180 340" className="stroke-slate-500/30" />

          {/* Animated data pulses */}
          <path
            d="M 120 90 L 120 180 L 190 180"
            stroke="url(#traceGrad)"
            strokeWidth="2.5"
            strokeDasharray="16 120"
            className="animate-pulse"
          />
          <path
            d="M 280 80 L 280 160 L 250 160"
            stroke="#36D9E8"
            strokeWidth="2.5"
            strokeDasharray="20 100"
            className="animate-pulse"
          />
          <path
            d="M 80 220 L 160 220 L 190 220"
            stroke="#4F8CFF"
            strokeWidth="2.5"
            strokeDasharray="12 80"
            className="animate-pulse"
          />
        </g>

        {/* Central Microcontroller / Core Die */}
        <g transform="translate(180, 170)">
          {/* Outer heatspreader / IC package */}
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            rx="12"
            fill="url(#chipGrad)"
            stroke="url(#traceGrad)"
            strokeWidth="1.75"
            className="filter drop-shadow-lg"
          />

          {/* IC Pin leads (Top & Bottom) */}
          {[-12, -4, 4, 12].map((offset, i) => (
            <React.Fragment key={i}>
              <line
                x1={50 + offset}
                y1="-6"
                x2={50 + offset}
                y2="0"
                stroke="#64748B"
                strokeWidth="2"
              />
              <line
                x1={50 + offset}
                y1="100"
                x2={50 + offset}
                y2="106"
                stroke="#64748B"
                strokeWidth="2"
              />
              <line
                x1="-6"
                y1={50 + offset}
                x2="0"
                y2={50 + offset}
                stroke="#64748B"
                strokeWidth="2"
              />
              <line
                x1="100"
                y1={50 + offset}
                x2="106"
                y2={50 + offset}
                stroke="#64748B"
                strokeWidth="2"
              />
            </React.Fragment>
          ))}

          {/* Inner Silicon Die */}
          <rect
            x="14"
            y="14"
            width="72"
            height="72"
            rx="6"
            className="fill-slate-900/90 dark:fill-slate-950/90 stroke-slate-700/60"
            strokeWidth="1"
          />

          {/* Monogram inside die */}
          <text
            x="50"
            y="48"
            textAnchor="middle"
            className="text-[14px] font-bold fill-white tracking-widest font-mono"
          >
            ECE · CS
          </text>
          <text
            x="50"
            y="64"
            textAnchor="middle"
            className="text-[9px] fill-[#36D9E8] font-mono tracking-wider"
          >
            NEXUS CORE
          </text>

          {/* Micro indicator LED */}
          <circle cx="24" cy="24" r="2.5" fill="#36D9E8" className="animate-ping" opacity="0.75" />
          <circle cx="24" cy="24" r="2" fill="#36D9E8" />
        </g>

        {/* Peripheral Nodes (Interactive) */}
        {nodes.map((node) => {
          const isSelected = activeNode === node.id;
          return (
            <g
              key={node.id}
              className="cursor-pointer transition-transform duration-200"
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(isSelected ? null : node.id)}
            >
              {/* Node halo */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={isSelected ? '22' : '16'}
                className="fill-slate-900/80 stroke-slate-600/80 transition-all duration-200"
                strokeWidth={isSelected ? '2' : '1.25'}
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r="5"
                fill={isSelected ? '#36D9E8' : '#4F8CFF'}
                className="transition-colors duration-200"
              />

              {/* Node labels */}
              <text
                x={node.cx}
                y={node.cy + 26}
                textAnchor="middle"
                className="text-[10px] font-medium fill-slate-600 dark:fill-slate-200 pointer-events-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Interactive node detail callout */}
        {activeNode !== null && (
          <g className="transition-opacity duration-200">
            {(() => {
              const cur = nodes.find((n) => n.id === activeNode);
              if (!cur) return null;
              const isRight = cur.cx > 230;
              const boxX = isRight ? cur.cx - 130 : cur.cx + 20;
              const boxY = cur.cy - 35;
              return (
                <g>
                  <rect
                    x={boxX}
                    y={boxY}
                    width="120"
                    height="32"
                    rx="6"
                    className="fill-slate-900/95 stroke-[#36D9E8] shadow-xl"
                    strokeWidth="1.2"
                  />
                  <text
                    x={boxX + 60}
                    y={boxY + 14}
                    textAnchor="middle"
                    className="text-[9px] font-semibold fill-[#36D9E8] font-mono"
                  >
                    {cur.label}
                  </text>
                  <text
                    x={boxX + 60}
                    y={boxY + 25}
                    textAnchor="middle"
                    className="text-[8px] fill-slate-300"
                  >
                    {cur.tech}
                  </text>
                </g>
              );
            })()}
          </g>
        )}
      </svg>

      {/* Floating subtle hardware/software tag */}
      <div className="absolute -bottom-2 right-4 px-3 py-1.5 rounded-md bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/60 text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-lg backdrop-blur-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#36D9E8]" />
        <span>Hardware &amp; Software Architecture</span>
      </div>
    </div>
  );
};
