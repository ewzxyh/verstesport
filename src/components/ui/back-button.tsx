'use client';

import { Button } from "@/components/ui/button";

export const BackButton = () => {
  return (
    <Button
      variant="ghost"
      className="group flex items-center text-muted-foreground hover:text-primary"
      onClick={() => window.history.back()}
    >
      <svg
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Voltar
    </Button>
  );
}; 