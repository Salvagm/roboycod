/**
 * Created by salva on 15/08/15.
 */


module Compiler
{
    export interface ICompilator
    {
        exec(code : string);
        compile(code : string);
    }
}