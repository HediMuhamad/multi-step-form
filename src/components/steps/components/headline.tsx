import { FC } from "react";

interface HeadlineProps {
  header: string;
  description: string;
}

export const Headline: FC<HeadlineProps> = ({ header, description }) => (
  <div>
    <h1 className="text-6xl font-bold mb-7">{header}</h1>
    <p className="text-xl text-slate-950/50">{description}</p>
  </div>
);
