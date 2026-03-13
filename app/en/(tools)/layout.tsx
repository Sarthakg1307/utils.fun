import { ToolLayout } from "@/app/pages/tool-layout";

export default function EnToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToolLayout locale="en" pathPrefix="/en">
      {children}
    </ToolLayout>
  );
}
