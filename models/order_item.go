package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OrderItem struct {
	ID         primitive.ObjectID `bson:"_id" json:"id"`
	Order_id   string             `bson:"order_id" json:"order_id"`
	Food_id    *string            `bson:"food_id" json:"food_id"`
	Quantity   *string            `bson:"quantity" json:"quantity"`
	Unit_price *float64           `bson:"unit_price" json:"unit_price"`

	Created_at time.Time `bson:"created_at"`
	Updated_at time.Time `bson:"updated_at"`
}
