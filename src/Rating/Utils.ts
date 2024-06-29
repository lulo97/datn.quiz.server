import { RowDataPacket } from "mysql2";
import { Rating, User } from "../InterfacesDatabase";

interface RatingDetail extends Omit<Rating, "UserId"> {
    User: User
}

export interface MySQLFunctionReturn extends RowDataPacket {
    data: RatingDetail[];
}