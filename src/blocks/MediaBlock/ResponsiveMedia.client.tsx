'use client';

import { cn } from '@/utilities/ui';
import React from 'react';
import { Media } from '@/components/Media';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import type { Media as MediaType } from '@/payload-types';

type ResponsiveMediaProps = {
  media: MediaType;
  className?: string;
  imgClassName?: string;
};

const ResponsiveMedia: React.FC<ResponsiveMediaProps> = ({ media, className, imgClassName }) => {
  const { isDesktop } = useResponsiveSize();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9]">
        <Media
          resource={media}
          imgClassName={cn(
            'border border-border rounded-[0.8rem] w-full h-full',
            isDesktop ? 'object-contain' : 'object-cover',
            imgClassName
          )}
        />
      </div>
    </div>
  );
};

export default ResponsiveMedia;