import { ShoppingTools } from "@/components/shopping-tools";
import { ThemeProvider } from "@/components/theme";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";
import { StoreProvider,Header,Footer } from "@/components/store";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Magnet Masala | Har dish ka apna masala",template:"%s | Magnet Masala"},description:"Explore Magnet Masala recipe blends, everyday spices and quick seasonings. Build your basket and continue your order on WhatsApp.",icons:{icon:"/logo.jpg"},openGraph:{title:"Magnet Masala",description:"Everyday spices. Favourite recipes. One kitchen shelf.",siteName:"Magnet Masala",type:"website",url:"/",images:[{url:"/logo.jpg",alt:"Magnet Masala"}]},twitter:{card:"summary",title:"Magnet Masala",description:"Everyday spices. Favourite recipes. One kitchen shelf.",images:["/logo.jpg"]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><ThemeProvider><StoreProvider><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/><ShoppingTools/></StoreProvider></ThemeProvider></body></html>}
