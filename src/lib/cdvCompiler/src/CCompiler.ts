/**
 * Created by salva on 15/08/15.
 */

///<reference path ="ICompilator.ts" />

module Compiler
{
    export class CCompiler implements ICompilator, Worker
    {
        onmessage:(p1:MessageEvent)=>any;
        onerror:(p1:ErrorEvent)=>any;
        private myCompiler : any;
        private myWorker : Worker;

        postMessage(message:any, ports:any):void {
        }

        terminate():void {
        }

        addEventListener(type:string, listener:(p1:ErrorEvent)=>any, useCapture:boolean):void {
        }

        removeEventListener(type:string, listener:EventListener, useCapture:boolean):void {
        }

        dispatchEvent(evt:Event):boolean {
            return undefined;
        }




        constructor()
        {
            this.myWorker = new Worker("../gramatica/grammar.js");
        }

        public exec(code : string)
        {
            
        }

        public compile(code : string)
        {

        }
    }
}