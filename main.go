package main

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	_ "go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
	dbcon "room-manager/src/Backend"
	"strconv"
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
		} else if s, ok := v.(primitive.ObjectID); ok {
			arr[a] = hex.EncodeToString(s[:])
		}
	}
	return arr
}

func getFilterdRooms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	f := bson.M{}

	f["capacity"] = bson.M{"$gt": 0}
	attribut := r.FormValue("attribut")
	location := r.FormValue("location")
	house := r.FormValue("house")
	floor := r.FormValue("floor")
	rcapacity := r.FormValue("capacity")
	capacity := 0

	if rcapacity != "" {
		capacity, _ = strconv.Atoi(r.FormValue("capacity"))
		f["capacity"] = bson.M{"$gt": capacity - 1}
	}
	if attribut != "" {
		f["attribut"] = attribut
	}
	if location != "" {
		f["location"] = location
	}
	if house != "" {
		f["haus"] = house
	}
	if floor != "" {
		f["ebene"] = floor
	}

	fmt.Println(f)

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userColl := roommanager.Collection("Room")

	var result []bson.M
	cur, err := userColl.Find(ctx, f)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer cur.Close(ctx)

	for cur.Next(ctx) {
		var room bson.M
		if err := cur.Decode(&room); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		result = append(result, room)
	}

	if err := cur.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Convert the results to JSON and write the response
	/*jsonBytes, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}*/
	fmt.Println(result)

}

func getRooms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userColl := roommanager.Collection("Room")

	var result []bson.M
	cur, err := userColl.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer cur.Close(ctx)

	for cur.Next(ctx) {
		var room bson.M
		if err := cur.Decode(&room); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		result = append(result, room)
	}

	if err := cur.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convert the results to JSON and write the response
	jsonBytes, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(jsonBytes)
	w.Write(jsonBytes)
}

func deleteBookedRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	idToDelete := r.FormValue("idToDelete")

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userColl := roommanager.Collection("Reservation")

	reservationID, err := primitive.ObjectIDFromHex(idToDelete)
	log.Println(idToDelete)
	if err != nil {
		log.Fatal(err)
	}
	deleter, err := userColl.DeleteOne(ctx, bson.M{"_id": reservationID})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("deleted %v documents\n", deleter.DeletedCount, err)
}

func bookRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	roomIDstr := r.FormValue("roomID")
	name := r.FormValue("name")
	class := r.FormValue("class")
	module := r.FormValue("module")
	date := r.FormValue("date")
	startTime := r.FormValue("startTime")
	endTime := r.FormValue("endTime")
	username := r.FormValue("username")

	fmt.Println(roomIDstr, name, date, startTime, endTime)

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	reservColl := roommanager.Collection("Reservation")
	userColl := roommanager.Collection("User")

	projection := bson.M{"_id": 1}
	opts := options.FindOne().SetProjection(projection)

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}

	var user bson.M
	err := userColl.FindOne(ctx, bson.M{"username": username}, opts).Decode(&user)

	roomID, err := primitive.ObjectIDFromHex(roomIDstr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	fmt.Println(user)
	fmt.Println(user["_id"].(primitive.ObjectID))

	_, err = reservColl.InsertOne(ctx, bson.D{
		{Key: "userID", Value: user["_id"].(primitive.ObjectID)},
		{Key: "roomID", Value: roomID},
		{Key: "name", Value: name},
		{Key: "class", Value: class},
		{Key: "module", Value: module},
		{Key: "date", Value: date},
		{Key: "startTime", Value: startTime},
		{Key: "endTime", Value: endTime},
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func getBookedRooms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	userID := r.FormValue("userID")

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userCollBooked := roommanager.Collection("Room")
	userColl := roommanager.Collection("User")

	projection := bson.M{"_id": 1}
	opts := options.FindOne().SetProjection(projection)

	var user bson.M
	err := userColl.FindOne(ctx, bson.M{"username": userID}, opts).Decode(&user)

	fmt.Println(userID)

	pipeline := bson.A{
		bson.M{
			"$lookup": bson.M{
				"from":         "Reservation",
				"localField":   "_id",
				"foreignField": "roomID",
				"as":           "reservations",
			},
		},
		bson.M{
			"$match": bson.M{
				"reservations": bson.M{"$ne": []interface{}{}},
			},
		},
		bson.M{
			"$match": bson.M{
				"reservations.userID": user["_id"].(primitive.ObjectID),
			},
		},
	}

	cur, err := userCollBooked.Aggregate(ctx, pipeline)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var reservations []bson.M
	if err := cur.All(ctx, &reservations); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convert the results to JSON and write the response
	jsonBytes, err := json.Marshal(reservations)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(jsonBytes)
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

func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	user := r.FormValue("user")

	log.Println(user)

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

	jsonBytes, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(jsonBytes)
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

func room(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	name := r.FormValue("name")
	capacity, _ := strconv.Atoi(r.FormValue("capacity"))
	attribut := r.FormValue("attribut")
	location := r.FormValue("location")
	haus := r.FormValue("haus")
	ebene := r.FormValue("ebene")

	fmt.Println(name, capacity, attribut, location, haus, ebene)

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userColl := roommanager.Collection("Room")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}

	_, err := userColl.InsertOne(ctx, bson.D{
		{Key: "name", Value: name},
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

}

func handleRequests() {
	http.HandleFunc("/login", login)
	http.HandleFunc("/register", register)
	http.HandleFunc("/addroom", room)
	http.HandleFunc("/bookRoom", bookRoom)
	http.HandleFunc("/getroom", getRooms)
	http.HandleFunc("/getUser", getUser)
	http.HandleFunc("/getBookedRooms", getBookedRooms)
	http.HandleFunc("/deleteBooked", deleteBookedRoom)
	http.HandleFunc("/filterroom", getFilterdRooms)
	http.ListenAndServe(":8081", nil)
}

func main() {
	handleRequests()
}
