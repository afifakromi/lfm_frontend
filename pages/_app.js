import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
