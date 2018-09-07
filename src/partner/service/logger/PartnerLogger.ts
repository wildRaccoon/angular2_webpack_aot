import { Injectable } from "@angular/core";
import { Logger } from "@bingo/config/interfaces/service/Logger.";

@Injectable()
export class PartnerLogger implements Logger {
    public Info(message: string): void {
        console.log(`Partner: [Info] ${message}`);
    }    
    
    public Warn(message: string): void {
        console.log(`Partner: [Warn] ${message}`);
    }
    
    public Error(message: string, err: object): void {
        console.log(`Partner: [Error] ${message}`);
    }
}