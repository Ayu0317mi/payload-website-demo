export const calculateReadTime = (content: any): string => {
  // Function to count words in a text string
  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).length;
  };

  // Function to extract text from rich text content
  const extractText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (!node) return '';
    
    if (node.text) return node.text;
    
    if (node.children) {
      return node.children.map((child: any) => extractText(child)).join(' ');
    }

    if (Array.isArray(node)) {
      return node.map(item => extractText(item)).join(' ');
    }

    return '';
  };

  // Extract all text from the rich text content
  const text = extractText(content);
  
  // Calculate reading time
  const words = countWords(text);
  const wordsPerMinute = 225; // Average reading speed
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
}