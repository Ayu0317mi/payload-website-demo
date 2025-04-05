import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'icon',
    type: 'select',
    options: [
      { label: 'Activity', value: 'activity' },
      { label: 'Alert Circle', value: 'alert' },
      { label: 'Anchor', value: 'anchor' },
      { label: 'Archive', value: 'archive' },
      { label: 'Arrow Up Right', value: 'arrowUpRight' },
      { label: 'Award', value: 'award' },
      { label: 'Baseline', value: 'baseline' },
      { label: 'Battery', value: 'battery' },
      { label: 'Binary', value: 'binary' },
      { label: 'Blocks', value: 'blocks' },
      { label: 'Bookmark', value: 'bookmark' },
      { label: 'Box', value: 'box' },
      { label: 'Briefcase', value: 'briefcase' },
      { label: 'Building', value: 'building' },
      { label: 'Chef Hat', value: 'chef' },
      { label: 'Currency', value: 'currency' },
      { label: 'Code', value: 'code' },
      { label: 'Compass', value: 'compass' },
      { label: 'Cloud', value: 'cloud' },
      { label: 'Code 2', value: 'code2' },
      { label: 'Database', value: 'database' },
      { label: 'File Text', value: 'file' },
      { label: 'Crown', value: 'crown' },
      { label: 'Database', value: 'database' },
      { label: 'File', value: 'file' },
      { label: 'Flag', value: 'flag' },
      { label: 'Globe', value: 'globe' },
      { label: 'Hammer', value: 'hammer' },
      { label: 'Heart', value: 'heart' },
      { label: 'Help Circle', value: 'help' },
      { label: 'Home', value: 'home' },
      { label: 'Image', value: 'image' },
      { label: 'Library', value: 'library' },
      { label: 'Life Buoy', value: 'lifebuoy' },
      { label: 'Lightbulb', value: 'lightbulb' },
      { label: 'Link', value: 'link' },
      { label: 'Lock', value: 'lock' },
      { label: 'Mail', value: 'mail' },
      { label: 'Map', value: 'map' },
      { label: 'Message', value: 'message' },
      { label: 'Microscope', value: 'microscope' },
      { label: 'Moon', value: 'moon' },
      { label: 'Music', value: 'music' },
      { label: 'Paint Bucket', value: 'paint' },
      { label: 'Palette', value: 'palette' },
      { label: 'Pencil', value: 'pencil' },
      { label: 'Phone', value: 'phone' },
      { label: 'Pie Chart', value: 'chart' },
      { label: 'Puzzle', value: 'puzzle' },
      { label: 'Rocket', value: 'rocket' },
      { label: 'Search', value: 'search' },
      { label: 'Settings', value: 'settings' },
      { label: 'Shield', value: 'shield' },
      { label: 'Shopping Bag', value: 'shop' },
      { label: 'Star', value: 'star' },
      { label: 'Sun', value: 'sun' },
      { label: 'Table', value: 'table' },
      { label: 'Target', value: 'target' },
      { label: 'Terminal', value: 'terminal' },
      { label: 'Timer', value: 'timer' },
      { label: 'Trophy', value: 'trophy' },
      { label: 'TV', value: 'tv' },
      { label: 'Users', value: 'users' },
      { label: 'Wallet', value: 'wallet' },
      { label: 'Wrench', value: 'wrench' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const SolutionBlock: Block = {
  slug: 'solution',
  interfaceName: 'SolutionBlock',
  labels: {
    singular: 'Solution Block',
    plural: 'Solution Blocks',
  },
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}