
export default function PublicAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div className="flex flex-1 flex-col">
        {children}
      </div>
  );
}
