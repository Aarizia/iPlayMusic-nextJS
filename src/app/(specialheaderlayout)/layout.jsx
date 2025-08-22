import SiteFooter from "@/components/site-footer";
import Playlist from "@/providers/Playlist";

export default function SpecialHeaderLayout({ children }) {
  return (
    <Playlist>
      {children}
      <SiteFooter />
    </Playlist>
  );
}
