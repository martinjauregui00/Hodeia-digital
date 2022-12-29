import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/user.service';
import { UsersController } from './users/user.controller';
import {User,UserSchema} from './users/user.schema'
import {Epic,EpicSchema} from './epics/epic.schema'
import { EpicController } from './epics/epic.controller';
import { EpicService } from './epics/epic.service';
import * as dotenv from 'dotenv'
import { FeatureService } from './features/feature.service';
import { FeatureController } from './features/feature.controller';
import {Feature,FeatureSchema} from './features/feature.schema'
import { PbiService } from './pbis/pbi.service';
import { PbiController } from './pbis/pbi.controller';
import {Pbi,PbiSchema} from './pbis/pbi.schema'
import { TaskService } from './tasks/task.service';
import { TaskController } from './tasks/task.controller';
import {Task,TaskSchema} from './tasks/task.schema'
import { ProjectService } from './projects/project.service';
import { ProjectController } from './projects/project.controller';
import {Project,ProjectSchema} from './projects/project.schema'
import { ClientService } from './clients/client.service';
import { ClientController } from './clients/client.controller';
import {Client,ClientSchema} from './clients/client.schema'

dotenv.config()

@Module({
  imports: [MongooseModule.forRoot(process.env.CONNECTION_STRING)
,MongooseModule.forFeature([{name:User.name,schema:UserSchema},{name:Epic.name,schema:EpicSchema},
  {name:Client.name,schema:ClientSchema},{name:Project.name,schema:ProjectSchema},{name:Feature.name,schema:FeatureSchema},
  {name:Pbi.name,schema:PbiSchema},{name:Task.name,schema:TaskSchema}])],
  controllers: [AppController, UsersController, EpicController,ProjectController,PbiController,TaskController,FeatureController,ClientController],
  providers: [AppService, UsersService, EpicService,ProjectService,PbiService,TaskService,FeatureService,ClientService],
})
export class AppModule {}
