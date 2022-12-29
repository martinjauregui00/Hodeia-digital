import { Body, Delete, HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Epic, EpicDocument } from './epic.schema';
import { EpicDTO } from "./epic.dto";

@Injectable()
export class EpicService {
    constructor(@InjectModel(Epic.name) private readonly epicModel:Model<EpicDocument>){}
    
    async getEpics() {
        return await this.epicModel.find();
    }

    async getEpic(id: string): Promise<Epic> {
        return await this.epicModel.findOne({id}); 
    }

    // async getByEpicIdFeatures(id: string): Promise<any> {
    //     let epicById = await this.epicModel.findOne({id}); 
    //     return 
    // }

    async createEpic(body:EpicDTO): Promise<any> {
        await this.epicModel.collection.insertOne(body);
        return {messageCreated:"EPIC CREATED"};
    }

    async deleteEpic(id: number): Promise<any> {
        await this.epicModel.deleteOne({id: id});
        return {messageCreated:"EPIC DELECTED"};
    }

    async updateEpic(id: string,body:any){
        await this.epicModel.updateOne({id}, {$set:body});
        
    }
    
}

