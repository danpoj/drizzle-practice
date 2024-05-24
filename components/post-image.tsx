'use client';

import { cn } from '@/lib/utils';
import { shimmer } from '@/shimmer';
import Image from 'next/image';
import { useState } from 'react';

type Props = { image: string };

export const PostImage = ({ image }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        'relative aspect-square rounded-xl overflow-hidden bg-slate-100',
        isLoading && shimmer
      )}
    >
      <Image
        unoptimized
        src={image}
        fill
        alt='image'
        className='inset-0 absolute object-cover'
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};
