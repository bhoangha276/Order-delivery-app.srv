package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Table struct {
	ID               primitive.ObjectID `bson:"_id" json:"id"`
	Number           *int               `bson:"number" json:"number"`
	Ordinal_of_guest *int               `ordinal_of_guest:"" json:"Ordinal_of_guest"`
	Status           int                `bson:"status" json:"status"`
	Capacity         int                `bson:"capacity" json:"capacity"`

	Created_at time.Time `bson:"created_at"`
	Updated_at time.Time `bson:"updated_at"`
}
