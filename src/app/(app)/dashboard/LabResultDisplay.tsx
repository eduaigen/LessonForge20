type LabResultDisplayProps = {
  data: {
    title: string;
    objective: string;
    materials: string;
    procedure: string;
    safetyGuidelines: string;
    disposalInstructions: string;
    ngssAlignment: string;
  };
};

export default function LabResultDisplay({ data }: LabResultDisplayProps) {
  const renderList = (text: string) => {
    return (
      <ul className="list-disc pl-5">
        {text
          .split('\n')
          .map((item) => item.trim())
          .filter((item) => item)
          .map((item, index) => (
            <li key={index} className="mb-1">
              {item.startsWith('- ') ? item.substring(2) : item}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6 text-foreground">
      <h3 className="font-headline text-2xl font-bold text-primary">
        {data.title}
      </h3>

      <div>
        <h4 className="font-headline font-semibold text-lg mb-2">Objective</h4>
        <p>{data.objective}</p>
      </div>

      <div>
        <h4 className="font-headline font-semibold text-lg mb-2">NGSS Alignment</h4>
        <p>{data.ngssAlignment}</p>
      </div>

      <div>
        <h4 className="font-headline font-semibold text-lg mb-2">Materials</h4>
        {renderList(data.materials)}
      </div>

      <div>
        <h4 className="font-headline font-semibold text-lg mb-2">Procedure</h4>
        {renderList(data.procedure)}
      </div>

      <div>
        <h4 className="font-headline font-semibold text-lg mb-2">Safety Guidelines</h4>
        {renderList(data.safetyGuidelines)}
      </div>
       
      <div>
        <h4 className="font-headline font-semibold text-lg mb-2">Disposal Instructions</h4>
        <p>{data.disposalInstructions}</p>
      </div>
    </div>
  );
}
