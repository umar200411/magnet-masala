import { ShoppingTools } from "@/components/shopping-tools";
import { ThemeProvider } from "@/components/theme";
import type { Metadata } from "next";
import Script from "next/script";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";
import { StoreProvider,Header,Footer } from "@/components/store";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Magnet Masala | Har dish ka apna masala",template:"%s | Magnet Masala"},description:"Explore Magnet Masala recipe blends, everyday spices and quick seasonings. Build your basket and continue your order on WhatsApp.",icons:{icon:"/logo.jpg"},openGraph:{title:"Magnet Masala",description:"Everyday spices. Favourite recipes. One kitchen shelf.",siteName:"Magnet Masala",type:"website",url:"/",images:[{url:"/logo.jpg",alt:"Magnet Masala"}]},twitter:{card:"summary",title:"Magnet Masala",description:"Everyday spices. Favourite recipes. One kitchen shelf.",images:["/logo.jpg"]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><Script id="google-gtag" src="https://www.googletagmanager.com/gtag/js?id=G-R4E8KDS4RJ" strategy="beforeInteractive"/><Script id="google-gtag-config" strategy="beforeInteractive" dangerouslySetInnerHTML={{__html:`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-R4E8KDS4RJ');`}}/><Script id="matomo-tracker" strategy="beforeInteractive" dangerouslySetInnerHTML={{__html:`var _paq = window._paq = window._paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="https://umarsaeedqureshi.matomo.cloud/";
  _paq.push(['setTrackerUrl', u+'matomo.php']);
  _paq.push(['setSiteId', '2']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src='https://cdn.matomo.cloud/umarsaeedqureshi.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
})();`}}/><ThemeProvider><StoreProvider><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/><ShoppingTools/></StoreProvider></ThemeProvider></body></html>}
