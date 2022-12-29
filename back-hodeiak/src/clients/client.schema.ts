import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type clientDocument = Client & Document;
@Schema()
export class Client{

   @Prop({unique:true, require:true})
    id: string;
    @Prop()
    clientname: string;
    @Prop({unique:true, require:true})
    email: string;
  
}

export const ClientSchema = SchemaFactory.createForClass(Client);