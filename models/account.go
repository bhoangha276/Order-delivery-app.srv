package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Account struct {
	ID            primitive.ObjectID `bson:"_id" json:"id"`
	Guest_id      *string            `bson:"guest_id" json:"guest_id"`
	Avatar        string             `bson:"avatar" json:"avatar"`
	Email         string             `bson:"email" json:"email"`
	Password      string             `bson:"password" json:"password"`
	Token         string             `bson:"token" json:"token"`
	Refresh_token string             `bson:"refresh_token" json:"refresh_token"`

	Created_at time.Time `bson:"created_at"`
	Updated_at time.Time `bson:"updated_at"`
}
