'use client';

import { PulseLoader } from 'react-spinners';

type componentLoader = {
  text: string;
  color: string;
  loading: boolean;
  size?: number;
};

export const ComponentLevelLoader = ({
  text,
  color,
  loading,
  size,
}: componentLoader) => {
  return (
    <span className='flex gap-1 items-center'>
      {text}
      <PulseLoader
        color={color}
        loading={loading}
        size={size || 10}
        data-testid='loader'
      />
    </span>
  );
};
