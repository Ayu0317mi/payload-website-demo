import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignIn } from "@/components/auth-component"; // Adjust the path as necessary

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
            <CardDescription className="text-center">Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <SignIn />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-600">
              Don&#39;t have an account?{' '}
              <a href="#" className="font-medium text-primary hover:underline">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}