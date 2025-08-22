import { NextResponse } from "next/server";

// vi skal eksportere en funktion, der hedder middleware og har et request objekt
// vi skal returnere hvad der skal ske, f.eks. hvis vi vil redirecte
// hvis vi ikke returnerer noget, så fortsætter vi bare til det sted, vi var på vej hen

export default async function middleware(request) {

    const {pathname} = request.nextUrl;

    if (pathname.includes('/login') || pathname.includes('/api') || pathname.includes('/splash-screen')) {
        
        // når vi returnerer ingenting, så kører vores routing bare videre uden at blive redirected
        return;
    }

    // tjekke om vi har access token: find using cookies under middleware.js docs
    // vi kan læse cookies gennem middleware. vi kan også spørge om cookien er der. returnerer true hvis cookien findes. 
    // vi spørger om cookien ikke er der
    if (!request.cookies.has('iplaymusic_access_token')) {
        
        console.log("middleware: No access token");

        // hvis vi heller ikke har refresh token:
        if (!request.cookies.has('iplaymusic_refresh_token')) {

        console.log("middleware: no refresh token. Redirecting to /login");
        // sendes hen til bestemt url
        return NextResponse.redirect(new URL('/login', request.url));
        }

        console.log("middleware: refresh token exists. Attempting to fetch new access token.")

        //NB: vi arbejder kun med simpel access token til eksamen
        // hvis vi har refresh token og ikke access token, så skal vi refreshe vores access token
        // kig i spotify web api doc under tutorials, refreshing tokens:
        // vi laver en request som indeholder body parameter med grand_type og refresh token (vi behøver ikke client id)
        // i headeren skal der være Content-Type (vi behøver ikke authorization code)
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)}`
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: request.cookies.get('iplaymusic_refresh_token').value,
                client_id: process.env.CLIENT_ID
            })
        });
        
        const data = await response.json();
        // data burde nu indeholde et nyt access token, data.access_token
        // gemme refresh token i cookie

        console.log("middleware: data from spotify:", data);

        // vi skal have et response objekt, som er det vi bruger til at manipulere vores cookies.
        // vi henter det fra nextresponse.next
        const nextResponse = NextResponse.next();
        nextResponse.cookies.set('iplaymusic_access_token', data.access_token, {
            maxAge: data.expires_in
        });

        return nextResponse;
        
        // data.access_token svarer til value i route handleren, hvor vi opretter en cookie
        // vi kan kun bruge cookieStore i serverside components og route handlers.
        // navn er det vi skriver i '' (skal være det samme som det navn vi brugte i route handleren)
        // tjekke om det virker: slet din access token og log ind igen
        // nu får du både access token og refresh token
        // slet din access token
        // kan den selv genere en ny access token ud fra refresh token?
    }
    // vi har nu en refresh token, der gælder 30 dage

    // tjek om session cookie eksisterer
    if (!request.cookies.has('iplaymusic_session_token')) {

        //const nextResponse = NextResponse.next();
        const nextResponse = NextResponse.redirect(new URL('/splash-screen', request.url), {
            // status 302: found (redirection response for at undgå at browseren springer redirectet over fordi den er vant til at der altid skal redirectes)
            status: 302,
        });

        // sætte cookien
        nextResponse.cookies.set('iplaymusic_session_token', true);
        
        //skal nextResponse returneres?


        // hvis !eksis -> redir. splash
/*         return NextResponse.redirect(new URL('/splash-screen', request.url), {
            status: 302,
        }); */
        return nextResponse;
    }

    return;
}

// config indeholder et objekt med en property, der hedder matcher. matcher kan være string eller array
// vi kan skrive hvilke urls det skal gælde for. vi kan skrive mønstre. eks: matcher 'about/:path*'
// mønsteret gælder for alle url'er der hedder about/... hvor .... er alting
// vores matcher skal gælde for alle routes undtagen login og evt splash
// '/:path* gælder for alting. også api'et, for det er også en del af vores router
// få den til at ignorere nogle paths: evt. bruge missing property (den er ny, så vi vender tilbage til den)
// i middlewaret kan vi kigge på nextUrl. altså request.nextUrl, hvad indeholder pathname? /api og /login må gerne køre igennem men på alle andre routes skal vi tjekke om cookien er der

export const config = {
    // matcher alle paths:
    //matcher: ['/:path*']
    // NB: problem: den blocker også node_modules, stylesheets mv. så skriv de faktiske sider i stedet:
    matcher: ['/', '/albums', '/playlists', '/categories', '/player/:path*', '/album/:path*']
}