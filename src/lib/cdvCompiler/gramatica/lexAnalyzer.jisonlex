/* Analizador Lexico */


D    [0-9]
L    [a-zA-Z]
LD   [0-9a-zA-Z]
%{

function LexicalError()
{
	var col = yylloc['first_column'] + 1;
	console.log("---------------------------------------------------------");
	console.log("Error Lexico en linea ("+ yylloc['first_line'] +","+ col +"): "
		+ "La cadena \"" + yytext + "\" no se reconoce" );
	console.log("---------------------------------------------------------");
}

%}

%%

\s+				{/* skip whitespace */}
\t				{/* skip tabs */}
\n				{/* skip newline */}

{D}+			return 'tInteger';
{D}+(\.){D}+    return 'tFloat'; 
"main"			return 'tMain';
"if"			return 'tIf';
"else"			return 'tElse';
"int"			return 'tInt';
"char"			return 'tChar';
"bool"			return 'tBool';
"float"			return 'tFloat';
"void"			return 'tVoid';
"cin"			return 'tCin';
"cout"			return 'tCout';
"endl"			return 'tEndl';

">>"			return 'tRdesp';
"<<"			return 'tLdesp';
">"             return 'tRelop';
"<"				return 'tRelop';
"=="			return 'tRelop';
"<="			return 'tRelop';
">="			return 'tRelop';
"="             return 'tAssign';
"||"            return 'tOr';
"&&"			return 'tAnd';
"+"             return 'tAddop';
"-"             return 'tAddop';
"*"             return 'tMulop';
"/"				return 'tMulop';
"%"				return 'tMulop';
"!"             return 'tNot';
"{"             return 'tLbrace';
"}"             return 'tRbrace';
"("             return 'tLparen';
")"             return 'tRparen';
"["				return 'tRclasp';
"]"				return 'tLclasp';
";"             return 'tSemicolon';
","				return 'tComa';
{L}({LD})*		return 'tId';
<<EOF>>			return 'tEOF';
.				throw new LexicalError(lexer);