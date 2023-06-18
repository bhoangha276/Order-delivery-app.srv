package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Employee struct {
	ID   primitive.ObjectID `bson:"_id" json:"id"`
	Name string             `bson:"name" json:"name"`
	Code string             `bson:"code" json:"code"`
	Role string             `bson:"role" json:"role"`

	Created_at time.Time `bson:"created_at"`
	Updated_at time.Time `bson:"updated_at"`
}
