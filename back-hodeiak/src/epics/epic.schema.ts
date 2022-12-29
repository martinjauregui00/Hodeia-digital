import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EpicDocument = Epic & Document;

@Schema()
export class Epic {
    @Prop()
    id:string
    @Prop({require:true})
    name:string
    @Prop({require:true})
    feature:[]
    @Prop()
    status:string

}

export const EpicSchema = SchemaFactory.createForClass(Epic);

