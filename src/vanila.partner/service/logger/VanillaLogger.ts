import { Injectable } from "@angular/core";
import { Logger } from "@bingo/config/interfaces/service/Logger.";

@Injectable()
export class VanillaLogger implements Logger {
    public Info(message: string): void {
        console.log(`Vannilla: [Info] ${message}`);
    }    
    
    public Warn(message: string): void {
        console.log(`Vannilla: [Warn] ${message}`);
    }
    
    public Error(message: string, err: object): void {
        console.log(`Vannilla: [Error] ${message}`);
    }
}