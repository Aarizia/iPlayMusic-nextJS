import "./globals.css";
import "../style/main.scss";
import Theme from "@/providers/Theme";
import PlayerProviderEksempel from "@/providers/PlayerProviderEks";
import PlayerEksempel from "@/components/player";

/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

// det her er metadata objektet
// vi har en titel og en beskrivelse.
// men hvordan får jeg det mere dynamisk? jeg vil gerne have sidens titel med eller albummets titel hvis jeg er på album detaljesiden
// lave dynamisk title med title template. der er et % tegn, hvad er det?
// hvorfor sidens navn før appens navn? sidens navn er vigtigere end appens, og der kan være begrænset plads i browsertabben hvis mange er åbne samtidig
// pipe | er det mest almindelige til at adskille sidens navn og appens navn, så det bruger vi

export const metadata = {
  //title: "iPlayMusic",
  title: {
    template: '%s | iPlayMusic',
    // default værdi: hvis en underside ikke har en title defaulter den til default-værdien
    default: 'iPlayMusic'
  },
  description: "A music player web app",
};

export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <body className={`antialiased`}>
              <div className="wrapper">
                <PlayerProviderEksempel>
                  <Theme>
                    {children}
                    <PlayerEksempel />
                  </Theme>
                </PlayerProviderEksempel>
              </div>
            </body>
        </html>
    )
}