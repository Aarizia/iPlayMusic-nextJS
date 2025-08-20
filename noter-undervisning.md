onsdag 060825:

lave iplaymusic i next projekt
lav nyt projekt og transporter komponenter og layouts fra react over i next projektet
slutningen af dagen: transporter koden over i next så du kan bladre rundt i det i views



--------------------------------------------------------------------------------------------------------------------------------------------
torsdag 070825:

openauth flow i forbindelse med Spotify - samme flow uanset tjeneste
hvad prøver vi at opnå?
vi har en tjeneste, som er adskilt fra vores egen tjeneste, som står for authentication delen (denne del er udliciteret)
eks: logge ind på social media - eks. en avishjemmeside, politiken.dk har ikke noget at gøre med google - logger ind med google konto. google har sin egen interne openauth. du kan logge ind på youtube, Gmail, google docs med google konto, osv.

på vores egen client har vi en knap vi kan trykke på, hvor der står eks. log ind med google, log ind med facebook osv.
hvad sker der når vi trykker?
vi sendes over til tjenesten, der skal authenticate os, altså tjekke om vi er hvem vi siger, vi er.
i eksemplet: vi sendes hen til Spotifys hjemmeside, får en formular med brugernavn og adgangskode og skal logge ind med den
hvis vi allerede er logget ind bliver vi sendt hen til auth. side og tilbage igen med det samme
cookies holder styr på, om vi er logget ind
hvis ikke logget ind: auth side tjekker om brugernavn og adgangskode er rigtigt og foregår serverside (må ikke foregå i clienten)
problem: hvis en anden tjeneste tjekker for os - authenticatorsiden skal vide, hvilken hjemmeside der beder om at blive logget ind. hvordan ved den hvilken hjemmeside vi kommer fra? 
knappen vi trykker på er i virkeligheden et link, som har en kode i sig, der sendes med i url'en, som beskriver hvilken side vi kommer fra. denne kode skal genereres af os, og det gøres ved at registrere vores app inde hos auth.udbyderen (her Spotify).
gå ind på developer.spotify.com og opret en bruger med studiemail
gå ind på deres docs under web api og start på overview i menuen
vi får app credentials, et brugernavn og en kode, som skal gemmes specielt
gå til dashboard, verificer evt email hvis den beder om det
tryk create app
vælg 
	navn (egentlig ligemeget men kald den det samme som projektet
	beskrivelse (her music app)
	redirect - vi holder det lokalt og skriver 	http://localhost:3000/api/auth/callback (du kan godt vælge flere)
	NB: den er ikke sikker, fordi det er http og ikke https, hvad gør vi?
	hvis vi bruger lokal, brug specifik adresse, altså
	http://127.0.0.1:3000/api/auth/callback
	(ip adressen)
	127.0.0.1:3000 er en intern lokaladresse på min maskine. localhost er et 	alias for dette tal.
	vælg web api
nu får jeg client id og client secret
de skal gemmes
i projektet:
lav en ny fil, der hedder .env.local i roden af mappen (uden for src)
denne fil er grå fordi den er nævnt inde i gitignore og bliver ikke pushet til GitHub, kommer altså ikke til at ligge offentligt på GitHub. det er godt fordi info i filen er hemmelig.
gem client id og client secret derinde. nb, lav ikke mellemrum imellem variabelnavn, lighedstegn og værdi.
du kan generere en ny secret senere hvis du vil (hvis nogen har kigget på din skærm ved et uheld).
sæt også callback url ind, den kan du finde på spotifysiden ved at scrolle lidt ned
vi kalder dem client id og secret fordi det er det Spotify kalder dem.

i dashboardet:
gå til user management
vi kan tilføje brugere, som skal have adgang til vores app med deres Spotify konto i dev mode
tilføj mig selv med den mail jeg har oprettet min Spotify konto under (altså her studiemail).
så kan vi logge ind og teste appen i dev mode
Emma Luna + studiemail
Emma L L + privat mail

gå til web api doc under getting started
vi har adgang til credentials, id og secret
vi kan nu få access token, som skal bruges i authorization til at få en access token, der skal bruges til at lave api requests

tryk på request access token
lave en post request til adresse (se dokumentation for adr)
have en header, der indeholder url parametre (se doc for url mv og kodeeksempel)
vi får en access token tilbage, der er gyldig i en time - det er i json format

kigge på authorization code tutorial. spring tekst over og find kodeeksempel
det er js - eksemplet er med express server

det andet eks:
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

scope: indeholder, hvad appen skal give adgang til, eks brugernavn og kode, og playlister mv. der er længere nede 
- en response type (hedder også grand types, det er den måde vi gerne vil logge 	ind med. med client credentials har vi ikke adgang til så meget. hvis vi 	logger ind med code skal brugeren samtykke til at vi må få adgang til 	deres oplysninger, og så kan vi gøre flere ting.
- client id skal være det vi tog fra oprettelsen af vores app
- en liste over scopes (en string som er query en query-string. hvilke oplysninger 	vi skal have adgang til. NB: %20 er tegnet for mellemrum i sådanne 	strings. forskel på + og %20 (plus skal forstås som mellemrum, %20 er 	mellemrum)
- redirect url fra env filen - en ide ved at gemme i env filen er at vi kan have 	værdier af variablerne i dev mode og build mode. vi kan have forskellige 	env filer til dev og build. i build har vi environment variables. koden 	her kan bruges i begge miljøer.
- state er optional. vi dropper det for nu (det kan tjekke om folk misbruger appen 	ved at logge for meget ind)

show dialogue - skal være true eller false. Spotify auth hver gang du bruger appen eller at den husker det. brian anbefaler at sætte den til true mens vi tester
hvordan?
gå til loginside i appen
brian har en login knap på sin side, der egentlig er et link
det skal vise hen til det rigtige sted. hvad skal vi skrive?
url'en fra kodeeks.
linket kan evt være one touch login'et
udfyld linket med info fra kodeeksemplet og env filen. se fil og forklaringer ovenfor.

teste appen
hold cursor hen over linket uden for dev mode, i bunden af skærmen skal du gerne kunne se et meget langt link
klik på linket
hvis der i url'en står undefined et sted, så skal du fejlfinde koden
på siden: godkend (mig som emma, privatperson, altså brugeren - må få adgang til mine Spotify informationer)
vi sendes tilbage til callback url'en - tilbage til egen app men med en kode, der er forskellig for os alle sammen (se den i url'en)
vi skal lave api mappe i projektet. læg den i app mappen
i den mappe, lav auth mappe, i den, lav callback mappe, i den lav route.js fil
(nb: auth mappen må gerne hedde authentication i stedet, det skal bare fixes alle steder så, inkl. inde i Spotify callback url stedet

hvordan laver vi en form url encoded body?


lave en cookie
kig i next docs under cookies
(functions cookies i menuen)

find ud af om cookien virker: 
log ind igen via siden og efter:
i dev tools - application - cookies - se om den er der

til eksamen:
api'et vi får udleveret er meget simplere
sende brugernavn og adg kode afsted fra en form til et api og få access-token tilbage

når cookie udløber, forsvinder den af sig selv?
i chrome, ja
i Firefox, nej - men du kan bede om en ny med refresh token


nu kan vi begynde at lave requests til api'et
eks: albums - get new releases
hvordan gør vi?

NB: hvis problem med access_token.value, så log ind igen
du kan se eksempel på hvordan data er struktureret på api dokumentationen.


-------------------------------------------------------------------------------------------------------------------------------------
fredag 080825:

vi arbejder api'et ind i appen 
rod selv med det
få sider og detaljesider til at virke



-----------------------------------------------------------------------------------------------------------------------------------------
tirsdag 190825:

lave player

vi har en liste over sange
når jeg trykker på en sang vil jeg gerne have en afspiller frem
brian forklarer principper, vi skal se om vi kan finde ud af at bruge dem til vores app specifikt

brian har:
komponentmappe
	ui
	typography

brian har en detaljevisning til album
få fat i cookies
kald til api'et om data fra albummet. id står i urlen
skriver billede ud, albumtitel og antal tracks
der er et track item komponent, som printes ud i en liste, der mappes

track item:
spilleknap, titel, kunstner, duration

ideen er at jeg skal kunne klikke på sangen og så kommer der en player frem
hvordan gør vi?
den player, vi gerne vil ha frem, skal kunne se ud på to måder:
en med billeder og en fallback til hvis der ikke er billeder
jeg vil gerne ændre lidt og lave det som overlay
fordi: i stedet for at lave det som en underside, laver jeg det som et overlay
fordi så spiller musikken videre selvom jeg navigerer rundt i appen
jeg vil gerne lave en fuld skærm og også bibeholde menuen i bunden
jeg vil også gerne have en mindre version så jeg kan navigere rundt i appen mens playeren vises

vi skal tænke os lidt om
overlayet skal kunne vises alle steder i appen
hvor skal det ligge for at vi kan få det skjult eller vist uanset hvor i appen vi er
læg det i layoutet - det overordnede layout i app root

skal kunne klikke på komponentet for at stoppe og starte mv, så det skal være client side

interaktivitet kræver use client i next. det sker efter siden er renderet

tab aktive elementer:
links, input, radioelements, buttons. prøv dig frem

vi må gerne have buttons inde i buttons men ikke links inde i buttons eller omvendt. heller ikke links inde i links.
lav ikke onclick på f.eks. articles, så får du problemer ift. skærmlæsere mv.



------------------------------------------------------------------------------------------------------------------------------------------
onsdag 200825:

lave player fortsat
