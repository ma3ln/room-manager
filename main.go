package main

import (
	"encoding/json"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"net/http"
	dbcon "room-manager/src/Backend"
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
	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userColl := roommanager.Collection("User")

	filterCursor, err := userColl.Find(ctx, bson.M{"username": user})
	if err != nil {
		log.Fatal(err)
	}

	var userFiltered []bson.M
	if err = filterCursor.All(ctx, &userFiltered); err != nil {
		log.Fatal(err)
	}
	fmt.Println(userFiltered[0]["password"])

	//w.WriteHeader(http.StatusOK)

	if password == userFiltered[0]["password"] {
		fmt.Fprintf(w, "Login Succesful")
		w.WriteHeader(http.StatusOK)
		return
	} else {
		http.Error(w, "Fehler!!!", http.StatusBadRequest)
	}

}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint Hit")
}

func handleRequests() {
	http.HandleFunc("/login", login)
	http.HandleFunc("/Termine", alleTermine)
	http.ListenAndServe(":8081", nil)
}

func main() {
	handleRequests()
}
