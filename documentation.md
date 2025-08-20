dokumentation som skal afleveres med eksamensopg

vi skal aflevere en dokumentation

minimum: beskrive tech-stack - gør det enkelt, eks. i listeform. hvad har du brugt?
jo enklere, jo mere kan de nå at kigge igennem, jo bedre en vurdering kan de give os.
gør det letlæseligt for de sidder med mange dokumenter

der skal også være et kodeeksempel. her skal vi forklare hvordan koden virker
vi taler om nogle strategier til hvordan vi kan vælge noget kode.
hvis vi f.eks kigger på iplaymusic (øv det gerne med denne opgave)
hvad gør vi?
vi laver en fil der hedder dokumentation.md (eller documentation.md hvis jeg skriver på engelsk)

hvordan laver man en overskrift i md? # (h1) (husk mellemrum mellem # og tekst)
overskrift 2: ## (h2)
overskrift 3: ### (h3)

du kan gå i preview med lup og to sider i højre hjørne af vscode


# Documentation for iPlayMusic
Emma Lindekilde Larsen, WU12

## Tech-stack (tag det fra package.json)
* Next.js
* React
* Git
* Tailwind
* React-icons
* SASS
* Web api fra Spotify
* zod
* (evt biblioteker, som er nødvendige for, at appen virker)

## Code example
Tag for eksempel et eksempel fra noget kode, hvor du har mange hooks, så har du meget at forklare

Tag evt. hele komponentet
tre backticks starter kodeeksempel formatering. hvis du skriver jsx, så bliver det formateret med farver mv.

skriv hvilken fil det er, eks. 
Common Header komponent
(components/ui/common-header.jsx)

```jsx
const [state, setState] = useState('');
```

i brians eksempel: 
smart at forklare useState('');
en indbygget funktion i react, vi kalder den en hook
vi bruger den til at gemme 
at gemme værdier i variabler har en uhensigtsmæssig funktion i react, noget med at en komponent bliver ved med at rerender
vi invokerer funktionen og får et array returneret.
useState returnerer et array
useState er en react funktion, en hook, der returnerer et array. Arrayet indeholder to ting, et state og en setter funktion til statet.
[state, setState]
NB: kopier ikke fra react dokumentationen, brug egne ord i stedet.
Usestate funktionen tager imod et parameter, som står inde i parantesen, parametret kaldes initial state. vi kan bestemme hvad parameter-argumentet skal være fra starten ()
Hvorfor bruger vi useState?
hvis man har nogle værdier man gerne vil have opdateret undervejs. Det kunne være vores fetch - statet starter med at være ingenting, og efter fetchet er statet noget andet. Hvorfor er det nødvendigt?
eks: et felt vi skriver i kan opdatere statet
hvorfor bruge useState i stedet for almindelige variabler?
Det har at gøre med komponenternes livstidscyklus. (komponenterne lever og dør). Vi starter med at mounte et komponent. Derefter bliver det rendered (alt hvad komponentet har af visuelle ting bliver vist på skærmen). eks: et fetch, som ikke er færdigt endnu

et state laver et rerender, og det er nødvendigt for at få vist den nye værdi
alle child components af komponentet, der har statet, bliver rerenderet.
smart at tænke det ind i layoutet og hvor du bruger statet - hvor meget bliver opdateret når det skifter?

mount: state = Hej
render: -> hej
(fetch -> state = farvel) fetch ændrer statets værdi. når statet opdateres blier komponentet rerendered
render: -> farvel

de 4 livsstadier:
* will mount (vi kan potentielt mounte)
* on mount
* did mount
* will unmount - komponenterne er ved at unmounte, men vi skal lige have en reaktion for brugeren her.
* did unmount

intention om at ville lukke noget. - siden kan spørge om jeg er sikker på jeg vil lukke, eks. hvis jeg er ved at skrive en mail og er ved at lukke hjemmesiden. det er will unmount der bruges her.

Brians eksempel på forklarende tekst:
Jeg starter med at kalde en react hook "useState" som er en funktion, der returnerer et array. Arrayet indeholder 2 elementer: Et state og en sætter-funktion til dette state. useState tager imod et argument "initialState" som er værdien for stater ved start. 

useEffect:
en react hook, som er en funktion. returnerer ikke noget, så den er en void funktion (funktioner, der ikke returnerer noget kaldes void funktioner).
hvad bruger vi den til? vi kan f.eks. pakke den rundt om et fetch
hvad sker der hvis vi har et fetch uden useEffect på clientside?
hvis vi opdaterer et sted vha. et fetch og ikke pakker det ind i useEffecten renderer den hele komponentet og fetcher igen, opdaterer mv og vi har et infinite loop. browseren crasher.
useEffect har vi så snart vi kører noget i vores app, der har en side effekt. vi håndterer vores side effects. en side effect er vores fetch, som er asynkron. side effect ved async fordi det er en sideløbende proces, der egentlig ikke har noget med vores komponent struktur at gøre.
vi invokerer/kalder funktionen - vi kan se det fordi vi skriver navnet på funktionen og paranteser: useEffect()
i argumenterne er der en anonym funktion og et array (vi kalder det dependency array i denne sammenhæng)
hvad kan vi sige om anonym funktion og array?
anonym funktion: fordi vi kun skal bruge funktionen specifikt her, kan vi lade være med at give den et navn. hvornår bliver funktionen kørt? hvis en værdi i dependency arrayet opdateres. og også en gang efter mount og initial render.
hvis den anonyme funktion returnerer en funktion vil den returnerede funktion køre lige inden vi unmounter i will unmount fasen (lige inden komponentet bliver fjernet fra dom'en)
useEffect(() => {
    return function() {
    (eks gemme værdierne brugeren har skrevet ind i formen på hjemmesiden. 
    eller spørge brugeren om de er sikre på om de vil forlade siden).
    };
}, []);
når vi gemmer variabler, hvad sker der inde i computeren? vi peger på en adresse i hukommelsen, et fysisk sted i hukommelsen, hvor vi kan gemme noget data (i dette tilfælde i rammen). når vi gør det, optager vi plads i rammen. vi kan være rare ved brugeren og slette dataen når vi er færdige med at bruge komponentet. (det her er computer science stof).

hvis dependency array er tomt: 
hvis vi ikke har et dependency array slet ikke er der: infinite loop - funktionen bliver ved at køre. vi skal have et dependency array også selvom det er tomt.

2 useEffect: begge kører efter initial render. hvis et dependency state til en af useEffectsne opdateres renderer den igen men mounter ikke igen (altså den anden useEffect kører ikke igen fordi der ikke er mount men bare render).

sådan her:
mount: will mount, on mount, did mount, will unmount, did unmount
initial render
(måske) fetch som opdaterer state
hvis useEffect med eks. fetch opdateret state i dependency arrayet: nyt render. vi kan lave nyt render så tit vi har lyst men det har ikke noget med mount at gøre

er det dårlig practice med anonyme funktioner? Kyle Simmons, 2 bøger: you dont know javascript og you still dont know javascript. hvad der sker under motorhjelmen i js, hvad er egentlig forskellen på const let og var, hvad synes computeren om det? en holdning er at skille sig af med anonyme funktioner, vi kan skille os af med dem for vores egen skyld. hvis vi får en fejl i konsollen og fejlen er i en anonym funktion får vi bare function .... hvis funktionen har et navn kan computeren vise os hvor præcist fejlen er ved at vise os funktionens navn.
vi kan navngive den og lægge den i en utility/library fil. 
brug anonym funktion hvis du kun skal bruge den et sted. det er en holdningsbestemt ting, det er det samme for computeren uanset om vi navngiver den eller ej.

useState og useEffect er basale funktionaliteter i react. dem skal vi kunne til eksamen.

efter initial render kører useEffecten. useEffecten kører igen når en værdi i dependency arrayet opdateres.
hvis useEffecten returnerer en funktion kører useEffecten igen i will unmount 

kort sagt:
useState er en hook, en react funktion. returnerer et array med to værdier, state og state-sætter. modtager parametret initialState. du kan også sige noget om destructuring
destructuring: arrayet, der returneres, hedder ikke noget, derfor skal vi bruge destructuring.
vi kan kalde det noget sådan:
const stateStuff = useState('');
const state = stateStuff[0];
const setState = stateStuff[1];

vi kan skrive det på en linje med destructuring, og vi vil gerne gøre det kort så derfor skriver vi det med [state, setState] = useState('')

sådan går vi igennem hele vores kode, forklar ikke ting der er åbenlyse, f.eks. html-elementer mv

forklaring af knap med onclick, router og back()-funktion
<button onClick={() => router.back()}>Tryk her</button>
onClick er en html-attribut
i jsx er alting js-objekter, så det er en property til objektet og ikke en attribut (attribut godtages dog også til eksamen)
onClick er basically en event-listener. lytter på hvornår vi klikker på elementet, der har property'en.
hvad sker der når vi klikker?
der er en fat arrow function. den hedder også en lambda funktion
kommer fra matematik: man bruger lambda funktioner til eks. koordinatsystemer. f = x * 1. ligning for lige linje i koordinatsystem.

hvad gør den anonyme funktion?
hvad er router, hvad er back()?
router definition:
const router = useRouter();
router.back()
et objekt, router, som har en metode, back()
useRouter er en next hook, en funktion fra next, som giver os et objekt, der indeholder en masse forskellige metoder
en af metoderne er back()
back() navigerer en side tilbage 
NB: i react-routeren kan du skrive .navigate(-1); eller et andet tal, hvis du vil længere tilbage i historikken

skriv forklaringerne nedenfor - hvis vi har beskrevet tech-stacken og kodeeksemplet, så er vi godt kørende.

hvad er zod?
et valideringslibrary. vi kan skrive et mønster og biblioteket kan tjekke om input er valid. vi kan validere objekter og strings (og måske også arrays, det har brian dog ikke prøvet)




------------------------------
brians kode 110825 (dokumentation del 1):

# Dokumentation for iPlayMusic
Brian Emilius, WU12

## Tech-stack
* Next.js
* React
* Git
* Tailwind
* React-icons
* SASS
* Web-API fra Spotify
* Zod

## Kode-eksempel
Common Header komponent (components/ui/common-header.jsx)
```jsx
export default function CommonHeader() {
	const pathname = usePathname();
	const [title, setTitle] = useState("");
	const router = useRouter();

	useEffect(function () {
		switch (pathname) {
			case "/":
				setTitle("Featured")
				break;
			case "/categories":
				setTitle("Categories");
				break;
		}
		return function() { ... }
	}, [pathname]);

	return (
		<div className="fixed bg-white top-0 left-0 px-6 pt-4 w-full z-100">
			<header className="flex justify-between mb-8">
				<button onClick={() => router.back()}>
					<LuChevronLeft />
				</button>
				<HeaderTitle level={2}>
					{title}
				</HeaderTitle>
				<button><LuSearch /></button>
			</header>
			...
		</div>
	)
}
```

Jeg starter med at kalde en React hook "useState" som er en funktion, der returnerer et array. Arrayet indeholder 2 elementer: Et state og en sætter-funktion til dette state. useState tager imod et argument "initialState" som er værdien for statet ved start.


-------------------
dokumentation 2:
karakter: 7
forklare og forsvare valg af tech stack

Gør det overskueligt så Brian og censor bedre kan finde rundt i tingene. Tænk ikke helt så meget på længden af teksten, du må gerne gå i dybden.
hvorfor vælge next.js som framework i stedet for bare at bruge react?

eksempel brians tekst:
## Tech-stack
* **Next.js** 
Et front-end framework baseret på React.js, som også giver adgang til server-side komponenter og -actions, samt mappebaseret routing. Server-side komponenter og funktioner giver større sikkerhed, da al koden afvikles på serveren frem for i klienten. Kom gerne på flere argumenter og dybere forklaringer.
* **React**
Et bibliotek, der giver mig mulighed for at lave komponenter og håndtere states på en god og let måde. React har et stort community, som er aktivt, med et stort modul-bibliotek, veldokumenteret og velunderstøttet, så efterspørgselen er stor.
* **Git**
Et versionsstyringsværktøj, som lader mig lave branches og versioner af min kode, så jeg let kan gå tilbage til tidligere versioner, hvis jeg for eksempel har lavet en fejl. Jeg bruger Git sammen med GitHub (en hosting platform, der implementerer Git).
* **Tailwind**
Et utility-baseret mobile-first CSS bibliotek.
* **React-icons**
Et ikon-bibliotek, som er beregnet på React.
* **SASS**
En udvidelse (et extension language) til CSS, som lader mig lave funktioner, variabler, mixins og nesting. Jeg kan opdele min CSS i moduler og dermed genbruge kode flere steder
* **Web-API fra Spotify**
Et interface til at få adgang til Spotify's data, så jeg kan lave min egen app. Dette er den eneste måde hvor jeg lovligt kan få adgang til Spotify's data.
* **Zod**
Et valideringsbibliotek til objekter og strings. Jeg bruger Zod til blandt andet at validere bruger-input fra formularer. (kom evt ind på en forklaring på hvorfor det er smart at validere brugerinput. skriv et forsvar for at bruge zod)

Brians reflektioner over egen tekst: det ser ud som om det er skrevet af nogen, der har tænkt over hvad de bruger og hvorfor.


Diskussion på klassen
hvad er react? ikke et framework, det er et library. (ikke mulighed for at skrive jsx, det kan du også gøre på andre måder). Vi kan lave komponenter med React, og Reacts state engine er god. Nemt at genbruge koden i andre projekter. 
Hvad bruger man ude i den virkelige verden? React er det mest anvendte bibliotek ude i den virkelige verden. React har et godt community, så det er nemt at finde løsninger på forskellige problemer. 

NB: node er en runtime engine hvor js bliver afviklet, vi skriver det ikke på fordi det svarer lidt til browseren, der også afvikler koden

hvad er git?
et versionsstyringsværktøj, hvor jeg kan gemme versioner og udvikle videre med mulighed for at gå tilbage til en tidligere version.
eksempler på andre versionsstyringsværktøjer: VCS (version control system). 
andre eksempler på hosting platforms: GitLab, Bitbucket (git-baseret hosting platform)
Koden er hostet på GitHub 

hvad er tailwind?
hvad gør tailwind mobile first? tilgangen, du bruger, hvis du f.eks angiver bredden af en div - w-30 . angiver bredden af den mindste skærmtype. kan skrive w-[100px] md:w-[200px] xl:w[700px]
starter småt og arbejder sig større og større
hvorfor vælger vi det? det er nemt fordi meget er lavet på forhånd.
brug ikke kun ren css til eksamen. vis at du kan noget mere avanceret, f.eks. sass
lav evt under components typography mappe med mappe, link med en index.js fil
i filen:
export const textLink = "text-sm text-pink";
export const spotifyButton = "flex gap-2 bg-spotifygreen items-center px-8 py-2 rounded";
nu kan de importeres og bruges i flere filer.

react-icons
overblik over ikoner, du downloader ikonerne i node_modules, men det er kun de ikoner, der importeres i koden, der kommer med i buided. i udviklingen sidder vi med alle ikonerne men i builded er det kun dem, der bruges, der kommer med
importere en masse pakker: være obs på hvilke licenser, de er udgivet under. der er mange typer af open source licenser, som giver dig mulighed for at gøre ting med koden, men hvis du arbejder i en virksomhed, så skal du være obs. på hvilke licenser der tillader at du tjener penge på koden. react må bruges stort set som du har lyst til. 

sass:
css med superkræfter. det mest modne, stabile, kraftfulde css extension language
i css: variabler hedder ikke variabler men custom properties og virker anderledes.
du kan også bruge list i sass.
hvorfor bruge sass?

web-API: hvad betyder api?

zod:
hvorfor er det smart at validere brugerinput? forsvar den ide.

der hvor jeg synes det giver mening at forklare hvordan jeg bruger noget fra stacken, skal jeg gøre det.

er det bedst at bruge flest kræfter på at forklare hvad tingen er eller hvorfor man har valgt den? Brian siger ca lige meget af hver, hvordan jeg synes det giver mening. Brian vil spørge mig om det til eksamen hvis han tror jeg kan sige mere end jeg har skrevet


------------------------------------------------------------------------------------------------------------------------
tirsdag 19.08.25: dokumentation, hvad kræves for at få 12?

perspektivere de enkelte tech-stack valg. sætte valgene op over for andre mulige valg. hvorfor vælge dette frem for andet?
kom med et bud på, hvordan applikationen i sin nuværende form kan skaleres i fremtiden
brians ekstra krølle, som ikke står i dokumentet: vi skriver dokumentation, det er pseudo fordi det er dokumentation ift. eksamen. vi vil ikke blive bedt om at skrive sådan i et job. i et job: du vil kunne automatisere dokumentationsprocessen. 
brians krølle: skriv  hvordan du kommer i gang, hvad du skal installere, hvis projektet er online så et link og skriv hvilken valgfri opgave du har lavet.

skal projektet ligge online?
opgaven indeholder: beskrivelse, kravsspecifikation (funktionaliteter), design
beskrivelse: hovedopgave og 3 valgfrie opgaver, hvor vi skal lave en af dem og gerne flere hvis vi vil.
de valgfrie opgaver: en kan være, at appen skal deployes online og under mundtlig eksamen vise, hvordan flowet fungerer
en anden kan være, at det skal være en pwa (men kun hvis vi er blevet undervist i det)

et andet godt trick: sæt et billede ind af appen. tag et screenshot af appen. find et flot vue og put det ind i dokumentationen
hvordan putter man et billede ind i markdown?

<img src="./public/images/1.jpg">


brians eksempel på tekst:

## sådan kommer du i gang
`npm install`
`npm run dev`

https://minadresse.dk/iplaymusic (hvis projektet ligger online)

Jeg har lavet valgfri opgave A

# Dokumentation for iPlayMusic
Brian Emilius, WU12

## Tech-stack
* **Next.js**  
Et front-end framework baseret på React.js som også giver adgang til server-side komponenter og -actions, samt mappebaseret routing. Server-side komponenter og funktioner giver en større sikkerhed, da al koden afvikles på serveren fremfor i klienten.
* **React**  
Et bibliotek der giver mig mulighed for at lave komponenter og håndtere states på en god og let måde. React har et stort community med et stort modul-bibliotek, som er aktivt, vel-dokumenteret og vel-understøttet. Det er også det mest brugte front-end bibliotek i verden, så efterspørgslen på React-udviklere er stor.
* **Git**  
Et versionsstyringsværktøj, som lader mig lave branches og versioner af min kode, så jeg let kan gå tilbage til tidligere versioner, hvis jeg for eksempel har lavet en fejl. Jeg bruger Git sammen med GitHub.
* **Tailwind**  
Et utility-baseret mobile-first CSS bibliotek.
* **React-icons**  
Et ikon-bibliotek, som er beregnet på React.
* **SASS**  
En udvidelse til CSS, som lader mig lave funktioner, variabler, mixins og nesting. Jeg kan opdele min CSS i moduler og dermed genbruge kode flere steder.
* **Web-API fra Spotify**  
Et interface til at få adgang til Spotify's data, så jeg kan lave min egen app. Dette er den eneste måde hvor jeg lovligt kan få adgang til Spotify's data.
* **Zod**  
Et valideringsbibliotek til objekter og strings. Jeg bruger Zod til blandt andet at validere bruger-input fra formularer.

## Kode-eksempel
Common Header komponent (components/ui/common-header.jsx)
```jsx
export default function CommonHeader() {
	const pathname = usePathname();
	const [title, setTitle] = useState("");
	const router = useRouter();

	useEffect(function () {
		switch (pathname) {
			case "/":
				setTitle("Featured")
				break;
			case "/categories":
				setTitle("Categories");
				break;
		}
		return function() { ... }
	}, [pathname]);

	return (
		<div className="fixed bg-white top-0 left-0 px-6 pt-4 w-full z-100">
			<header className="flex justify-between mb-8">
				<button onClick={() => router.back()}>
					<LuChevronLeft />
				</button>
				<HeaderTitle level={2}>
					{title}
				</HeaderTitle>
				<button><LuSearch /></button>
			</header>
			...
		</div>
	)
}
```

Jeg starter med at kalde en React hook "useState" som er en funktion, der returnerer et array. Arrayet indeholder 2 elementer: Et state og en sætter-funktion til dette state. useState tager imod et argument "initialState" som er værdien for statet ved start.

mine noter til gennemgang af ovenstående:

hvordan perspektiverer vi at vi har valgt at bruge next.js? kender vi andre front-end frameworks vi kan perspektivere til? 
angular. kender vi det? hvad kan vi sige om det? ingenting.
angular er et framework, der bruges mest i finanssektoren. de bureauer, der laver apps og programmer til finanssektoren er glade for angular. 
vue: hvem har leget med vue? ingen. 
historien om vue? brian mener, at det var en asiatisk mand, fra taiwan eller kina, som ville lave en bedre version af react. det er blevet meget populært, og er forholdsvist populært i danmark.
svelte: et front-end framework, som

next, vue, angular og svelte er komponent-baserede front-end frameworks med komponenter og state-management
hvorfor vælge en frem for andre? hvorfor next, som er baseret på react? meget større community, flere løsninger på problemer. velunderstøttet, veldokumenteret, godt stort community, økosystem af biblioteker, der hører til react/next. stort set alt vi kan finde på npm er react-orienteret.
perspektivere: sætte det op over for andre. hvad får vi rent faktisk når vi bruger next som vi måske ikke ville få med et af de andre frameworks?
undersøge inden eksamen: hvad får jeg ud af at bruge svelte, vue, angular? undersøg evt. med ai, men gør det inden den skriftlige eksamen starter.
findes der andre, der også giver serverside? ja, vue's nuxt (vue svarer til react og nuxt svarer til next)

NB: vue er et bibliotek ligesom react.
vi taler om react som både et bibliotek og framework fordi vi bruger react som et framework.

den måde vi har lært at bruge react: med react-router, vite-plugin-pages - når vi begynder at vælge routere, som kræver at vi placerer vores filer i en bestemt struktur med mapper mv, så opfører det sig som et framework.

når vi har bestemte ord til mapper og filer, som skal være på den måde for at det virker, og de skal struktureres på en bestemt måde, for at det virker. 
brian synes at distinktionen mellem bibliotek og framework er fjollet, men vil alligevel gerne have at vi er klar over det og siger det til eksamen. (kan sammenlignes med diskussionen om, hvorvidt html er et programmeringssprog)

hvorfor vælge at bruge et karussel-bibliotek (eks swiper.js til at lave karusellen). hvorfor ikke bare skrive det selv? fordele og ulemper ved at skrive det selv vs at bruge et bibliotek
fordele ved at skrive selv: (læringsperspektiv) - forstå det bedre. have mere kontrol over, hvordan det virker. ulempe: det tager længere tid. sige nej til kunder, der ikke kan vente. ting, der tager tid, koster flere penge at lave. balancegang mellem hvornår vi skal lave noget, der er proprietært/bespoke (eks. et skræddersyet jakkesæt) - bespoke: få lavet noget specifikt til mit behov. balancegang mellem bespoke og cookiecutter (form som allerede er lavet). kan jeg ikke bare lave min egen cookie cutter? jo, f.eks. har niels (lærer), som laver wordpress sites, som de selv har lavet engang i fortiden. det er en investering og du kan levere noget, der er unikt.


bruge en komponent fra et bibliotek, altså bruge noget, andre har lavet i forvejen (her f.eks. gallerikomponenten): det går hurtigere i situationen, kunderne bliver glade. vi ved det virker med det samme (der er en vis kvalitetsgrad i bibliotekerne vi kan finde på npm). på npm: kig på statistikkerne 
søg på npm: swiper. ude i siden kan du se weekly downloads: 2.5 millioner downloads på verdensplan. der er mange, der bruger biblioteket. hvis mange bruger det, må det være populært. det er nok populært af en årsag, at det virker og har en vis kvalitet.
omvendt: hvis vi søger på @emilius-rainbow-log: 14 weekly downloads
vi kan bruge statistikker, se om det stadig er understøttet eller om det er deprecated. 
ulempe: andre mennesker har lavet koden. vedligeholder de den? hvad hvis der kommer security-breaches, hvornår bliver det så fixet?  jeg kan ikke fixe det fordi det er nogen andre der har lavet swiperjs
licenser: alle biblioteker vi henter ned har en licens, som fortæller hvordan koden må bruges og hvad vi må bruge den til.
Brians npm pakke: MITlicens: universitetet MIT - du må bruge den til lige hvad du har lyst til. 
swiperjs er også under MIT licensen (du må bruge den til hvad du har lyst til)

andre licenser:
GNU: 

kig i package.json, det er ikke nok.
kig også i node_modules. det er alle sammen pakker, som alle har en licens, der hører til den. nogle licenser kan gøre, at jeg f.eks. ikke må tjene penge på min app. hvordan finder jeg ud af hvilke licenser jeg bruger? find en pakke til det, som kan analysere min node_modules mappe og sige hvilke licenser de har.
hvad hedder den pakke? npm licence checker (licens: BSD-3-Clause) - du må gerne bruge det men du skal nævne at du har brugt det. (eks i en readme fil eller som en kodekommentar)
køre pakken på appen og så kommer den med en rapport over hvilke licenser, der er brugt.

køre licens pakken:
npx licence-checker

hvilke slags kontraker?
one and done
et antal rettelser over 6 måneder
serviceaftale i afgrænset tid, på abonnement
mange flere slags kontrakter.

skalering i fremtiden:
fordi jeg har brugt framework next.js til min app er det nemt af tilføje nye undersider i fremtiden fordi det er modul-baseret og komponent-baseret. vi har også fulgt en navngivningskonvention, som gør at andre nemt kan bygge videre på det.
vi dokumenterer for 2 forskellige personer: mig selv og mig selv (/mine kollegaer) i fremtiden
vi har valgt at bruge teknologier, som vi ved er forholdsvist fremtidssikrede. hvad med spotifys api? vi regner ikke med at spotify går neden om og hjem foreløbig. (genre endpointet er f.eks. deprecated)
next.js: fremtidssikret fordi mange bruger det, veldokumenteret og velunderstøttet mv, så vi kan godt regne med, at det også virker/bruges i fremtiden.

det at være webudvikler er både noget der går stærkt og langsomt på samme tid: hvad mener brian? der kommer hele tiden nyt, som vi skal holde os up to date på. hvor holder brian sig opdateret? brian plejede at bruge twitter (men ikke mere).
dev.to : bloggingservice, hvor man kan skrive artiker, som er relateret til programmering og hovedsageligt webudvikling. god kultur for at støtte hinanden.
TLDR tech nyhedsbrev, en opsummering af hvad der er sket i programmering/webudviklingsverdenen den sidste uges tid. 
stack overflow laver en rapport en gang om året, hvor de diskuterer forskellige trends inden for programmering (den er ca 20 sider lang)

langsomt:
vi laver stadig jquery (oldgammelt utility bibliotek til js): eks: $.("dims"). jquery er et js bibliotek, som blev opfundet i 1998, vi bruger det stadig i dag.
react er fra 2015. 
php er fra 90'erne, vi bruger det stadig
www er kun 35 år gammelt, react har eksisteret omkring 1/3 af tiden. det her er brians argument for, at react er gammelt.

slap af: selvom du føler dig bagud på nye teknologier, kan du stadig lave det du gerne vil.
eks: 80% af verdens cms'er er wordpress. 50% af websites er wordpress. det er php og mysql. de er også gamle og bruges stadig

