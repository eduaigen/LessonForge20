import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type AiToolContainerProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  result: string | React.ReactNode | null;
  isLoading: boolean;
};

export default function AiToolContainer({
  title,
  description,
  children,
  result,
  isLoading,
}: AiToolContainerProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="min-h-[400px]">
          <CardHeader>
            <CardTitle>Generated Result</CardTitle>
            <CardDescription>
              Your AI-generated content will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[75%]" />
                <Skeleton className="h-4 w-[85%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ) : (
              result && (
                <div className="max-w-none whitespace-pre-wrap rounded-md bg-muted/50 p-4 text-sm text-foreground">
                  {typeof result === 'string' ? result : <>{result}</>}
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
