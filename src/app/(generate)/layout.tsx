import LoginButton from "@/components/login";
import Navbar from "@/components/navbar";
import { ProviderWrapper } from "@/components/provider";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth();
    if (!user)
    return( 
    <div><LoginButton /></div>
)
  return (
    <ProviderWrapper>
      <div className="flex flex-row h-screen">
        <div className="flex min-h-screen">
          <Navbar />
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProviderWrapper>
  );
}
