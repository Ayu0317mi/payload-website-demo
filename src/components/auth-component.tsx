'use client'

import { signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

function SignIn({
    provider = 'google',
    ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    return (
        <Button
            onClick={() => signIn(provider, { callbackUrl })}
            className="w-full h-10 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-gray-300 rounded-md transition-all duration-200 flex items-center justify-center gap-2 px-3"
            variant="outline"
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="18"
                height="18"
                className="mr-2"
            >
                <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            Continue with Google
        </Button>
    )
}
export function SignOutButton() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSignOut = () => {
        signOut({ redirect: true, callbackUrl: '/' }).then(() => {
            router.push('/')
        })
        setOpen(false)
    }

    //when the user clicks on the button, it will call the handleSignOut function


    return (
        <>
            <Button
                variant="outline"
                className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={handleSignOut}
            >
                Sign Out
            </Button>

            <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>


            {/*        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Sign Out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be logged out of your account and redirected to the home page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSignOut}>Sign Out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
 */}      </>
    )
}
export { SignIn, signOut }