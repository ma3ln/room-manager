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
type Login struct {
	user     string
	password string
}
type Termine []Termin

func alleTermine(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	termine := Termine{
		Termin{
			Zeit:         "09.01.2022",
			Raum:         "450",
			Beschreibung: "Normaler Raum",
		},
	}
	json.NewEncoder(w).Encode(termine)
}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	user := r.FormValue("user")
	password := r.FormValue("password")
	log.Println(user)
	log.Println(password)

	if user == "TestUser1" && password == "123456" {
		fmt.Fprintf(w, "Login Succesful")
		w.WriteHeader(http.StatusOK)
		return
	} else {
		http.Error(w, "Fehler!!!", http.StatusBadRequest)
	}

}

func handleRequests() {
	http.HandleFunc("/login", login)
	http.ListenAndServe(":8081", nil)
}

func main() {
	handleRequests()
}
