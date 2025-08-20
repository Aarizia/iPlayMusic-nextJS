import SiteFooter from "@/components/site-footer";
import IsPlaying from "@/providers/IsPlaying";
import Playlist from "@/providers/Playlist";

export default function SpecialHeaderLayout({ children }) {
  return (
    <IsPlaying>
      <Playlist>
        {children}
        <SiteFooter />
      </Playlist>
    </IsPlaying>
  );
}
