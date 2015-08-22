/**
 * Created by salva on 15/08/15.
 */

declare module CGrammar
{
    class Lexer
    {
        EOF : number;
        rules : Array<RegExp>;

        parseError(str : string, hash : any) : void;
        setInput(input : string) : Lexer;
        input () : string ;
        unput (str : string) : Lexer;
        more () : Lexer;
        reject() : Lexer;
        less (n : number) : void ;
        pastInput () : string;
        upcomingInput () : string;
        showPosition () : string;
        test_match (regex_match_array : string, rule_index : any): any;
        next () : any;
        lex () : any;
        begin (condition : number) : void;
        popState () : number;
        _currentRules () : any;
        topState (n? : number) : string;
        pushState (condition : any) : void;
        stateStackSize () : number;
        performAction (yy : string, yy_ : number,$avoiding_name_collision : number, YY_START : number) : any;
    }


    class Parser
    {
        yy : Object;
        lexer : Lexer;

        symbols_ : {[name : string] : number;};
        terminals_ : {[num : number] : string;};
        productions_ : Array<any>;
        table : Array<any>;
        defaultActions : Object;

        trace() : any;
        performAction (yytext : string, yyleng : number, yylineno : number, yy : Object , yystate : number, $$ : Array<any>, _$ : Array<any>) : void;
        parseError(str : string, hash : any) : void;
        parse(input : string ) : string;

    }

}


