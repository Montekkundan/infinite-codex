import Layout from "@/components/dom/Layout";
import StyledComponentsRegistry from "@/lib/registry";
import "@/styles/globals.css";
import { Bebas_Neue } from 'next/font/google'
export const metadata = {
    title: "Starter",
    description: "Welcome to Next.js with r3f",
};
const bebas_neue = Bebas_Neue({
    weight: '400',
    subsets: ['latin-ext'],
    display: 'swap',
  })
   


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={bebas_neue.className}>
            <head  />
            <body>
                <StyledComponentsRegistry>
                    <Layout>{children}</Layout>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
