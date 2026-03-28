import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AccountDashboard from "@/components/AccountDashboard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Customer Account",
  description: "Manage your Cosmic Remedies by Sia customer session and continue your shopping journey.",
  path: "/account",
  noIndex: true,
});

const AccountPage = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/?auth=login");
  }

  if (session.user.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Customer Area</p>
            <h1 className="mt-3 font-display text-4xl font-bold">Your Cosmic Remedies account</h1>
            <p className="mt-4 text-muted-foreground">
              Keep your customer session in one place and use this dashboard as the base for future purchases and guide access.
            </p>
          </div>
          <AccountDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
