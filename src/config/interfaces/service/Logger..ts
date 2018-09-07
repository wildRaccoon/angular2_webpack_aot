import { Injectable } from "@angular/core";

@Injectable()
export abstract class Logger {
    abstract Info(message:string):void;

    abstract Warn(message:string):void;

    abstract Error(message:string,err:object):void;
}