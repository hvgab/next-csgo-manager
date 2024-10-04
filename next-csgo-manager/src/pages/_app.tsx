import { AppProps } from "next/app";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  console.log("API mocking enabled");
  require("../mocks");
} else {
  console.log("API mocking disabled");
  console.log("API URL: ", process.env.NEXT_PUBLIC_API_URL);
  console.log("API Mocking: ", process.env.NEXT_PUBLIC_API_MOCKING);
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
