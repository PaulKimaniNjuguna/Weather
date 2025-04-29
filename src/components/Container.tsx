'use client'; // (optional if you're using Next.js 13+ client components)

import React, { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={cn('w-[70%] mx-auto', className)}>
      {children}
    </div>
  );
}