/**
 * Created by salva on 24/08/15.
 */
///<reference path="../../../game/cdvs/CdvLogic.ts"/>

module BufferSystem
{
    export interface INotifier
    {
        /**
         * Anyade un nuevo CDV a la lista de observadores
         * @param newCDV cdv que queremos anyadir
         * @return devuelve el id asignado
         */
        addCdv(newCDV : Roboycod.CdvLogic) : number;
        /**
         * Elimina un CDV de la lista por medio del id
         * @param id numero que tiene asignado en la lista
         * @return devuelve si ha podido eliminarlo o no
         */
        removeCdv(id : number) : boolean;
        /**
         * Funcion que notifica a todos sus registrados si se ha producido un cambio
         * @return numero de observadores notificados
         */
        notify() : number;
    }
}