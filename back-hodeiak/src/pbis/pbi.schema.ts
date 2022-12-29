import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type PbiDocument = Pbi & Document;
@Schema()
export class Pbi{
    @Prop()
    id: string;
    @Prop()
    pbiname: string;
    @Prop()
    tasks: [];
    @Prop()
    status: string;
 }
export const PbiSchema = SchemaFactory.createForClass(Pbi);