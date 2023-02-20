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

func register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	firstname := r.FormValue("firstname")
	lastname := r.FormValue("lastname")
	mail := r.FormValue("mail")
	user := r.FormValue("user")
	password := r.FormValue("password")

	fmt.Println(user)

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

	mailCursor, err := userColl.Find(ctx, bson.M{"mail": mail})
	if err != nil {
		log.Fatal(err)
	}

	var mailFiltered []bson.M
	if err = mailCursor.All(ctx, &mailFiltered); err != nil {
		log.Fatal(err)
	}

	if len(mailFiltered) > 0 || len(userFiltered) > 0 {
		fmt.Println("fail")
		http.Error(w, "Fehler!!!", http.StatusBadRequest)
	} else {
		_, err := userColl.InsertOne(ctx, bson.D{
			{Key: "username", Value: user},
			{Key: "password", Value: password},
			{Key: "mail", Value: mail},
			{Key: "firstname", Value: firstname},
			{Key: "lastname", Value: lastname},
		})
		if err != nil {
			log.Fatal(err)
		}
	}

}

type Booked struct {
	Date      string `bson:"date"`
	StartTime string `bson:"startTime"`
	EndTime   string `bson:"endTime"`
}

func room(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	name := r.FormValue("name")
	capacity := r.FormValue("capacity")
	date := r.FormValue("date")
	startTime := r.FormValue("startTime")
	endTime := r.FormValue("endTime")
	attribut := r.FormValue("attribut")
	location := r.FormValue("location")
	haus := r.FormValue("haus")
	ebene := r.FormValue("ebene")

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userColl := roommanager.Collection("Room")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}

	_, err := userColl.InsertOne(ctx, bson.D{
		{Key: "name", Value: name},
		{Key: "booked", Value: Booked{date, startTime, endTime}},
		{Key: "capacity", Value: capacity},
		{Key: "attribut", Value: attribut},
		{Key: "location", Value: location},
		{Key: "haus", Value: haus},
		{Key: "ebene", Value: ebene},
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)

}

func handleRequests() {
	http.HandleFunc("/login", login)
	http.HandleFunc("/register", register)
	http.HandleFunc("/addroom", room)
	http.ListenAndServe(":8081", nil)
}

func main() {
	handleRequests()
}
