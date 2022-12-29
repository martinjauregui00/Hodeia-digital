import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PbiDto } from './pbi.dto';
import { Pbi, PbiDocument } from './pbi.schema';

@Injectable()
export class PbiService {

    constructor(
        @InjectModel(Pbi.name) private PbiModel: Model<PbiDocument>

    ) {}
    async getPbi(id:string):Promise<Pbi|Object> {
        let pbi= await this.PbiModel.findOne({id:id});
        if(pbi==null) return {error:"Pbi does not exit"};
        else  return pbi;
          
    }//getPbi
 
   async getPbis() {

        return await this.PbiModel.find();
    }//getPbis

   async createPbi(body: PbiDto): Promise<any> {

        await this.PbiModel.collection.insertOne(body);

        return { messageCreated: `Pbi CREATED` }

    }//createPbi
    async updatePbi(id: string, body: any):Promise<any> {
        console.log(body);
        
        await this.PbiModel.updateOne({ id }, { $set: body });
        return { messageCreated: `Pbi UPDATED` }

    }//updatePbi

    async deletePbi(id: string):Promise<any> {
        await this.PbiModel.deleteOne({ id });
        return  { messageCreated: `Pbi DELETED` }

    }//deletePbi

}//class PbiService


