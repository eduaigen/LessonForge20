
'use client';

const Node = ({ position, delay }: { position: string, delay: string }) => (
  <div
    className={`absolute ${position} w-3 h-3 bg-primary/50 rounded-full animate-node-pulse`}
    style={{ animationDelay: delay }}
  />
);

const Line = ({ from, to, delay }: { from: string, to: string, delay: string }) => (
  <svg className="absolute w-full h-full" style={{ animationDelay: delay }}>
    <path
      d={`M ${from} L ${to}`}
      stroke="hsl(var(--primary) / 0.3)"
      strokeWidth="1"
      className="animate-draw-line"
      strokeDasharray="100"
      strokeDashoffset="100"
    />
  </svg>
);

export default function GeneratingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-background rounded-md p-8">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Central Node */}
        <div className="absolute w-12 h-12 bg-primary rounded-full animate-node-pulse" style={{ animationDelay: '0s' }}>
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        </div>
        {/* Outer Nodes */}
        <Node position="top-0 left-1/2 -translate-x-1/2" delay="0.2s" />
        <Node position="bottom-0 left-1/2 -translate-x-1/2" delay="0.3s" />
        <Node position="left-0 top-1/2 -translate-y-1/2" delay="0.4s" />
        <Node position="right-0 top-1/2 -translate-y-1/2" delay="0.5s" />
        <Node position="top-8 left-8" delay="0.6s" />
        <Node position="bottom-8 right-8" delay="0.7s" />
        <Node position="top-8 right-8" delay="0.8s" />
        <Node position="bottom-8 left-8" delay="0.9s" />

        {/* Lines */}
        <Line from="96 24" to="96 96" delay="0.2s" />
        <Line from="96 168" to="96 96" delay="0.3s" />
        <Line from="24 96" to="96 96" delay="0.4s" />
        <Line from="168 96" to="96 96" delay="0.5s" />
        <Line from="56 56" to="96 96" delay="0.6s" />
        <Line from="136 136" to="96 96" delay="0.7s" />
        <Line from="136 56" to="96 96" delay="0.8s" />
        <Line from="56 136" to="96 96" delay="0.9s" />
      </div>
      <p className="mt-8 text-lg font-semibold animate-pulse">
        Generating Content...
      </p>
      <p className="text-sm text-muted-foreground">
        Please wait a moment while the AI crafts your materials.
      </p>
    </div>
  );
}
