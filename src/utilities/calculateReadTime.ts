type BaseNode = {
  type: string;
  [key: string]: unknown;
}

type Content = {
  root: BaseNode;
}

export const calculateReadTime = (content: Content | undefined): string => {
  if (!content) return '0 min read'
  
  const wordsPerMinute = 200
  let wordCount = 0

  // Recursively traverse the content tree to count words
  const countWords = (node: BaseNode): number => {
    if ('text' in node && typeof node.text === 'string') {
      return node.text.trim().split(/\s+/).length
    }

    if ('children' in node && Array.isArray(node.children)) {
      return node.children.reduce((acc: number, child: BaseNode) => acc + countWords(child), 0)
    }

    return 0
  }

  wordCount = countWords(content.root)
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}