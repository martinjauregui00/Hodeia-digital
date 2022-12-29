import { Body, Controller, Get, Post, Param, Put, Delete, Res, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
import { Task } from './task.schema';
import { PbiService } from 'src/pbis/pbi.service';

@Controller('tasks')
export class TaskController {

    constructor(private readonly TaskService:TaskService, private readonly pbiService:PbiService) {}


    @Get()
    getTasks(): any {
        return this.TaskService.getTasks();

    }//getTasks

    @Get("/:taskname")
    async getTask(@Param('taskname') taskname: string): Promise<Task | Object> {
        return await this.TaskService.getTask(taskname);

    }//getUser

    @Get('/search/:user')
    async getUserTask(@Param('user') user: string): Promise<Task | Object> {
        return await this.TaskService.getUserTask(user)
    }


    @Post()
    async createTask(@Body() body: TaskDto): Promise<any> {

        await this.TaskService.createTask(body);

        return { messageCreated: `Task created` }
    }

    @Put("update/:id")
    updateTask(@Param('id') id: string, @Body() body: TaskDto): any{
        console.log('updTasks');
        
        return this.TaskService.updateTask(id,body);

    }

    @Get("tasks-by-pbi/:id")
    async getTasksByPbiId(@Param('id') id: string): Promise<any> {
        let pbi: any = await this.pbiService.getPbi(id);
        let tasks = pbi._doc.tasks.map(async task => {
            return await this.getTask(task)
        })

        return Promise.all(tasks).then(values =>{
            return values
        })
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string):Promise<any> {
        return await this.TaskService.deleteTask(id);
    }

}//class TaskController