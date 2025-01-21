'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormattedDate } from './FormattedDate';

interface PostCardProps {
  title: string;
  content: string;
  date: string;
  slug: string;
}

export function PostCard({ title, content, date, slug }: PostCardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-full rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link 
      href={`/${slug}`}
      className="group block"
    >
      <div className="h-full rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-lg">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight line-clamp-2" suppressHydrationWarning>
            {title}
          </h3>
          <FormattedDate 
            date={date}
            className="text-sm text-muted-foreground"
          />
        </div>
        <div className="mt-4">
          <div 
            className="text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: content 
            }}
            suppressHydrationWarning
          />
        </div>
      </div>
    </Link>
  );
} 