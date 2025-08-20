tirsdag 120825:

generateMetadata

hvad er metadata? en beskrivelse af hjemmesiden/web appen
hvorfor er det vigtigt? for at bots nemmere kan forstå hjemmesiden (de kigger også på andre ting). så kommer den højere op på search engine
titel tagget skal rettes til - vi kan bruge metadata objektet eller generateMetadata funktionen - generere title tag mv


generatemetadata:
// men hvordan får jeg det mere dynamisk? jeg vil gerne have sidens titel med eller albummets titel hvis jeg er på album detaljesiden
// lave dynamisk title med title template. der er et % tegn, hvad er det?
template: '%s | iPlayMusic',



struktur:
jeg har 3 forskellige layout filer i hver af mine (layout) mapper. 
vi kan lave en ekstra layout fil i app mappen


generateMetadata funktionen: dynamisk metadata, route parametre, ekstern data mv kan sættes ved at eksportere generateMetadata funktionen, der responderer ved at returne et metadata objekt