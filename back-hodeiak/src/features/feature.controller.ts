import { Body, Controller, Get, Post, Param, Put, Delete, Res, ParseIntPipe } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureDto } from './feature.dto';
import { Feature } from './feature.schema';
import { EpicService } from '../epics/epic.service';
import { ConsoleLogger } from '@nestjs/common/services';

@Controller('features')
export class FeatureController {

    constructor(private readonly FeatureService:FeatureService, private readonly epicService:EpicService) { }


    @Get()
    async getFeatures():Promise<FeatureDto|Object>  {
        return  this.FeatureService.getFeatures();

    }//getFeatures

    @Get("/:featurename")
    async getFeature(@Param('featurename') featurename:string ) : Promise<Feature|Object>{
        return await  this.FeatureService.getFeature(featurename);

    }//getFeature

    @Get("features-by-epic/:id")
    async getFeaturesByEpicId(@Param('id') id: string): Promise<Feature|Object> {
        let epic: any = await this.epicService.getEpic(id);
        let features = epic._doc.features.map(async feature => {
            return await this.getFeature(feature)
        })

        return Promise.all(features).then(values =>{
            return values
        })
    }


    @Post()
    async createFeature(@Body() body: FeatureDto):Promise<any> {
                
         await this.FeatureService.createFeature(body);

        return {messageCreated:`FEATURE CREATED`}
    }

    

    @Put("/update/:id")
    async updateFeature(@Param('id')id: string, @Body() body: FeatureDto):Promise<any> {
        console.log('updFeat');
        
        await this.FeatureService.updateFeature(id,body);
        return {messageCreated:`FEATURE UPDATED`}
    }

   
    @Delete("/:id")
    async deleteFeature(@Param('id') id: string): Promise<any>{
        await this.FeatureService.deleteFeature(id);
        return {messageCreated:`FEATURE DELETED`}
       
    }

}//class FeatureController








