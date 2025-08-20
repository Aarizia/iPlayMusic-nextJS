/* import { Geist, Geist_Mono } from "next/font/google"; */
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import IsPlaying from "@/providers/IsPlaying";

export default function CommonLayout({ children }) {
  return (
    <IsPlaying>
      <SiteHeader />
        {children}
      <SiteFooter />
    </IsPlaying>
  );
}
