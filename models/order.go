package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct {
	ID          primitive.ObjectID `bson:"_id" json:"id"`
	Employee_id *string            `bson:"employee_id" json:"employee_id"`
	Table_id    *string            `bson:"table_id" json:"table_id"`
	User_id     *string            `bson:"user_id" json:"user_id"`
	Date        time.Time          `bson:"date" json:"date"`

	Created_at time.Time `bson:"created_at"`
	Updated_at time.Time `bson:"updated_at"`
}
