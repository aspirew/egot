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

export interface punkt {
    ID : number,
    Nazwa : string,
    Pracownik_PTTK : number,
    Wysokosc_npm : number
}

export interface teren {
    ID : number,
    Nazwa : string,
    Pasmo_gorskie : number
}

export interface odcinek {
    ID : number,
    Nazwa : string,
    PunktPoczatkowy : number,
    PunktKoncowy : number,
    Teren : number,
    Dlugos : number,
    Punktacja : number,
    PunktacjaOdKonca : number
}