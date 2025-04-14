'use client';

import React, { useState } from 'react';
import { Facebook, Linkedin, Mail, Share2, Link, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Xicon } from '@/components/icons/Xicon';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  url, 
  title, 
  description = "", 
  className,
  size = "default",
  variant = "outline",
}) => {
  // Determine the full URL for sharing
  const [shareUrl] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return url; // Return the URL as is during SSR
    }
    
    // Check if the URL is already absolute (starts with http:// or https://)
    if (url.match(/^https?:\/\//)) {
      return url; // Return as is if it's already a full URL
    }
    
    // Get the base URL
    const baseUrl = window.location.origin;
    
    // Combine with the path, ensuring we don't have double slashes
    return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  });
  
  const [linkCopied, setLinkCopied] = useState(false);

  // Prepare the sharing URLs
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + "\n\n" + shareUrl)}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (typeof window !== 'undefined') {
      window.open(shareLinks[platform], '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleCopyLink = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <div className={cn('flex relative', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleShare("linkedin")}>
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("twitter")}>
            <Xicon className="mr-2 h-4 w-4" />
            X
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("facebook")}>
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("email")}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            {linkCopied ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>Link copied!</span>
              </>
            ) : (
              <>
                <Link className="mr-2 h-4 w-4" />
                <span>Copy link</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};