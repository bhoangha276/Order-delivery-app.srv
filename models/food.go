package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Food struct {
	ID      primitive.ObjectID `bson:"_id" json:"id"`
	Menu_id *string            `bson:"menu_id" json:"menu_id"`
	Name    *string            `bson:"name" json:"name"`
	Price   *float64           `bson:"price" json:"price"`
	Image   *string            `bson:"image" json:"image"`

	Created_at time.Time `bson:"created_at"`
	Updated_at time.Time `bson:"updated_at"`
}
