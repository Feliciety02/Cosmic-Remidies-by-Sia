import HomePage from "@/customer/home-page";

type AuthMode = "login" | "create";

interface PageProps {
  searchParams?: {
    auth?: string | string[];
  };
}

const getAuthMode = (value?: string | string[]): AuthMode | undefined => {
  const authValue = Array.isArray(value) ? value[0] : value;
  return authValue === "login" || authValue === "create" ? authValue : undefined;
};

const Page = ({ searchParams }: PageProps) => <HomePage initialAuthMode={getAuthMode(searchParams?.auth)} />;

export default Page;
