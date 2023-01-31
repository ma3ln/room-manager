package dbcon

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

func Dbconect() (*mongo.Client, context.Context) {
	dat, err := os.ReadFile("C:/Users/Lisa/DbCon.con")
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
	return client, ctx
}

/*func main() {
	type Todo struct {
		ID          primitive.ObjectID `bson:"_id,omitempty"`
		Description string             `bson:"description"`
		Status      string             `bson:"status"`
	}

	fmt.Println("ping")

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
	test := client.Database("test")
	test123 := test.Collection("test123")

	test123Result, err := test123.InsertOne(ctx, bson.D{
		{Key: "title", Value: "moin moin"},
		{Key: "title2", Value: "1234"},
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(test123Result.InsertedID)

	test123Results, err := test123.InsertMany(ctx, []interface{}{
		bson.D{
			{"test123", test123Result.InsertedID},
			{"title", 123},
			{"testa", 456},
		},
		bson.D{
			{"test123", test123Result.InsertedID},
			{"title", 456},
			{"testa", 123},
		},
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(test123Results.InsertedIDs)

	cursor, err := test123.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	var tests []bson.M
	if err = cursor.All(ctx, &tests); err != nil {
		log.Fatal(err)
	}
	for i, t := range tests {
		fmt.Println(i, t)
	}

	fmt.Println(tests[0])
}*/
