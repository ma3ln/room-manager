package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Termin struct {
	Zeit         string `json:"Zeit"`
	Raum         string `json:"Raum"`
	Beschreibung string `json:"Beschreibung"`
}

type Termine []Termin

func alleTermine(w http.ResponseWriter, r *http.Request) {
	termine := Termine{
		Termin{
			Zeit:         "09.01.2022",
			Raum:         "450",
			Beschreibung: "Normaler Raum",
		},
	}
	fmt.Println("Endpoint Hit: Alle Termine Endpoint")
	json.NewEncoder(w).Encode(termine)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint Hit")
}

func handleRequests() {
	http.HandleFunc("/", alleTermine)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}
