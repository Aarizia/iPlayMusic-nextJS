import IsPlaying from "@/providers/IsPlaying";

export default function FullScreenLayout({ children }) {
  return (
    <IsPlaying>
      {children}
    </IsPlaying>
  );
}
