/**
 * Created by salva on 21/08/15.
 */
module IOSystem
{
    /**
     * INFO DE SALIDA PARA COUT Y CIN
     */
    export interface IBuffer
    {
        bufferOutAdd(input : string) : number;
        bufferOutGet(id : number) : string;
    }

}