/**
 * Created by salva on 30/08/15.
 */


module IOSystem
{
    export  class SetUp
    {
        /**
         * Funcion para hacer setUp de los compiladores que queramos añadir a la aplicación
         */
        public static compilers     : {[compiler : string] :  string } =
        {
            ["CCompiler"] : "src/lib/cdvCompiler/src/Compiler/CCompiler.js",
            ["PythonCompiler"] : "src/lib"
        }
    }
}