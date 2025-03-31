import { Block } from 'payload'

export const CustomBlock: Block = {
  slug: 'customBlock',
  labels: {
    singular: 'Custom Block',
    plural: 'Custom Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
    // Add any other fields your CustomBlock needs
  ],
}