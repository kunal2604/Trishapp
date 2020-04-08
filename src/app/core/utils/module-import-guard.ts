export function throwIfAlreadyLoaded(parentModule:any, moduleName:string) {
    if(parentModule) {
        throw new Error(
            `${moduleName} has already been loaded. Impor Core Module in AppModule only.`
        );
    }
}