package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Menu struct {
	ID         primitive.ObjectID `bson:"_id" json:"id"`
	Name       string             `bson:"name" json:"name"`
	Category   string             `bson:"category" json:"category"`
	Start_date *time.Time         `bson:"start_date" json:"start_date"`
	End_date   *time.Time         `bson:"end_date" json:"end_date"`

	Created_at time.Time `bson:"created_at"`
	Updated_at time.Time `bson:"updated_at"`
}
