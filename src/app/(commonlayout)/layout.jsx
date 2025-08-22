import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function CommonLayout({ children }) {
  return (
    <>
      <SiteHeader />
        {children}
      <SiteFooter />
    </>
  );
}
