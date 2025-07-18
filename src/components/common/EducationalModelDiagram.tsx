import { BookOpenText, TestTube, Sigma, History, FileText, BookCopy, FolderSync } from 'lucide-react';
import Link from 'next/link';

const Node = ({ icon, label, position, delay }: { icon: React.ReactNode, label: string, position: string, delay: string }) => (
    <Link
      href="/curriculum"
      className={`absolute ${position} flex flex-col items-center animate-float-up group`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-card shadow-lg border border-border/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/20">
        {icon}
      </div>
      <span className="mt-2 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary text-center">{label}</span>
    </Link>
  );

export default function EducationalModelDiagram() {
    const nodes = [
        // Subjects
        { icon: <TestTube className="w-8 h-8 text-green-500" />, label: 'Science', position: 'top-[15%] left-0', delay: '0.2s' },
        { icon: <Sigma className="w-8 h-8 text-purple-500" />, label: 'Math', position: 'top-0 left-[50%] -translate-x-1/2', delay: '0.3s' },
        { icon: <History className="w-8 h-8 text-yellow-500" />, label: 'History', position: 'top-[15%] right-0', delay: '0.4s' },
        { icon: <BookOpenText className="w-8 h-8 text-accent" />, label: 'ELA', position: 'left-0 top-1/2 -translate-y-1/2', delay: '0.5s' },
        
        // Tools
        { icon: <FileText className="w-8 h-8 text-primary" />, label: 'Lesson Plans', position: 'right-0 top-1/2 -translate-y-1/2', delay: '0.6s' },
        { icon: <BookCopy className="w-8 h-8 text-primary" />, label: 'Test Generator', position: 'bottom-[15%] left-0', delay: '0.7s' },
        { icon: <FolderSync className="w-8 h-8 text-primary" />, label: 'Curriculum Audit', position: 'bottom-0 left-[50%] -translate-x-1/2', delay: '0.8s' },
        { icon: <TestTube className="w-8 h-8 text-primary" />, label: 'Lab Maker', position: 'bottom-[15%] right-0', delay: '0.9s' },
    ];
  
    return (
      <div className="relative flex items-center justify-center w-full aspect-square max-w-lg mx-auto">
        {/* Connection Lines SVG */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Lines from center to each node */}
            <line x1="50" y1="50" x2="10" y2="25" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="50" y2="5" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="90" y2="25" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="5" y2="50" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="95" y2="50" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="10" y2="85" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="50" y2="95" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="90" y2="85" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>

        {/* Central Node */}
        <div className="relative z-10 flex flex-col items-center justify-center w-48 h-48 rounded-full bg-background">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow"/>
            <div className="absolute inset-2 rounded-full bg-background shadow-inner"/>
            <div className="relative flex flex-col items-center justify-center text-center">
                 <div className="relative brain-icon">
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary brain-pulse drop-shadow-lg"
                    >
                        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                        <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                        <path d="M6 18a4 4 0 0 1-1.967-.516" />
                        <path d="M19.967 17.484A4 4 0 0 1 18 18" />
                    </svg>

                    <div className="absolute -top-2 -right-2">
                        <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400 lightning-bounce drop-shadow-lg"
                        >
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
                        </svg>
                    </div>

                    <div className="absolute inset-0 -m-4">
                        <div className="w-24 h-24 border-2 border-primary/30 rounded-full energy-ring-1"></div>
                        <div className="absolute inset-2 w-20 h-20 border-2 border-accent/30 rounded-full energy-ring-2"></div>
                    </div>
                 </div>
                 <span className="font-headline text-2xl font-bold gradient-text mt-2">
                    EduAiGen
                 </span>
                 <span className="text-xs font-medium text-muted-foreground">Your AI Teaching Partner</span>
            </div>
        </div>
  
        {/* Outer Nodes */}
        {nodes.map(node => (
            <Node key={node.label} {...node} />
        ))}
      </div>
    );
  }
