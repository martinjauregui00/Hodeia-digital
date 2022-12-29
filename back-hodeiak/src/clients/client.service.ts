import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientDto } from './client.dto';
import { Client, clientDocument } from './client.schema';

@Injectable()
export class ClientService {

    constructor(
        @InjectModel(Client.name) private clientModel: Model<clientDocument>

    ) { }
    
    async getClient(clientname: string):Promise<Client|Object> {
        let client= await this.clientModel.findOne({clientname:clientname});
        if(client==null) return {error:"No existe cliente"};
        else  return client;
          
    }//getClient

    
   async getClients() {

        return await this.clientModel.find();
    }//getClients

   async createClient(body: ClientDto): Promise<any> {

        await this.clientModel.collection.insertOne(body);

        return { messageCreated: `CLIENT CREATED` }

    }//createClient
    async updateClient(id: string, body: any):Promise<any> {

        await this.clientModel.updateOne({ id }, { $set: body });
        return { messageCreated: `CLIENT UPDATED` }

    }//updateClient

    async deleteClient(id: string):Promise<any> {
        await this.clientModel.deleteOne({ id });
        return { messageCreated: `CLIENT DELETED` }
    }//deleteClient

}//class ClientService


