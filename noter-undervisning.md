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

fejlfinde på fetches:

lav try catch på utility filen
	hvad er response? ok?
	pakke fetchet ind i try catch
hvad skal der ske hvis det fejler?
	throw new error -> error.js page
	køre funktionen notFound() for at få fejl 404
overvej hvilken situation jeg vil gøre hvad


lave player fortsat:
hvordan får vi afspillet musik?
når vi klikker på et track og ser playeren skulle vi meget gerne i consollen have info om tracket
vi mangler preview url'en, som er null
vi har i stedet uri, som vi kan bruge til noget
den består af trackets id bl.a. spotify:track:id
vi kan bruge det sammen med iframe tagget til f.eks at vise video og lyd
men hvad er iframe?
en form for objekt som renderer en hjemmeside eller en applikation. vi kan vise en anden hjemmeside på vores hjemmeside
et vindue hvor vi kan embedde en anden hjemmeside
iframe: almindeligt html tag, virker i alle browsere. med iframe kan vi vise en anden http/https adresse på vores egen hjemmeside
jeg har en ramme på min hjemmeside som viser en anden hjemmeside
spotify har lavet en iframe player som har et api
vi kan med vores app styre den player der er i iframen
vi kan med vores app sætte iframe playeren ind på vores hjemmeside
skjule den ved at sætte højde og bredde til 0 (skjule spotifys design)
med vores knapper styre hvad iframe playeren skal gøre

hvis vi kigger på developer spotify: find embeds
klik på iframe api'et - dokumentation og hvordan vi kommer i gang med api'et
vi skal bruge:
tilføj iframe api scriptet til html-siden (vi arbejder dog i react, skal have script tagget ind)
sætte div og script ind i player komponentet
sætte window... i useEffect

i safari: du skal klikke på iframen før du kan afspille den i safari (interagere med iframen med musen) - kun i safari, så test evt i en anden browser

oprette controller objekt, som styrer iframe afspilleren
NB: skriv det med useRef i stedet for getelementbyid fordi vi er i react

nu er den fremme, vi skal skjule den og lave en anden afspiller, som kan styre den med vores knapper
hvordan kan vi style på iframen ud fra det vi har nu?
i options

opgave: få afspiller til at starte og stoppe vha knap på playeren
vi kan bruge dokumentationen, hvor der står en masse
og også iframe api, hvor vi kan læse om metoder og events


lave afspillerstregen:
input type="range"
max skal være duration og indtil nu skal være position

opgave: tryk på range finder for at spole frem og tilbage i sangen


-------------------------------------------------------------------------------------------------------------------------------------------

torsdag 210825:

få input trackeren til at skifte tidspunkt i sangen når vi rykker på den
hvordan gør vi?
kigge i consollen: der er en fejl: vi har value prop på et formular felt uden en onchange handler
det betyder at feltet vil være read only, vi kan ikke ændre i dets værdi
ethvert input felt (og textarea) - hvis de ikke har en onChange men har en value, så er de read only (gælder kun i react)
hvad skal vi gøre for at gøre den ikke read only? det står i error beskeden: den har allerede en value prop, så vi skal enten give den en onchange eller en readOnly prop (så bliver den read only og giver ikke en felj)
hvad er onchange? en eventlistener, som skal have en funktion - skrive en changeHandler funktion
når vi har puttet en onchange på med en funktion, så forsvinder fejlen

hvad skal der ske i funktionen?
vi prøver at ændre inputtets value
hvad er inputtets value lige nu? et state
vi prøver altså at ændre et state, her timing.position
så vi bruger setTiming(() => {{duration: timing.data.duration, position: event.target.value}})
kan man opdatere en property på objektet uden at skulle skrive alle properties igen?

tage alle 3 states og pakke dem ind i en use reduce
så kan vi opdatere et state ad gangen uden at skulle skrive alting igen. vi vender tilbage til det om lidt

nu: når vi aktiverer changehandler funktionen, kører vi setTiming()
men musikken ændrer sig ikke når vi ændrer value med onchange funktionen
vi skal ændre på controlleren - kig i spotify documentationen
metode: embedcontroller.seek - vi kan søge til et givent sted i lyden ved at give den antal sekunder fra start
vores duration og position er i ms så vi skal regne om til sekunder
controller.seek(event.target.value/1000);
der kan måske komme nogle issues ud af bare at dividere med 1000 men vi kan lige prøve det
og det virker. nu kan vi springe rundt i lyden

fixe det ved at lave Math.floor på hele operationen, så vi ikke får et decimaltal. 
andre problemer?
ontouchend - når du stopper med at røre ved input så fyrer eventet
onchange - eventet trickes hele tiden mens jeg rører ved inputtet
i det hele taget med range skal vi håndtere sådan noget her, fordi det er hårdt for performance når eventet fyrer så mange gange

NB: vi laver her en mobil app og ikke desktop, men onTouchEnd virker også i browseren

men vi kan ikke rigtig skifte musik nu. hvad gør vi?
bruge debounce? en debounce funktion er at du beder funktionen om at eksekvere, når brugeren har stoppet sin action i en vis antal tid.
vi skal have en debounce funktion. den kan skrives hvor vi har lyst. brian sætter den uden for komponent funktionen
hvordan ser den ud?
function useDebounce({value, delay = 1000}) {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {

		const timer = setTimeout(function() {

			setDebounceValue(value)
		}, delay);

	}, [value, delay]);

	return debounceValue;
}

delay er i ms
lave den til const fordi så kan jeg fjerne timeoutet igen hvis jeg vil, med timer.cleartimeout() ish funktion (tjek mdn for stavning)

useEffect som returnerer funktion: køres lige inden komponentet unmountes, vi rydder op - hvis vi unmounter komponentet, der bruger timeren inden timeren er blevet kørt, så fjernes timeren

nu har vi et debounce.

playeren, som skal bruge debounceren bliver vist og ligger i layoutet, så længe statet, der bestemmer om playeren skal vises eller ej er true. når den ændres til false, så bliver player component unmountet.


bruge debounce funktionen i player komponentet:
læs om useDebounce, evt i react docs

NB: der er et touch problem i firefox browser, så test evt i en anden browser når du laver det her med input range og ontouchend

problem: selvom jeg ændrer input value via input feltet, så ændrer position sig ikke

løsning:
vi kan fortælle programmet, at den skal stoppe med at lytte efter afspilleren men i stedet lave en lokal position den skal lytte på, når vi rører ved inputfeltet

lige nu opdateres position af playback update funktionen

vi har brug for at vide om brugeren er i gang med at flytte slideren og gøre noget ande thvis det er tilfældet
laver 2 states til det

vi har localposition state som vi kan bruge som value i inputfeltet

skriv en masse states og useEffects og ændr i changeHandleren, og lav onTouchEnd back to onChange

hvordan sørger vi for at conroller.seek udføres før setIsSeeking?
vi kunne skrive vores egen promise funktion men det bliver for kompliceret - lyden virker men det visuelle driller lidt, prikken er lidt længe om at flytte sig til hvor jeg gerne vil have den til at være.

nu har vi mange states. dem vil vi gerne have bedre styr på
vi kan putte det ind i en useReduce, det gør vi efter pausen

minimere forbruget af states
vi skal bruge alle men kan vi lave bedre management?
opdatere dele i stedet for at overskrive det hele
vi bruger useReducer, react hook
det ligner useState lidt
vi har et state som indeholder alting og en reducer, der tager sig af hver ting vi skal have med at gøre
kigge på eksempel
vi har et sate, som bliver returneret og en dispatch funktion (ligesom setter funktionen i useState) - setter funktion i useState er også en dispatch funktion
vi skal have en reducer funktion, som tager imod statet vi gerne vil opdate og den action, vi gerne vil lave
action fortæller hvilken del af statet vi gerne vil opdatere eller hvad vi gerne vil gøre med statet
vi kan opfinde vores egen reducer funktion

det vi har brug for, er

installer react developer tools i browseren og se fejlen der
søg på react developer tools (i firefox)


aflevering inden mandag. push til github og send brian et link


fredag 220825:
problem:
vores afspiller hakker når vi skifter position i sangen via range inputtet

vi kan fixe det ved at lave 2 nye actions i stedet for isSeeking: seekingTrue og seekingFalse

det løser problemet

et andet problem: en knap inde i knappen i track-card component - det kan du ikke i html
hvordan løser vi det?
