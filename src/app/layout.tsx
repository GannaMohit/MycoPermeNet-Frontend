import type { Metadata } from "next";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { ApolloWrapper } from "@/lib/apolloWrapper";
import { Menubar } from "primereact/menubar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pages = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      url: "/"
    },
    {
      label: 'Atomic',
      icon: 'pi pi-star',
      url: "/"
    },
    {
      label: 'Atomic List',
      icon: 'pi pi-star',
      url: "/atomicList"
    },
    {
      label: 'Molecular',
      icon: 'pi pi-star',
      url: "/molecule"
    },
    {
      label: 'Similarity',
      icon: 'pi pi-star',
      url: "/similarity"
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope'
    }
  ]
  return (
      <PrimeReactProvider>
        <html lang="en">
          <head>
            <script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
          </head>
          <body>
            <ApolloWrapper>
              <Menubar model={pages} />
              {children}
            </ApolloWrapper>
          </body>
        </html>
      </PrimeReactProvider>

  );
}
