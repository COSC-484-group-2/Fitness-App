import "./globals.css";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/client-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Fitness App",
    description: "Fitness App Group Project",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,black,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                            width={200}
                            height={200}
                            x="90%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none"/>
                        </pattern>
                    </defs>
                    <svg x="90%" y={-1} className="overflow-visible fill-gray-900">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"/>
                </svg>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}
