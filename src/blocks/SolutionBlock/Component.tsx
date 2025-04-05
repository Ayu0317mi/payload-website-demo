import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { ContentBlock, Page, Post } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { iconMap } from '@/components/ui/icons'
import type { LucideIcon } from 'lucide-react'

// Create a temporary type for SolutionBlock based on ContentBlock
type SolutionBlockProps = Omit<ContentBlock, 'blockType'> & {
  blockType: 'solution';
  introContent?: DefaultTypedEditorState;
  columns?: ColumnItem[];
}

// Define a type for the column item
type ColumnItem = {
  size?: 'oneThird' | 'half' | 'twoThirds' | 'full' | null;
  icon?: keyof typeof iconMap | null;
  richText?: DefaultTypedEditorState;
  enableLink?: boolean | null;
  link?: {
    type?: 'reference' | 'custom' | null;
    newTab?: boolean | null;
    reference?: {
      relationTo: 'pages' | 'posts';
      value: string | number | Page | Post;
    } | null;
    url?: string | null;
    label: string;
    appearance?: 'default' | 'outline' | null;
  };
  id?: string | null;
}

export const SolutionBlock: React.FC<SolutionBlockProps> = (props) => {
  const { columns, introContent } = props

  const colsSpanClasses: Record<string, string> = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      {introContent && (
        <div className="mb-10">
          <RichText className="max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-6 lg:gap-x-8">
        {columns &&
          Array.isArray(columns) &&
          columns.length > 0 &&
          columns.map((col: ColumnItem, index: number) => {
            const { enableLink, link, richText, size, icon } = col

            // Handle the case where size might be null or undefined
            const sizeKey = size || 'oneThird';
            const colSpanClass = colsSpanClasses[sizeKey] || '4'; // Default to 4 if not found

            const IconComponent = icon ? iconMap[icon] : null;

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colSpanClass}`, {
                  'md:col-span-2': sizeKey !== 'full',
                })}
                key={index}
              >
                <Card className="h-full overflow-hidden bg-white dark:bg-card rounded-xl shadow-sm border-neutral-100 dark:border-border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {IconComponent && (
                      <div className="mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                    )}
                    {richText && <RichText data={richText} enableGutter={false} />}

                    {enableLink && link && (
                      <div className="mt-4">
                        {link.label && (
                          <Button 
                            variant={link.appearance === 'outline' ? 'outline' : 'default'} 
                            size="sm" 
                            asChild
                          >
                            <CMSLink {...link} appearance={link.appearance === 'outline' ? 'outline' : 'default'} className="inline-flex items-center">
                              {link.label}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </CMSLink>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
      </div>
    </div>
  )
}