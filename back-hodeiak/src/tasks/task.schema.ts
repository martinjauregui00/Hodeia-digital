import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type taskDocument = Task & Document;
@Schema()
export class Task{
   
    @Prop()
    id:string
    @Prop()
    status:string
    @Prop()
    title:string;
    @Prop()
    description:string;
    @Prop()
    user:string;
    @Prop()
    end:string;
    
    }
export const TaskSchema = SchemaFactory.createForClass(Task);