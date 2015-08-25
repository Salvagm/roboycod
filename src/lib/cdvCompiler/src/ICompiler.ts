/**
 * Created by salva on 15/08/15.
 */

///<reference path="ParseData.ts"/>
    
module Compiler
{
    /**
     * Interfaz que extiende de Worker con la que abstraemos la funcionalidad de otros compiladores
     * Esta interfaz tiene como objetivo el poder anyadir nuevos compiladres sin realizar modificaciones
     * Ademas extiende de worker con el fin de que cuando se realice un compilador se deba lanzar en otros hilos
     * con el fin de que no cuelge el juego cuando compila
     */
    export interface ICompiler
    {
        /**
         * Funcion que recibe el codigo escrito en el lenguaje y devuelve un objeto
         * @param code codigo que queremos compilar
         */
        compile(code : string) : void;




    }
}