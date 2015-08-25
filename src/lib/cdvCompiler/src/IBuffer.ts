/**
 * Created by salva on 21/08/15.
 */
module IOSystem
{
    export interface IBuffer
    {
        bufferOutAdd(input : string) : number;
        bufferOutGet(id : number) : string;
    }

}