import type { AppProps, AppContext } from "next/app";
import { trpc } from "@/shared/api";
import { SessionProvider, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header } from "@/shared/ui/Header";

import "@/app/global.css";

function Auth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Ждём загрузки сессии
    if (!session && router.pathname !== "/auth/login" && router.asPath !== "/auth/login") {
      
      router.replace("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Загрузка...</div>;
  }

  return <>{children}</>;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <SessionProvider session={pageProps.session}>
        <Auth>
          <Header />
          <Component {...pageProps} />
        </Auth>
      </SessionProvider>
    </div>
  );
}

App.getInitialProps = async (ctx: AppContext) => {
  const session = await getSession(ctx.ctx);
  return {
    pageProps: {
      session,
    },
  };
};

export default trpc.withTRPC(App);