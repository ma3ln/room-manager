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
	"time"
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

func getStudentFilteredRooms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	filter := bson.M{}

	class := r.FormValue("class")
	module := r.FormValue("module")
	if class != "" {
		filter["class"] = class
	}
	if module != "" {
		filter["module"] = module
	}

	fmt.Println(filter)

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userColl := roommanager.Collection("Reservation")

	pipeline := bson.A{
		bson.M{
			"$match": filter,
		},
		bson.M{
			"$addFields": bson.M{
				"week": bson.M{"$week": bson.M{"$toDate": "$date"}},
			},
		},
	}

	var result []bson.M
	cur, err := userColl.Aggregate(ctx, pipeline)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		fmt.Println(err.Error())
		return
	}

	fmt.Println(result)

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

	jsonBytes, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(jsonBytes)

}

func getFilterdRooms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	filter := bson.M{}

	filter["capacity"] = bson.M{"$gt": 0}
	attribut := r.FormValue("attribut")
	location := r.FormValue("location")
	house := r.FormValue("house")
	floor := r.FormValue("floor")
	rcapacity := r.FormValue("capacity")
	date := r.FormValue("date")
	startTime, _ := time.Parse("15:04", r.FormValue("startTime"))
	endTime, _ := time.Parse("15:04", r.FormValue("endTime"))
	capacity := 0
	if date == "" {
		timedate := time.Now()
		date = timedate.Format("01/02/2006")
	}
	if startTime.IsZero() {
		startTime = time.Now()
	}
	if endTime.IsZero() {
		endTime = time.Now()
	}

	//startTime = time.Date(1, 1, 1, startTime.Hour(), startTime.Minute(), 0, 0, time.UTC)
	//endTime = time.Date(1, 1, 1, endTime.Hour(), endTime.Minute(), 0, 0, time.UTC)

	//fmt.Println(date, startTime, endTime)

	if rcapacity != "" {
		capacity, _ = strconv.Atoi(r.FormValue("capacity"))
		filter["capacity"] = bson.M{"$gt": capacity - 1}
	}
	if attribut != "" {
		filter["attribut"] = attribut
	}
	fmt.Println(location)
	if location != "" {
		filter["location"] = location
	}
	if house != "" {
		filter["haus"] = house
	}
	if floor != "" {
		filter["ebene"] = floor
	}

	fmt.Println(filter)

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	userColl := roommanager.Collection("Room")

	var result []bson.M
	cur, err := userColl.Find(ctx, filter)
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

	fmt.Println(result)

	timefilter := bson.M{
		"$or": []bson.M{
			bson.M{"date": date, "startTime": bson.M{"$gt": startTime, "$lt": endTime}},
			bson.M{"date": date, "endTime": bson.M{"$gt": startTime, "$lt": endTime}},
			bson.M{"date": date, "endTime": startTime},
			bson.M{"date": date, "startTime": endTime},
			bson.M{"date": date, "endTime": endTime},
			bson.M{"date": date, "startTime": startTime},
		},
	}
	//timefilter["startTime"] = bson.M{"$gt": startTime, "$lt": endTime}
	//timefilter["endTime"] = bson.M{"$gt": startTime, "$lt": endTime}

	//fmt.Println("\n", timefilter, "\n")

	client, ctx = dbcon.Dbconect()

	roommanager = client.Database("roomManager")
	userColl = roommanager.Collection("Reservation")

	var results []bson.M
	cur, err = userColl.Find(ctx, timefilter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer cur.Close(ctx)

	for cur.Next(ctx) {
		var reservation bson.M
		if err := cur.Decode(&reservation); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		results = append(results, reservation)
	}

	if err := cur.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//fmt.Println(results)

	var filteredResults []map[string]interface{}

	for _, obj1 := range result {
		found := false
		// Iterate through the second slice of maps
		for _, obj2 := range results {
			// Compare the ObjectIds
			if obj1["_id"].(primitive.ObjectID).Hex() == obj2["roomID"].(primitive.ObjectID).Hex() {
				found = true
				break
			}
		}
		// If the ObjectId was not found, print the map
		if !found {
			filteredResults = append(filteredResults, obj1)
		}
	}

	fmt.Println("\n", filteredResults)

	jsonBytes, err := json.Marshal(filteredResults)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(jsonBytes)

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
	startTime, _ := time.Parse("15:04", r.FormValue("startTime"))
	endTime, _ := time.Parse("15:04", r.FormValue("endTime"))
	username := r.FormValue("username")

	fmt.Println(roomIDstr, name, date, startTime, endTime, class, module)

	client, ctx := dbcon.Dbconect()

	roommanager := client.Database("roomManager")
	reservColl := roommanager.Collection("Reservation")
	userColl := roommanager.Collection("User")

	roomID, err := primitive.ObjectIDFromHex(roomIDstr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	// Check if a reservation already exists for the given room, date, and time range
	reservationFilter := bson.M{
		"roomID": roomID,
		"date":   date,
		"$or": []bson.M{
			bson.M{"date": date, "startTime": bson.M{"$gt": startTime, "$lt": endTime}},
			bson.M{"date": date, "endTime": bson.M{"$gt": startTime, "$lt": endTime}},
			bson.M{"date": date, "endTime": startTime},
			bson.M{"date": date, "startTime": endTime},
			bson.M{"date": date, "endTime": endTime},
			bson.M{"date": date, "startTime": startTime},
		},
	}
	count, err := reservColl.CountDocuments(ctx, reservationFilter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println(count)

	if count > 0 {
		http.Error(w, "Reservation already exists", http.StatusNotFound)
		return
	}

	projection := bson.M{"_id": 1}
	opts := options.FindOne().SetProjection(projection)

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}

	var user bson.M
	err = userColl.FindOne(ctx, bson.M{"username": username}, opts).Decode(&user)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
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

	w.WriteHeader(http.StatusOK)
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
		bson.D{
			{"$sort", bson.M{"date": 1}},
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

	roomCursor, err := userColl.Find(ctx, bson.M{"name": name})
	if err != nil {
		log.Fatal(err)
	}
	var roomFiltered []bson.M
	if err = roomCursor.All(ctx, &roomFiltered); err != nil {
		log.Fatal(err)
	}

	if len(roomFiltered) > 0 {
		fmt.Println("fail")
		http.Error(w, "Fehler!!!", http.StatusConflict)
	} else {
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
	http.HandleFunc("/student", getStudentFilteredRooms)
	http.ListenAndServe(":8081", nil)
}

func main() {
	handleRequests()
}
