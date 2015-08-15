/**
 * Created by javi on 15/04/15.
 */

/**
 * Esta clase se encagarga de la comunicacion entre el juego y el compilador
 * Gestiona los buffers de entrada y salida que seran actualizados por quien los requiera
 */
///<reference path ="CDVCompiled.ts" />

module Compiler
{
    // TODO Hacer esta clase singleton
    export class CompilerBridge
    {

        private compiledObjetc : Array<CDVCompiled>;

        public runit(code : string) :number
        {

            return 0;
        }

        public compile(code : string) : boolean
        {
            return false;
        }
    }


}