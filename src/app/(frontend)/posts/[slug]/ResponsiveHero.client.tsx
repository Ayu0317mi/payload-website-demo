'use client';

import React from 'react';
import { Media } from '@/components/Media';
import { useResponsiveSize } from '@/hooks/useResponsiveSize';
import type { Media as MediaType } from '@/payload-types';

type ResponsiveHeroProps = {
  media: MediaType;
};

const ResponsiveHero: React.FC<ResponsiveHeroProps> = ({ media }) => {
  const { getAspectRatio } = useResponsiveSize();
  const aspectRatio = getAspectRatio();

  return (
    <div className="relative w-full mb-12 overflow-hidden rounded-lg">
      <div className={`aspect-[${aspectRatio}]`} style={{ aspectRatio }}>
        <Media
          resource={media}
          priority
          fill
          imgClassName="object-cover"
        />
      </div>
    </div>
  );
};

export default ResponsiveHero;