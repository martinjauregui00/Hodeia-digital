import { Body, Controller, Get, Post, Param, Put, Delete, Res, ParseIntPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './client.dto';
import { Client } from './client.schema';

@Controller('clients')
export class ClientController {

    constructor(private readonly ClientService:ClientService) { }


    @Get()
    async getClients():Promise<ClientDto|Object> {
        return  await this.ClientService.getClients();
    }//getclients

    @Get("/:clientname")
    async getClient(@Param('clientname') clientname:string, ) : Promise<Client|Object>{
        return await  this.ClientService.getClient(clientname);
    }//getClient

    @Post()
    async createClient(@Body() body: ClientDto):Promise<any> {
                
        await this.ClientService.createClient(body);
        return {messageCreated:`CLIENT REGISTERED`}
    }
    @Put(":id")
    async updateClient(@Param('id') id: string, @Body() body: ClientDto): Promise<any> {
        
        await this.ClientService.updateClient(id,body);
        return {messageCreated:`CLIENT UPDATED`}
    }
    @Delete(":id")
    async deleteClient(@Param('id') id: string): Promise<any> {
        await this.ClientService.deleteClient(id);
        return {messageCreated:`CLIENT DELETED`}
       
    }

}//class ClientController








