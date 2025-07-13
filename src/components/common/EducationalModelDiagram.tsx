import { BrainCircuit, BookOpenText, TestTube, Sigma, History } from 'lucide-react';

const Node = ({ icon, label, position, delay }: { icon: React.ReactNode, label: string, position: string, delay: string }) => (
    <div 
      className={`absolute ${position} flex flex-col items-center animate-float-up`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-card shadow-lg border border-border/50 backdrop-blur-sm">
        {icon}
      </div>
      <span className="mt-2 text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );

export default function EducationalModelDiagram() {
    const nodes = [
        { icon: <BookOpenText className="w-8 h-8 text-chart-2" />, label: 'ELA', position: 'top-0 left-1/4 -translate-x-1/2', delay: '0.2s' },
        { icon: <TestTube className="w-8 h-8 text-chart-3" />, label: 'Science', position: 'top-1/3 -right-4', delay: '0.4s' },
        { icon: <Sigma className="w-8 h-8 text-chart-4" />, label: 'Math', position: 'bottom-0 right-1/4', delay: '0.6s' },
        { icon: <History className="w-8 h-8 text-chart-5" />, label: 'History', position: 'bottom-1/4 -left-4', delay: '0.8s' },
    ];
  
    return (
      <div className="relative flex items-center justify-center w-full aspect-square max-w-lg mx-auto">
        {/* Connection Lines SVG */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Lines from center to each node */}
            <line x1="50" y1="50" x2="30" y2="5" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="98" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="70" y2="98" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="2" y2="80" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>

        {/* Central Node */}
        <div 
          className="relative z-10 flex items-center justify-center w-40 h-40 rounded-full bg-background"
        >
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow"/>
            <div className="absolute inset-2 rounded-full bg-background shadow-inner"/>
            <div className="relative flex flex-col items-center justify-center text-center">
                <BrainCircuit className="w-12 h-12 text-primary animate-pulse"/>
                <span className="mt-2 text-sm font-bold text-primary">Eduaigen AI</span>
            </div>
        </div>
  
        {/* Outer Nodes */}
        {nodes.map(node => (
            <Node key={node.label} {...node} />
        ))}
      </div>
    );
  }

  // Add this to your globals.css or a style tag if needed
  /*
  @keyframes ping-slow {
    0%, 100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.4);
      opacity: 0;
    }
  }
  .animate-ping-slow {
    animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  */

