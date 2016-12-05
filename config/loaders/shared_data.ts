var Env:any = {};


export function SetEnv(env:any){
    Env = env;
}

export function GetEnv():any{
    return Env;
}