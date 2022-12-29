import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeatureDto } from './feature.dto';
import { Feature, FeatureDocument } from './feature.schema';

@Injectable()
export class FeatureService {

    constructor(
        @InjectModel(Feature.name) private featureModel: Model<FeatureDocument>

    ) { }
    
    async getFeature(id: string):Promise<Feature|Object> {
        let feature= await this.featureModel.findOne({id:id});
        if(feature==null) return {error:"FEATURE DOES NOT EXIST"};
        else  return feature;
          
    }//getFeature

    
   async getFeatures() {

        return await this.featureModel.find();
    }//getClients

   async createFeature(body: FeatureDto): Promise<any> {

        await this.featureModel.collection.insertOne(body);
        return { messageCreated: `FEATURE CREATED` }

    }//createFeature
    async updateFeature(id: string, body: any):Promise<any> {

        await this.featureModel.updateOne({ id }, { $set: body });
        return { messageCreated: `FEATURE UPDATED` }

    }//updateFeature

    async deleteFeature(name: string):Promise<any> {
        await this.featureModel.deleteOne({ name });
        return { messageCreated: `FEATURE DELETED` }

    }//deleteFeature

}//class FeatureService


