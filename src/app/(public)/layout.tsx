// This is a new file or has been significantly updated.
// The public layout no longer needs its own header/footer as they are handled by the root layout.
export default function PublicAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </div>
  );
}
