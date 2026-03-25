import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted px-4">
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
