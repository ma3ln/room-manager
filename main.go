package main

import (
	"encoding/json"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
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

func BsonMapToArray(m bson.M) map[string]string {
	arr := make(map[string]string)
	for a, v := range m {
		s, ok := v.(string)
		if ok {
			arr[a] = s
		}
	}
	return arr
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

	var result bson.M
	err := userColl.FindOne(ctx, bson.M{"username": user}).Decode(&result)

	if err == mongo.ErrNoDocuments {
		fmt.Println("no Docs found")
	} else if err != nil {
		log.Fatal(err)
	}

	arr := BsonMapToArray(result)

	fmt.Println(arr)

	if len(arr) > 0 {
		if password == arr["password"] {
			fmt.Println("login")
			fmt.Fprintf(w, "Login Succesful")
			w.WriteHeader(http.StatusOK)
			return
		} else {
			http.Error(w, "Fehler!!!", http.StatusBadRequest)
			fmt.Println("wrong pw")
		}
	} else {
		http.Error(w, "Fehler!!!", http.StatusBadRequest)
		fmt.Println("user not found")
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

func handleRequests() {
	http.HandleFunc("/login", login)
	http.HandleFunc("/register", register)
	http.ListenAndServe(":8081", nil)
}

func main() {
	handleRequests()
}
