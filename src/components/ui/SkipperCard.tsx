import React from 'react';

type SkipperCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const SkipperCard: React.FC<SkipperCardProps> = ({ children, className = '', ...rest }) => {
  return (
    <div
      className={
        `relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 ` +
        `hover:border-orange-500/40 transition-all duration-300 group flex flex-col h-full ` +
        className
      }
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10" />
      {children}
    </div>
  );
};

type SectionProps = React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode };

export const SkipperCardHeader: React.FC<SectionProps> = ({ children, className = '', ...rest }) => (
  <div className={`mb-4 ${className}`} {...rest}>{children}</div>
);

export const SkipperCardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...rest }) => (
  <h3 className={`text-white text-xl font-bold leading-tight ${className}`} {...rest}>{children}</h3>
);

export const SkipperCardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...rest }) => (
  <p className={`text-gray-300 mt-1 text-sm md:text-base ${className}`} {...rest}>{children}</p>
);

export const SkipperCardContent: React.FC<SectionProps> = ({ children, className = '', ...rest }) => (
  <div className={`flex-1 ${className}`} {...rest}>{children}</div>
);

export const SkipperCardFooter: React.FC<SectionProps> = ({ children, className = '', ...rest }) => (
  <div className={`mt-5 pt-3 border-t border-gray-800/60 ${className}`} {...rest}>{children}</div>
);


