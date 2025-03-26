import "@rees/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen flex flex-col bg-[#008080]">
      <Component {...pageProps} />
    </div>
  );
}
