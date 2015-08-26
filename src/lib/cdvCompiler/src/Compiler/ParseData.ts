/**
 * Created by salva on 15/08/15.
 */

module Compiler
{
    /**
     * Clase donde encapsulamos el codigo que se ha generado y si ha podido generarlo o no
     */
    export class ParseData
    {
        private _isCompiled : boolean;
        private _code : string;
        private _cmd : string;

        public setCompiled(value:boolean) {
            this._isCompiled = value;
        }

        public setCode(value:string) {
            this._code = value;
        }

        public setCmd(value : string)
        {
            this._cmd = value;
        }

        public isCompiled():boolean {
            return this._isCompiled;
        }

        public getCode():string {
            return this._code;
        }

        public getCmd() : string
        {
            return this._cmd;
        }

        constructor(status : boolean, code : string, cmd? : string)
        {
            this._code = code;
            this._isCompiled = status;
            if(cmd !== undefined)
                this._cmd = cmd;
        }

    }
}