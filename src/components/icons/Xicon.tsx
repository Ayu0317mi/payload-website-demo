import React from 'react';
import { LucideProps } from 'lucide-react';

export const Xicon: React.FC<LucideProps> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17.7 3H21L13.9 11.1L22.5 21H16.2L10.9 14.8L4.8 21H1L8.5 12.5L0.5 3H7L11.8 8.7L17.7 3ZM16.5 19H18.3L7.6 5H5.7L16.5 19Z" />
    </svg>
  );
};

export default Xicon;