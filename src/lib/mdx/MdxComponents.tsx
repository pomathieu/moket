import { JSX } from 'react/jsx-runtime';
import { ClassAttributes, HTMLAttributes, AnchorHTMLAttributes, OlHTMLAttributes, ImgHTMLAttributes, BlockquoteHTMLAttributes } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import ContentReference from '@/lib/mdx/ContentReference';
import { ExternalLink, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';

// 🎯 Composant d'alerte amélioré avec icônes
function EnhancedAlert({ type = 'info', children, ...props }: { type?: 'info' | 'warning' | 'success' | 'error'; children: React.ReactNode }) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: XCircle,
  };

  const Icon = icons[type];

  const variants = {
    info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
    success: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
    error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
  };

  return (
    <div
      className={`border rounded-lg p-4 my-6 flex items-start gap-3 ${variants[type]}`}
      {...props}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">{children}</div>
    </div>
  );
}

// 🎯 Composant d'image optimisé
function OptimizedImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, width, height, ...rest } = props;

  if (!src) return null;

  // Si c'est une image externe, utiliser img standard
  if (typeof src === 'string' && src.startsWith('http')) {
    return (
      <Image
        src={src}
        alt={alt || ''}
        className="rounded-xl my-6 mx-auto shadow-lg max-w-full h-auto"
        loading="lazy"
        {...rest}
      />
    );
  }

  // Si src n'est pas string ou StaticImport, ne pas rendre l'image
  if (typeof src !== 'string') {
    return null;
  }

  // Sinon utiliser Next.js Image
  return (
    <div className="my-6 mx-auto">
      <Image
        src={src}
        alt={alt || ''}
        width={width ? Number(width) : 800}
        height={height ? Number(height) : 450}
        className="rounded-xl shadow-lg max-w-full h-auto mx-auto"
        loading="lazy"
        {...rest}
      />
    </div>
  );
}

// 🎯 Composant de lien externe amélioré
function ExternalLinkComponent(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, children, ...rest } = props;
  const isExternal = href?.startsWith('http') && !href.includes(process.env.NEXT_PUBLIC_URL || '');

  return (
    <a
      href={href}
      className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors inline-flex items-center gap-1"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...rest}>
      {children}
      {isExternal && <ExternalLink className="w-3 h-3" />}
    </a>
  );
}

// 🎯 Composant de code amélioré
function CodeBlock({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  const isInline = !className;

  if (isInline) {
    return (
      <code
        className="px-2 py-1 bg-muted text-muted-foreground rounded-md font-mono text-sm border"
        {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border">
      <div className="bg-muted px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">Code</div>
      <pre className="p-4 overflow-x-auto bg-card">
        <code
          className={className}
          {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

// 🎯 Composant de citation amélioré
function Quote(props: BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className="relative border-l-4 border-indigo-500 pl-6 py-4 my-8 bg-muted/30 rounded-r-lg italic"
      {...props}>
      <div className="absolute -left-2 top-4 w-4 h-4 bg-indigo-500 rounded-full"></div>
      {props.children}
    </blockquote>
  );
}

// 🎯 Tableau responsif amélioré
function ResponsiveTable(props: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table
        className="w-full border-collapse bg-card"
        {...props}>
        {props.children}
      </table>
    </div>
  );
}

const mdxComponents = {
  // Composants UI existants
  Alert: EnhancedAlert,
  AlertTitle,
  AlertDescription,
  Badge,
  ContentReference,
  Table: ResponsiveTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,

  // 🎯 Titres optimisés SEO avec ancres
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="scroll-mt-20 text-4xl md:text-5xl font-bold tracking-tight mt-16 mb-8 border-b border-border pb-4"
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="scroll-mt-20 text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6 border-b border-border pb-3 text-foreground group"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="scroll-mt-16 text-xl md:text-2xl font-semibold mt-10 mb-4 text-foreground"
      {...props}
    />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="scroll-mt-16 text-lg md:text-xl font-medium mt-8 mb-3 text-muted-foreground"
      {...props}
    />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="scroll-mt-16 text-base md:text-lg font-medium mt-6 mb-2 text-muted-foreground"
      {...props}
    />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="scroll-mt-16 text-sm md:text-base font-medium mt-6 mb-2 text-muted-foreground uppercase tracking-wide"
      {...props}
    />
  ),

  // 🎯 Liens externes optimisés
  a: ExternalLinkComponent,

  // 🎯 Listes améliorées
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-none ml-0 my-6 space-y-3"
      {...props}
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li
      className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-indigo-500 before:font-bold before:text-lg"
      {...props}
    />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside ml-4 my-6 space-y-3 [counter-reset:item]"
      {...props}
    />
  ),

  // 🎯 Images optimisées
  img: OptimizedImage,

  // 🎯 Citations améliorées
  blockquote: Quote,

  // 🎯 Code amélioré
  code: CodeBlock,
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <div className="my-6">
      <pre
        className="overflow-x-auto p-4 bg-slate-900 dark:bg-slate-800 text-slate-100 rounded-xl border border-border"
        {...props}
      />
    </div>
  ),

  // 🎯 Paragraphes optimisés
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="leading-7 my-6 text-foreground"
      {...props}
    />
  ),

  // 🎯 Séparateur
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      {...props}
    />
  ),

  // 🎯 Texte en gras/italique
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong
      className="font-semibold text-foreground"
      {...props}
    />
  ),
  em: (props: HTMLAttributes<HTMLElement>) => (
    <em
      className="italic text-muted-foreground"
      {...props}
    />
  ),
};

export default mdxComponents;
