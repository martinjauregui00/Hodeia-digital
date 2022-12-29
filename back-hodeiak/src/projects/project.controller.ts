import { Body, Controller,HttpStatus, Get, Post, Param, Put, Delete, Res, ParseIntPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './project.dto';
import { Project } from './project.schema';

@Controller('projects')
export class ProjectController {
    constructor(private readonly ProjectService:ProjectService) { }

    @Get()
    getProjects():any  {
        return  this.ProjectService.getProjects();

    }//getProjects

    @Get("/:projectname")
    async getProject(@Param('projectname') projectname:string, ) : Promise<Project|Object>{
        return await  this.ProjectService.getProject(projectname);

    }//getProject

    @Post("/create")
    async createProject(@Body() body: ProjectDto):Promise<any> {
                
        await this.ProjectService.createProject(body);

        return {messageCreated:`Project created`}
    }

    @Put("/update/:projectname")
    updateProject(@Body() body: ProjectDto, @Param('projectname') projectname) : any {
        console.log('upProj');
        
        return this.ProjectService.updateProject(projectname,body);
    }
       
    @Delete(':projectname')
    async deleteUser(@Param("projectname") projectname) {
        const projectDeleted = await this.ProjectService.deleteProject(projectname);
      
    }
}//class ProjectController








