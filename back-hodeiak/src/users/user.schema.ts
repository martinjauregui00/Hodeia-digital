import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    id:string;
    @Prop()
    username: string;
    @Prop({require:true,unique:true})
    email:string;
    @Prop({require:true})
    password:string;
    @Prop()
    image:string;
    @Prop({require:true})
    status:string;
    @Prop()
    hourCost:number;
    @Prop()
    projects:[];
}

export const UserSchema = SchemaFactory.createForClass(User);

