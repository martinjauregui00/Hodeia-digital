import { Body, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { EpicService } from "./epic.service";
import { ProjectService } from "../projects/project.service";
import { EpicDTO } from "./epic.dto";
import { Project } from '../projects/project.schema';
@Controller('epics')
export class EpicController {
    constructor(private readonly epicService: EpicService, private readonly projectService: ProjectService) { }

    @Get()
    async getEpics(): Promise<EpicDTO | Object> {
        return this.epicService.getEpics();


    }//getEpics
    @Get("/:id")
    async getEpic(@Param('id') id: string): Promise<EpicDTO | Object> {
        return await this.epicService.getEpic(id);
    }

    @Get("epics-by-project/:id")
    async getEpicsByProjectId(@Param('id') id: string): Promise<EpicDTO | Object> {
        let project: any = await this.projectService.getProject(id);
        
        let epics = project.epics.map(async epic => {
            return await this.getEpic(epic)
        })

        return Promise.all(epics).then(values =>{
            return values
        })
    }

    @Post()
    async createEpic(@Body() body: EpicDTO): Promise<any> {

        await this.epicService.createEpic(body);
        return { messageCreated: `EPIC CREATED` }
    }

    @Delete('/:id')
    async deleteEpic(@Res() res, @Param("id") id): Promise<any> {
        await this.epicService.deleteEpic(id);
        return { messageCreated: `EPIC DELETED` }
    }

    @Put('/update/:id')
    async updateUser(@Body() body: EpicDTO, @Param("id") id: string): Promise<any> {
        console.log('updEpic');
        
        await this.epicService.updateEpic(id, body);
        return { messageCreated: `EPIC UPDATED` }
    }


}

