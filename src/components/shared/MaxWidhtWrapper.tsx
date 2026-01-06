import { cn } from '@/lib/utils';

function MaxWidthWrapper({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full ', className)}>{children}</div>;
}

export default MaxWidthWrapper;
