import {Montserrat} from "next/font/google";
import {ThemeProvider} from "@/components/ThemeProvider";
import Container from "@/components/Container";
import TanstackProvider from "@/components/TanstackProvider";
import Header from "@/components/Header";
import {Toaster} from "react-hot-toast";
import { AuthProvider } from '@/context/AuthContext';
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700"],
    subsets: ["cyrillic"],})

export const metadata = {
    title: "Обмен книгами",
    description: "Олимпиада PROD",
};

export default function RootLayout({children}) {

    return (
        <html lang="ru">
            <body className={`${montserrat.className} antialiased bg-background text-foreground`}>
            <ThemeProvider
                attribute="class"
                enableSystem
                disableTransitionOnChange
            >
                <TanstackProvider>
                    <Toaster position={'top-center'} gutter={5} />
                    <AuthProvider>
                        <ErrorBoundary>
                            <Header/>
                            <Container>
                                <main className="px-4 sm:px-6 lg:px-8">
                                    {children}
                                </main>
                            </Container>
                        </ErrorBoundary>
                    </AuthProvider>
                </TanstackProvider>
            </ThemeProvider>
            </body>
        </html>
    );
}
