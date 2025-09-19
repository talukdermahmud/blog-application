import "./globals.css";
import { AuthProvider } from "@/lib/AuthProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata = {
  title: "Blog Appication",
  description: "A Next.js application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
