'use client';
import { Banner } from '@payloadcms/ui/elements/Banner'
import React, { useEffect, useState } from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>('User');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        
        // Try multiple API paths that might work in different environments
        let userData = null;
        const apiPaths = [
          '/api/users/me',
          `${window.location.origin}/api/users/me`,
          '/admin/api/users/me'
        ];
        
        for (const path of apiPaths) {
          try {
            console.log(`Attempting to fetch user data from: ${path}`);
            const response = await fetch(path);
            
            if (response.ok) {
              userData = await response.json();
              console.log('User data fetched successfully:', userData);
              break;
            }
          } catch (e) {
            console.log(`Fetch attempt failed for ${path}:`, e);
            // Continue to next path
          }
        }
        
        if (userData && userData.user) {
          setUserName(userData.user.name || userData.user.email || 'User');
          setError(null);
        } else {
          console.warn('Could not retrieve user data from any endpoint');
          setError('Could not load user data');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setError('Could not load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        {isLoading ? (
          <h4>Loading user information...</h4>
        ) : error ? (
          <h4>Welcome to your dashboard!</h4>
        ) : (
          <h4>Welcome to your dashboard, {userName}!</h4>
        )}
      </Banner>
      Here&apos;s what to do next:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' with a few pages, posts, and projects to jump-start your new site, then '}
          <a href="/" target="_blank">
            visit your website
          </a>
          {' to see the results.'}
        </li>
        <li>
          If you created this repo using Payload Cloud, head over to GitHub and clone it to your
          local machine. It will be under the <i>GitHub Scope</i> that you selected when creating
          this project.
        </li>
        <li>
          {'Modify your '}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            collections
          </a>
          {' and add more '}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            fields
          </a>
          {' as needed. If you are new to Payload, we also recommend you check out the '}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            Getting Started
          </a>
          {' docs.'}
        </li>
        <li>
          Commit and push your changes to the repository to trigger a redeployment of your project.
        </li>
      </ul>
      {'Pro Tip: This block is a '}
      <a
        href="https://payloadcms.com/docs/admin/custom-components/overview#base-component-overrides"
        rel="noopener noreferrer"
        target="_blank"
      >
        custom component
      </a>
      , you can modify it to suit your needs. It will be removed when you deploy your project for the first
      time. If you want to keep it, you can move it to a different file and remove the import from
      <code>payload.config.ts</code>.
    </div>
  )
}

export default BeforeDashboard