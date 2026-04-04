import "./globals.css";
import AppContextProvider from "@/store/appContextProvider";
import ReactQueryProvider from "@/store/reactQueryProvider";
import ToastProvider from "@/components/toastProvider";

export const metadata = {
  title: "Drive Elite",
  description:
    "Drive Elite - Rent premium cars effortlessly. Browse, book, and drive top-quality vehicles at affordable prices with our reliable car rental service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <AppContextProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <ToastProvider />
        </AppContextProvider>
      </body>
    </html>
  );
}
