'use client';

import { useEffect, useState } from 'react';

interface DynamicBackgroundProps {
  children: React.ReactNode;
}

export default function DynamicBackground({ children }: DynamicBackgroundProps) {
  return (
    <div
      className={`
     
    `}>
      {children}
    </div>
  );
}
