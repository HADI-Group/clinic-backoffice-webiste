import { AlertCircle } from "lucide-react";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export default function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="border-b border-border bg-white px-8 py-4">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">
            {title} - Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-sm">{description}</p>
          <p className="text-xs text-muted-foreground mt-4">
            Keep prompting to build this page
          </p>
        </div>
      </div>
    </div>
  );
}
