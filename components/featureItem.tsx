import { ReactNode } from "react";

interface featureItemTypes {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureItem({
  icon,
  title,
  description,
}: featureItemTypes) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm text-white/90">{title}</p>
        <p className="text-xs text-white/40">{description}</p>
      </div>
    </div>
  );
}
