import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type projectDocument = Project & Document;
@Schema()
export class Project{  
    @Prop()
    projectname: string;

    @Prop()
    title: string;

    @Prop()
    start: string;

    @Prop()
    status:string;

    @Prop()
    clientname:string;

    @Prop()
    epics:[]

    @Prop()
    users:[]
}
export const ProjectSchema = SchemaFactory.createForClass(Project);