package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"os"
	"strings"
	"time"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	fmt.Print("ping")

	dat, err := os.ReadFile("C:/Users/nobis/OneDrive/Desktop/DbCon.con")
	check(err)
	s := string(dat)
	a := strings.Split(s, " ")

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://" + a[0] + ":" + a[1] + "@roommanager.6xg9fpg.mongodb.net/?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
}
