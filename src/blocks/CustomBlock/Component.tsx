import React from 'react'
import RichText  from '@/components/RichText'

export type CustomBlockProps = {
  content: any
  disableInnerContainer?: boolean
}

export const CustomBlockComponent: React.FC<CustomBlockProps> = ({ content, disableInnerContainer }) => {
  return (
    <div className={disableInnerContainer ? '' : 'container'}>
      <div className="custom-block">
        <RichText data={content} enableGutter={false} />
      </div>
    </div>
  )
}