'use server';
// sørge for at scriptet afvikles på server, ekstra sikker på det

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


// nb ingen krøller fordi det ikke er react - lige nu er vi i et lag oven på express. der er express under motorhjelmen
// NB den må ikke være default fordi vi også skal kunne lave post, put mv i nogle tilfælde. ikke default selvom der ikke er andet end get
export async function GET(request) {

    // vi skal have fat i den lange kode i url'en
    //console.log(request);
    // opdater siden og kig i terminalen. der er searchparams. vi logger (husk at opdatere siden)
    //console.log(request.searchParams);
    // vi skal have fat i query parametre i en next.js api route. hvordan? prøv request url:
    //console.log(request.url);
    // prøv nextUrl:
    //console.log(request.nextUrl);
    // får objekt, som indeholder en masse ting, herunder search og searchparams
    // vi kan bruge .get fordi searchParams er en instantiering af js klassen URLSearchParams
    //console.log(request.nextUrl.searchParams.get('code'));

    const code = request.nextUrl.searchParams.get('code');
    // ovenstående er vores authorization code. hvad skal vi med den kode? requeste et access token

    // lave en cookie:
    const cookieStore = await cookies();

    // brug try...catch til at fejlfinde fetchet

    // find request access token under authorization tutorial. her kan du se hvordan du gør og hvad der skal med i en sådan request
    // vi skal bruge fetch. find linket i kodeeksemplet i spotify docs
    const response = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // authorization skal indeholde client id og client secret og derfor skal den krypteres
            // den skal indeholde ordet basic og vi skal lave en base 64 encoded string af client id og client secret
            // js har en funktion, der kan lave base 64 encoded string: btoa()
            // skal stå i client id: client secret form, så der skal også være kolon med
            // NB: js ved godt at den skal concatenate string inden den udfører funktion btoa på stringen
            'Authorization': `Basic ${btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)}`

        },
        // indsætte værdier for grant_type, code og redirect_uri i body via url string:
        /* body: `grant_type=authorization_code`
        + `&code=${code}`
        + `&redirect_uri=${process.env.CALLBACK_URL}` */
        // kan også skrives:
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.CALLBACK_URL}`
    });

    // NB: code kan kun bruges en gang, hvis vi refresher skal vi tilbage til login og requeste en ny code

    const data = await response.json();

    //console.log('data', data);
    // vi forventer json objekt, som indeholder access token, refresh token mm.
    // console.log(data.access_token);

    // gemme data.access_token et sted så vi kan bruge den i appen
    // ikke localstorage - brug en cookie
    // hvordan laver man en cookie?
    // vi kan skrive cookies i route handlers. men hvordan? importer cookies funktion oppe ved consts og så:
    cookieStore.set({
        name: 'iplaymusic_access_token',
        value: data.access_token,
        // NB: maxAge er i sekunder
        maxAge: data.expires_in,
    });
    
    // lave en refresh token:
    cookieStore.set({
        name: 'iplaymusic_refresh_token',
        value: data.refresh_token,
        // NB: maxAge er i sekunder. her vil vi gerne have vores refresh cookie i 30 dage
        // refresh token har en meget lang udløbsdato. ideen er at vi har en access token i en time (fra spotify)
        // du får kun lov til at genopfriske dit access token hvis dit refresh token er gyldigt
        // hvis jeg f.eks. stopper med at betale mit abonnement til spotify, så kan de gøre sådan at mit refresh token ikke længere er gyldigt
        // det er ikke en sporingscookie, men en nødvendig cookie, så hvis jeg f.eks. har trykket "husk mig" når jeg logger ind, så er det en nødvendig cookie og der er ikke regler for det fra eu
        maxAge: 60 * 60 * 24 * 30,
    });


    // redirecte hen til hjemmesiden (importer fra next/navigation):
    redirect('/');
}