import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDto } from './project.dto';
import { Project, projectDocument } from './project.schema';

@Injectable()
export class ProjectService {

    constructor(
        @InjectModel(Project.name) private projectModel: Model<projectDocument>

    ) { }
    
    async getProject(projectname: string):Promise<Project|Object> {
        let project= await this.projectModel.findOne({projectname:projectname});
        if(project==null) return {error:"Project does not exist"};
        else  return project;
          
    }//getProject

    
   async getProjects() {

        return await this.projectModel.find();
    }//getProjects

   async createProject(body: ProjectDto): Promise<any> {

        await this.projectModel.collection.insertOne(body);

        return { messageCreated: `PROJECT CREATED` }

    }//createProject
    async updateProject(projectname: string, body: any):Promise<any>  {
        // await this.projectModel.updateOne({ projectname }, { $set: {users: body.users} });
        await this.projectModel.updateOne({ projectname }, { $set: body });
        return { messageCreated: `PROJECT update` }
    }//updateProject

    async deleteProject(projectname: string) {
        await this.projectModel.deleteOne({projectname:projectname});

    }//deleteProject
    //Change atributes
    async removeUser(name: string) {
      let proyecto=this.projectModel.findOne({ name });
      
    }//removeUser

    async deleteClientProject(projectname: string,clientname:string):Promise<any> {
        let project=await this.projectModel.deleteOne({projectname:projectname});
        return { messageCreated: `CLIENT CHANGED IN PROJECT` }
    }//deleteProject

   

    
}//class ProjectService


