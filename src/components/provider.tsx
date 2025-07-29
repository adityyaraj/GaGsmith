"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/them-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const ProviderWrapper: React.FC<ProvidersProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
    </>
  );
};
