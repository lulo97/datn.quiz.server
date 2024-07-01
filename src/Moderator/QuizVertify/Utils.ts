import { RowDataPacket } from "mysql2";
import { User } from "../../InterfacesDatabase";

export interface QuizForVertify extends RowDataPacket {
    QuizId: string;
    QuizInformationId: string;
    Name: string;
    UserVertify: User | null;
    VerifiedAt: string | null;
}
