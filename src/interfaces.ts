export interface przejscie {
    ID : Number,
    Nazwa : String,
    PunktPoczatkowy : Number,
    Odznaka : Number,
    TurystaPlanujacy : Number,
    CzyPrzemierzyl : Boolean,
    Data_rozpoczecia : Date,
    Data_zakonczenia : Date,
    Suma_punktow : Number
}

export interface odznaka {
    ID: Number,
    Stopien : Number,
    Pracownik_Referatu_Weryfikacyjnego : Number,
    Data_przyznania : Date,
    Punkty_zdobyte: Number,
    TurystaZdobywca : Number,
    Zdobyta : Boolean,
    CzyMala : Boolean
}

export interface stopien {
    ID : Number,
    Nazwa : string,
    Punkty_wymagane : Number
}