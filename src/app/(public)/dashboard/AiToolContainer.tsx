
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import StyledContentDisplay from '@/components/common/StyledContentDisplay';

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
                  <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-semibold">View Generated Content</AccordionTrigger>
                      <AccordionContent>
                        <div className="document-view">
                          {typeof result === 'string' ? <StyledContentDisplay content={result} /> : <>{result}</>}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
