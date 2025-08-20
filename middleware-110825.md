# mandag 110825:

middleware:
vi kan køre vores app og vi vil gerne ind på forsiden, som er featured-siden
vi skal bruge en token for cookie for at se indholdet. manuelt at navigere til login og trykke på login-linket


vi kan bruge middleware
i next docs, find middleware.js (eller middleware.ts hvis du bruger typescript)
vi skriver og kører middleware på serveren før en request bliver gennemført
vi får en request fra browseren til forsiden
hvis vi har lavet middleware på forsiden bliver vi routet til middleware før vi kommer til forsiden
vi kan gøre hvad vi har lyst til i middlewaren, her kan vi bruge den til at tjekke om der er en cookie og hvis ikke, så navigere til login siden
arbejder mellem request og response
hvis vi har en src mappe skal middleware.js være inde i den
filen skal være i src mappen på samme level som app mappen