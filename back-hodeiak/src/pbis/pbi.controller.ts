import { Body, Controller, Get, Post, Param, Put, Delete, Res, ParseIntPipe } from '@nestjs/common';
import { PbiService } from './pbi.service';
import { PbiDto } from './pbi.dto';
import { Pbi } from './pbi.schema';
import { FeatureService } from 'src/features/feature.service';

@Controller('pbis')
export class PbiController {

    constructor(private readonly PbiService:PbiService, private readonly featureService:FeatureService) { }


    @Get()
    getPbis():any  {
        return  this.PbiService.getPbis();

    }//getPbis

    @Get("/:id")
    async getPbi(@Param('id') id:string ) : Promise<Pbi|Object>{
        return await  this.PbiService.getPbi(id);

    }//getPbi

    @Get("pbis-by-feature/:id")
    async getPbisByFeatureId(@Param('id') id: string): Promise<Pbi|Object> {
        let feature: any = await this.featureService.getFeature(id);
        let pbis = feature._doc.pbis.map(async pbi => {
            return await this.getPbi(pbi)
        })

        return Promise.all(pbis).then(values =>{
            return values
        })
    }

    @Post()
    async createPbi(@Body() body: PbiDto):Promise<any> {
                
         await this.PbiService.createPbi(body);

        return {messageCreated:`Pbi CREATED`}
    }

    

    @Put("/update/:id")
    async updatePbi(@Param('id') id: string, @Body() body: PbiDto):Promise<any> {
        console.log(body);
        console.log('updPbi');
        
        await this.PbiService.updatePbi(id,body);
        return {messageCreated:`Pbi UPDATED`};
    }

   
    @Delete("/:id")
    async deletePbi(@Param('id') id: string): Promise<any> {
       await  this.PbiService.deletePbi(id);
       return {messageCreated:`Pbi DELETED`};
       
       
    }

}//class PbiController








