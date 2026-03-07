import "@/styles/globals.css";
import "react-circular-progressbar/dist/styles.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        authCheck(router.asPath);

        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [router]);

    const authCheck = (url: string) => {
        const publicPaths = ['/login', '/signup'];
        const path = url.split('?')[0];

        const userId = localStorage.getItem('userId');

        if (!userId && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
            });
        } else if (userId && publicPaths.includes(path)) {
            // Logged in users shouldn't see login page
            setAuthorized(true);
            router.push('/');
        } else {
            setAuthorized(true);
        }
    };

    return authorized ? <>{children}</> : <div className="h-screen flex items-center justify-center text-eco font-medium">Loading...</div>;
}

import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '123456789-mock-client-id.apps.googleusercontent.com'}>
            <AuthGuard>
                <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                    <Navbar />
                    <div className="flex-1">
                        <Component {...pageProps} />
                    </div>
                </div>
            </AuthGuard>
        </GoogleOAuthProvider>
    );
}
