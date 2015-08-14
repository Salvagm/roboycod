%token tId
%token tRelop tOr tAnd
%token tAssign 
%token tAddop tMulop
%token tNot
%token tLbrace tRbrace tLparen tRparen tRclasp tLclasp
%token tSemicolon tComa
%token tInt tChar tFloat tBool tVoid
%token tEOF
%token tReturn
%token tTrue tFalse
%token tInteger tReal tCharacter tString
%token tLdesp tRdesp
%token tEndl tCin tCout
%token tIf 
%token tMain

%nonassoc tIfWithoutElse tElse
// TODO: (1) Recordatorio para sobreescribir el error sintactico
// parser.yy.parseError = function (str, hash)
// {
// 	console.log(token);
// }
%{

/**
 * Objeto utilizado para controlar los ambitos del programa
 */
function StackScope()
{
	this.scopes = [];
	this.globalScope = '';
	this.scopelength = -1;
}
/**
 * Funcion para anyadir un ambito global a la pila de ambitos
 * return {Scope} devuelve el ambito global
 */
StackScope.prototype.addGlobalScope = function ()
{
	this.globalScope = new Scope("Global");
	return this.globalScope;
};
/**
 * Funcion para anyadir un nuevo ambito a la pila de ambitos 
 * @param {string} nombre del ambito
 * @return {Scope} devuelve el ambito creado
 */
StackScope.prototype.addNewScope = function (name)
{
	var newScope = new Scope(name);
	this.scopes.unshift(newScope);
	this.scopelength = this.scopes.length - 1;
	return newScope;
};

/**
 * Funcion para quitar el ambito de la pila de ambitos
 * @return {Scope} devuelve el ambito eliminado
 */
StackScope.prototype.deleteScope = function()
{
	return this.scopes.shift();
};
/**
 * Funcion para buscar un atributo del ultimo ambito de la pila de ambitos
 * @param  {string} nombre del atributo que queremos buscar 
 * @return {bool} devuelve true si encuentra la variable, false en caso contrario
 */
StackScope.prototype.findAttribute = function(id)
{
	var symbolFound = null;
	if(this.scopes.length > 0)
		symbolFound =  this.scopes[this.scopelength].findId(id);
	
	if(symbolFound === null)
		symbolFound = this.globalScope.findId(id);

	return symbolFound;
};
/**
 * Funcion que nos del ambito actual de las variables, en caso de que no haya devuelve el global
 * @return {Scope} devuelve el ultimo ambito de la pila
 */
StackScope.prototype.getCurrentScope = function ()
{
	if(this.scopes.length > 0)
		return this.scopes[this.scopelength];
	return this.globalScope;
};

/**
 * Objeto con el que encapsulamos el ambito
 * @param {string} Nombre del ambito
 */
function Scope(name)
{
	/**
	 * Nombre del ambito
	 * @type {string} nombre
	 */
	this.name = name || "";
	/**
	 * lista de simbolos del ambito
	 * @type {Array<Symbol>} array de simbolos 
	 */
	this.symbols = [];
};
/**
 * Funcion que busca un id dentro del ambito
 * @param  {string} variable a buscar
 * @return {bool} devuelve true en caso de que exista
 */
Scope.prototype.findId = function (name)
{
	var symbolFound = null;
	var exists;
	exists = this.symbols.some(function(element, index, array) 
	{
		if(element.name === name)
		{	
			symbolFound = element;
			return true;
		}
		else
			return false;
	});
	return symbolFound;
};
/**
 * Funcion para anayadir un nuevo simbolo al ambito
 * @param {Symbol} simbolo nuevo
 */
Scope.prototype.addSymbol = function (nSymbol)
{
	this.symbols.push(nSymbol);
	return nSymbol;
};
/**
 * Funcion para actualizar los tipos de las variables del ambito
 * @param  {EnumTypes} symbolType tipo de dato que se asigna a las variables sin tipo
 */
Scope.prototype.updateType = function (symbolType) {
	var index = this.symbols.length -1;
	var done  = false;
	while(index >= 0 && !done)
	{
		if(this.symbols[index].sBaseType === -1)
			this.symbols[index].sBaseType = symbolType;
		else
			done = true;

		--index;
	}
}

/**
 * Objeto que encapsula el simbolo leido por el analizador
 * @param {string} Nombre de la varibale
 * @param {number} tipo de la varibale
 * @param {Array} numero de dimensiones con sus tamanyos;
 */
function Symbol(name,sBaseType,sArray)
{
	this.name = name || "";
	this.sBaseType = sBaseType || 99;
	this.sType = 99;
	this.sArray = sArray || [];
	this.sArgs = [];
	this.hasValue = false;
}


/**
 * Objeto utilizado para enviar marcadores en las producciones
 * @param {string} Lexema leido
 * @param {string} cadena con la traduccion
 * @param {number} Tipo de simbolo
 */
function Mark (lex,trad,baseType)
{
	this.type = '';
	this.baseType = baseType || '';
	if(trad === 0)
		this.trad = 0;
	else
		this.trad = trad || "";
	this.lex = lex || "";
	this.mArray = []; // atributo que nos indica si la marca es un array con sus dimensiones y tamaños
	this.args = [];
	this.line = 0;
	this.currentSymbol = '';
}

/**
 * Copia de una marca a otra
 * @param  {Mark} Marca que queremos copiar
 * @return {Mark} devuelve la marca copiada
 */
function copyMark(otherMark)
{
	var auxMark = new Mark();

	auxMark.type = otherMark.symbolType;
	auxMark.baseType = otherMark.baseType;
	auxMark.trad = otherMark.trad;
	auxMark.lex = otherMark.lex;
	auxMark.mArray = otherMark.mArray;
	auxMark.line = otherMark.line;
	auxMark.currentSymbol = otherMark.currentSymbol;
	auxMark.args = otherMark.args;
	return auxMark;
	
}
/**
 * Enum con los tipos de variables
 * @type {number}
 */
EnumTypes = {
	INTEGER : 1,
	FLOAT : 2,
	CHAR : 3,
	BOOL : 4,
	STRING : 5,
	VARIABLE: 6,
	ARRAY : 7,
	FUNCTION : 8,
	VOID : 9,
	UNDEFINED : -1
};
/**
 * Enum con los tipos de errores
 * @type {number}
 */
ErrorTypes =
{
	TYPEMISMATCH : 1,
	MISOPERATION : 2,
	STRINGOP : 3,
	CHARNUMBER : 4,
	STRINGNUMBER : 6,
	NOTFOUND : 7,
	FUNCTYPEERROR : 8,
	NOTFUNCTYPEERROR : 9,
	ARRAYTYPE : 10,
	INITVALUE : 11
}

var stackScope = new StackScope();
	

%}


///////////////////////////
/// INICIO DE LA GRAMATICA
///////////////////////////
%%

S : GLOBAL FVM tEOF
	{
		console.log(stackScope);
  		console.log($2.trad);
		console.log("FIN DE TRADUCCION");
		
		
		// { typeof console !== 'undefined' ? console.log($1) : print($1);
  //         return $1; }
  
  		eval($2.trad);
  		eval("main()");

  
	};
GLOBAL :  // anyadimos el ambito global al inicio
	{
		stackScope.addGlobalScope();	
	};
//////////////////////////////////////////
/// DECLARACION VARIABLES GLOBALES Y FUNC
//////////////////////////////////////////

FVM :  FVMp
	{
		var trad = $1.trad;
		
		$$ = new Mark("",trad);
	};
FVM : tInt tMain MAINSCOPE tLparen Arg tRparen Bloque
	{
		sym = new Symbol("main",EnumTypes.INTEGER);
		sym.sType = EnumTypes.FUNCTION;
		sym.sArgs = $5.args;
		stackScope.globalScope.addSymbol(sym);
		var trad = "function main (" + $5.trad + ")" + $7.trad;
		
		$$ = new Mark("",trad);
		
	};
MAINSCOPE :
	{

		stackScope.addNewScope("main");
	};
FVMp :  GLOBALVARIABLES FVM  // isFunction false;
	{
		
		var trad = $1.trad  + $2.trad;
		
		// var trad = $1.trad + $2.trad + ";" + " " + $4.trad;
		$$ = new Mark("",trad);
	};

GLOBALVARIABLES : IDGLOBAL VarArr LIdentp tSemicolon
	{
		// TODO : (1) Anyadir la traduccion de VarArr para hacer arrays
		var trad = "var " + $1.trad + $3.trad + ";";
		
		stackScope.globalScope.updateType($1.baseType);

		$$ = new Mark("",trad);
	};

FVMp : FUNCGLOBAL Bloque FVM // isFunction true;
	{
		var trad = "function " + $1.trad + $2.trad + $3.trad;
		var mark = new Mark();
		mark.type = EnumTypes.FUNCTION;
		mark.trad = trad;
		
		$$ = mark;
	};
// MARCADOR PARA COMPROBAR QUE EL IDE NO SE HA DECLARADO DOS VECES
IDGLOBAL : TipoFunc tId
	{
		var trad = $2;
		var mark = new Mark($2,trad,$1.baseType);
		
		mark.currentSymbol = stackScope.getCurrentScope().addSymbol(new Symbol($2));
		mark.currentSymbol.sBaseType = $1.baseType;
		// console.log(mark);
		$$ = mark;
	};

FUNCGLOBAL : IDGLOBAL tLparen Arg tRparen
	{
		var trad = $1.trad + "(" + $3.trad + ")";
		var sym = $1.currentSymbol;
		sym.sType = EnumTypes.FUNCTION;
		sym.sArgs = $3.args;
		stackScope.globalScope.addSymbol(sym);
		stackScope.addNewScope(sym.name);
		$$ = new Mark("",trad);
	};

///////////////
/// ARGUMENTOS
///////////////

Arg :
	{
		$$ = new Mark();
	};
Arg : CArg
	{
		$$ = $1;
	};
CArg : Tipo tId CArgp
	{
		var trad = $2 + $3.trad;
		var mark = copyMark($3);
		mark.trad = trad;
		mark.args.unshift($1.baseType);

		$$ = mark;
	};
CArgp : tComa Tipo tId CArgp
	{
		var trad = "," + $3 + $4.trad;
		var mark = copyMark($4);
		mark.trad = trad;
		mark.args.unshift($2.baseType);

		$$ = mark;
	};
CArgp :
	{
		$$ = new Mark();
	};

////////////////////////////
/// BLOQUES DE CODIGO 
////////////////////////////

Bloque : tLbrace BDecl SeqInstr tRbrace
	{
		var trad = "{"+ $2.trad + $3.trad + "}";
		stackScope.deleteScope();
		$$ = new Mark("",trad);
	};
BDecl : BDeclp
	{
		$$ = $1;
	};

BDeclp : DecVar BDeclp
	{
		var trad = $1.trad + $2.trad;
		$$ = new Mark("",trad);
	};
BDeclp : 
	{
		$$ = new Mark();
	};

//////////////////////////////
/// TIPOS FUNCIONES VARIABLES
//////////////////////////////

Tipo : tInt 
	{ 	
		var mark = new Mark($1,"var ",EnumTypes.INTEGER);
		$$ = mark; // devuelve el objeto con el tipo y el nombre
	};
Tipo : tChar 
	{
		var mark = new Mark($1,"var ",EnumTypes.CHAR);
		$$ = mark; // devuelve el objeto con el tipo y el nombre
	} ;
Tipo : tFloat 
	{
		var mark = new Mark($1,"var ",EnumTypes.FLOAT);
		$$ = mark; // devuelve el objeto con el tipo y el nombre
	};
Tipo : tBool 
	{ 
		var mark = new Mark($1,"var ",EnumTypes.BOOL);
		$$ = mark; // devuelve el objeto con el tipo y el nombre
	};

TipoFunc : tVoid
	{
		$$ = new Mark($1,"function ", EnumTypes.FUNCTION);
	};
TipoFunc : Tipo
	{
		$$ = new Mark($1.lex,$1.trad,$1.baseType);
	};

/////////////////////////////
/// DECLARACION DE VARIABLES
/////////////////////////////

DecVar : Tipo LIdent tSemicolon 
	{
		stackScope.getCurrentScope().updateType($1.baseType);
		var trad = $1.trad + $2.trad + ";";
		$$ = new Mark("",trad,"");
	};
LIdent : Variable LIdentp 
	{
		var trad = $1.trad + $2.trad;
		$$ = new Mark("",trad,"");
	};
LIdentp : tComa Variable LIdentp 
	{
		var trad = $1 + $2.trad + $3.trad;
		$$ = new Mark("",trad,"");
	};
LIdentp : 
	{
			
		$$ = new Mark();
	};
Variable : tId VarArr 
	{
		sym = new Symbol($1,EnumTypes.UNDEFINED);
		// VARIABLE EN AMBITO
		if($2.type === EnumTypes.ARRAY)
		{
			// TODO: (0) !IMPORTANTE HACER ARRAYS EN UN FUTURO
		}
		var trad = $1 + $2.trad;
		stackScope.getCurrentScope().addSymbol(sym);
		$$ = new Mark("",trad,"");
	};
VarArr : 
	{
		$$ = new Mark();
	};
VarArr : tLclasp tInteger tRclasp VarArr
	{
		
		var trad = "["; 
		var numArray = parseInt($2);
		for(var i = 0 ; i < numArray-1 ; ++i)
		{
			trad = trad + "'',"; 
		}
		
		trad = trad + "'']"; 
		trad = trad + $4.trad;
		var mark = new Mark($2,trad);
		mark.arrayLength = numArray;
		mark.type = EnumTypes.ARRAY;
		$$ = mark;
	};



//////////////////
/// INSTRUCCIONES
//////////////////
SeqInstr : SeqInstr Instr
	{
		var trad = $1.trad + $2.trad;
		$$ = new Mark("",trad);
	};
SeqInstr : 
	{
		$$ = new Mark();
	};
Instr : tSemicolon
	{
		$$ = new Mark("",";");
	};
Instr : INSTRSCOPE Bloque
	{
		stackScope.deleteScope();
		$$ = $1;
	};

Instr : tReturn Expr tSemicolon
	{
		var trad = "return " + $1.trad + ";";
		$$ = new Mark("",trad);
	};

Instr : Ref tAssign Expr tSemicolon 
	{
		var sym = $1.currentSymbol;
		var trad = $1.trad + "=";

		if(sym.sBaseType === EnumTypes.FLOAT || sym.sBaseType === EnumTypes.INTEGER)
			trad = trad + numAssignation(sym,$3);
		else if(sym.sBaseType === EnumTypes.CHAR)
			trad = trad + charAssignation(sym,$3);
		else if(sym.sBaseType === EnumTypes.BOOL)
			trad = trad + boolAssignation(sym,$3);

		trad = trad + ";";
		sym.hasValue = true;
		$$ = new Mark("",trad);
		// trad = tId.trad + InstrId.trad;
	};

Instr : FINDID FunPar tSemicolon
	{	
		

	};
Instr : tCin tRdesp tId tSemicolon
	{
		// TODO : (0) Modificar para recoger valr del buffer
	};
Instr : tCout tLdesp Expr Instrout
	{
		// TODO: (0) Modificar por accesos al buffer
		var trad = "console.log("+$3.trad + $4.trad;
		$$ = new Mark("",trad);
	};
Instrout : tLdesp Instroutp
	{
		var trad = $2.trad;
		$$ = new Mark("",trad);
	};
Instrout : tLdesp tEndl tSemicolon
	{
		$$ = new Mark("","\n);");
	};
Instrout : tSemicolon
	{
		$$ = new Mark("",");");
	};
Instroutp : Expr Instrout
	{
		var trad = $1.trad + $2.trad;
		$$ = new Mark("",trad);
	};
Instr : tIf tLparen EXPRBOOL tRparen INSTRSCOPE Bloque %prec tIfWithoutElse
	{
		var trad = "if("+ $3.trad + ")" + $6.trad;
		$$ = new Mark("",trad);
	};
Instr : tIf tLparen EXPRBOOL tRparen INSTRSCOPE Bloque tElse Instr
	{
		var trad = "if(" + $3.trad + ")" +  $6.trad + "else " + $8.trad;

		$$ = new Mark("",trad);
	};
EXPRBOOL : Expr
	{
		if($1.baseType !== EnumTypes.BOOL)
			throw new compilationError(ErrorTypes.BOOLTYPE, yy.lexer.yylloc["first_line"]);

		$$ = $1;
	};
INSTRSCOPE : 
	{
		stackScope.addNewScope("InstrScope");
	};
////////////////
/// EXPRESIONES
////////////////
Expr : ExprOr
	{
		// console.log($1);
		$$ = $1;
	};
ExprOr : ExprOr tOr ExprAnd
	{
		var trad = "Boolean(";
		if($1.baseType === EnumTypes.STRING || $3.baseType === EnumTypes.STRING)
			throw new compilationError(ErrorTypes.STRINGLOGOP, $1.line);

		convertToNumValue($1,$3);
		trad = trad + $1.trad + "||" + $3.trad;
		$$ = new Mark("",trad,EnumTypes.BOOL);


	};
ExprOr : ExprAnd
	{
		$$ = $1;
	};
	
ExprAnd : ExprAnd tAnd ExprComp
	{
		var trad = "Boolean(";
		if($1.baseType === EnumTypes.STRING || $3.baseType === EnumTypes.STRING)
			throw new compilationError(ErrorTypes.STRINGLOGOP, $1.line);
		convertToNumValue($1,$3);
		trad = trad + $1.trad + "&&" + $3.trad;
		$$ = new Mark("",trad,EnumTypes.BOOL);

	};
ExprAnd : ExprComp
	{
		$$ = $1;
	};
ExprComp : ExprComp tRelop ExprSimp
	{
		var trad = "";
		
		if($1.baseType === EnumTypes.STRING || $3.baseType === EnumTypes.STRING)
			throw new compilationError(ErrorTypes.STRINGLOGOP, $1.line);
		
		convertToNumValue($1,$3);
		if($2 === "==") 
			$2 = "===";

		trad = $1.trad + $2 + $3.trad;
		$$ = new Mark("",trad,EnumTypes.BOOL);


	};
ExprComp : ExprSimp
	{
		$$ = $1;
	};
ExprSimp : ExprSimp tAddop Term
	{	
		$$ = aritmeticOp($1,$3,$2) 
	};
ExprSimp : Term
	{
		$$ = $1;
	};
Term : Term tMulop Factor
	{
		$$ = aritmeticOp($1,$3,$2);
	};
Term : Factor
	{
		$$ = $1;
	};

////////////
/// VALORES
////////////
Factor : FINDID Fp
	{
		var trad = "";
		var mark = '';
		// TODO: (1) COMPROBACION PARA ARRAYS POR SI FALTAN O SOBRAN CORCHETES, Y SI LOS INDICES SON DISTINTOS
		if(!$1.currentSymbol.hasValue)
			throw new compilationError(ErrorTypes.INITVALUE, yy.lexer.yylloc["first_line"] , $1.lex);
		if($1.currentSymbol.sType !== EnumTypes.FUNCTION && $2.type === EnumTypes.FUNCTION)
			throw new compilationError(ErrorTypes.NOTFUNCTYPEERROR, $1.line , $1.lex);
		if($1.currentSymbol.sType === EnumTypes.FUNCTION && $2.type !== EnumTypes.FUNCTION)
			throw new compilationError(ErrorTypes.FUNCTYPEERROR, $1.line , $1.lex);

		trad = $1.lex + $2.trad;
		mark = new Mark("",trad,$1.currentSymbol.sBaseType);
		mark.mArray = $1.currentSymbol.sArray;

		$$ = mark;
	};

FINDID : tId
	{
		var sym = stackScope.findAttribute($1);
		var mark = '';
		if(sym === null)
			throw new compilationError(ErrorTypes.NOTFOUND, yy.lexer.yylloc["first_line"],$1);
		mark = new Mark($1,$1,sym.sBaseType);
		mark.currentSymbol = sym;
		mark.line = yy.lexer.yylloc["first_line"];
		$$ = mark;

	};

Factor : Factorsr
	{
		$$ = $1;
	};

Factorsr : tFalse
	{
		var mark = new Mark($1,0,EnumTypes.BOOL);
		mark.line = yy.lexer.yylloc["first_line"];
		$$ = mark;
	};
Factorsr : tTrue
	{
		var mark = new Mark($1,1,EnumTypes.BOOL);
		mark.line = yy.lexer.yylloc["first_line"];
		$$ = mark;
	};
Factorsr : tInteger
	{
		var mark = new Mark($1,parseInt($1),EnumTypes.INTEGER);
		mark.line = yy.lexer.yylloc["first_line"];
		$$ = mark;
	};
Factorsr : tReal
	{
		var mark = new Mark($1,parseFloat($1),EnumTypes.FLOAT);
		mark.line = yy.lexer.yylloc["first_line"];
		$$ = mark;
	};
Factorsr : tCharacter
	{
		var mark = new Mark($1,$1,EnumTypes.CHAR);
		mark.line = yy.lexer.yylloc["first_line"]; 
		$$ = mark;
	};	
Factorsr : tString
	{	
		var mark = new Mark($1,$1,EnumTypes.STRING);
		mark.line = yy.lexer.yylloc["first_line"];
		$$ = mark;
	};
Factorsr : tLparen Expr tRparen
	{
		var trad = "(" + Expr.trad + ")";
		var mark = new Mark("",trad,Expr.type);
		mark.line = yy.lexer.yylloc["first_line"];
		$$ = mark;
	};

//////////////
/// FUNCIONES
//////////////

Fp : Refp
	{	
		$$ = $1;
	};
Fp : FunPar
	{
		$$ = $1;
	};
Ref : FINDID Refp
	{

		var trad = "";
		var mark = '';
		
		if($1.currentSymbol.sBaseType === EnumTypes.FUNCTION)
			throw new compilationError(ErrorTypes.FUNCTYPEERROR, yy.lexer.yylloc["first_line"] , $1.lex);
		if($1.currentSymbol.sArray.length != $2.mArray.length)
			throw new compilationError(ErrorTypes.ARRAYTYPE, yy.lexer.yylloc["first_line"] , $1.lex);

		trad = $1.trad + $2.trad;
		mark = copyMark($1);
		mark.line = yy.lexer.yylloc["first_line"];
		mark.trad = trad;
		$$ = mark;
	};

Refp : tLclasp ExprSimp tRclasp Refp
	{
		var mark = $4;
		mark.trad = "[" + $2.trad + "]" + $4.trad;
		mark.mArray.unshift($2.trad);
		mark.type = EnumTypes.ARRAY;
		$$ = mark;
	};
Refp : 
	{
		var mark = new Mark();
		$$ = mark;
	};	
FunPar : tLparen Par tRparen
	{
		var trad = "(" + $2.trad + ")";
		var mark = copyMark($2);
		mark.trad = trad;
		mark.type = EnumTypes.FUNCTION;
		$$ = mark;
	};
Par : 
	{
		$$ = new Mark();
	};
Par : Expr CPar
	{
		var trad = $1.trad + $2.trad;
		var mark = copyMark($2);
		mark.args.unshift($1.baseType);
		mark.trad = trad;
	};
CPar :
	{
		$$ = new Mark();
	};
CPar : tcoma Expr CPar
	{	
		var trad = "," + $2.trad + $3.trad;
		var mark = copyMark($3);
		mark.args.unshift($2.baseType);
		mark.trad = trad;
		$$ = trad;

	};


%%

function compilationError(type, nline , lex)
{
	console.log("Error de compilacion en la linea (" + nline + "):");
	console.log("---------------------------------------");
	switch (type)
	{
		case ErrorTypes.STRINGOP:
			console.log("Operacion con String (cadena de caracteres) no permitida");
		break;
		
		case ErrorTypes.STRINGNUMBER:
			console.log("Tipos incorrectos");
		break;
		
		case ErrorTypes.NOTFOUND:
			console.log("---- Variable " + lex + " no encontrada ----");
		break;
		case ErrorTypes.INITVALUE:
			console.log("---- Variable " + lex + " no esta inicializada ----");
		break;
		default:
			console.log("Error no controlado");
	}
	console.log("---------------------------------------");
}


// TODO: (1) escribir funcion que comunica con buffer para enviarle la info
function msgCout(msg)
{

}

// TODO: (1) escribir funcion para leer del buffer y devolver al usuario 
function msgCin (msg) {

}
/**
 * Funcion para comprobar si dos simbolos son arrays y si sus dimensiones y tamaños coinciden
 * @param  {Symbol} symL simbolo a la izquierda de la asignacion
 * @param  {Sumbol} symR simbolo a la derecha de la asignacíon
 * @param  {Number} line linea donde se producira el error
 * @return {Error}  Lanza error
 */
function checkArrayType(symL, symR,line)
{
	if(symL.sArray.length != symR.sArray.length)
		throw new compilationError(ErrorTypes.ARRYLENGTH, line , symL.lex); // no coindicen dimensiones
	for(var i = 0; i < symL.sArray.length; ++i)
	{
		if(symL.sArray[i] !== symR.sArray[i])
			throw new compilationError(ErrorTypes.ARRAYNOTMATCHUP, line , symL.lex); // no coindicen longitudes
	}
}
/**
 * Funcion que pasa el valor recibido a un numero
 * @param  {Mark} markL marca a la izquierda de la operacion
 * @param  {Mark} markR marca a la derecha de la operacion
 */
function convertToNumValue (markL,markR) 
{
	if(markL.baseType === EnumTypes.CHAR)
		markL.trad = markL.trad + ".charCodeAt(0)";
	if(markR.baseType === EnumTypes.CHAR)
		markR.trad = markR.trad + ".charCodeAt(0)";


}

function aritmeticOp (markL,markR,op) {
	var myType = EnumTypes.INTEGER;
	var trad = "";
	if(markL.baseType === EnumTypes.STRING || markR.baseType === EnumTypes.STRING)
		throw new compilationError(ErrorTypes.STRINGOP, markL.line);

	convertToNumValue(markL,markR);

	if(markR.trad === 0 && (op === "/" || op === "%"))
	{	
		throw new compilationError(ErrorTypes.DIVISIONBYZERO, markR.line , markR.lex);
	}

	if(markL.baseType === EnumTypes.FLOAT || markR.baseType === EnumTypes.FLOAT)
		myType = EnumTypes.FLOAT;

	trad = 	markL.trad + op + markR.trad;

	return new Mark("",trad,myType); 
}

/**
 * Funcion para convertir el numero en float
 * @param  {number} convierte de float a entero
 * @return {number} devuelve el numero en float;
 */
function float2Int(value)
{
	return value + "| 0";
}
 
/**
 * Funcion que pasa un valor numerico a char
 * @param  {number} value valor numerico del caracter
 * @return {string} devuelve el caracter del valor numerico de la tabla ASCII
 */
function toChar (value) {
 	 return "String.fromCharCode(" + value + ")";
 }

/**
 * Funcion que pasas de un char a un numero
 * @param  {String} value cadena que queremos convertir a numero
 * @return {String}  devuelve la cadena asociada para la obtencion del numero que posteriormente será evaluada
 */
function toNum (value)
{
	return value + ".charCodeAt(0)";
}

/**
 * Funcion para controlar la asignacion de una expresion a una variable de tipo numerica
 * @param  {Symbol} sym  Simbolo al que queremos hacer la asignacion
 * @param  {Mark} expr Expresion que recibimos para la asignacion
 * @return {String}     cadena creada para la asignacion del simbolo
 */
function numAssignation (sym,expr) {

	if(expr.baseType === EnumTypes.FLOAT)
	{
		if(sym.sBaseType === EnumTypes.INTEGER)
			return float2Int(expr.trad);
		return expr.trad;
	}
	else if (expr.baseType === EnumTypes.INTEGER || expr.baseType === EnumTypes.BOOL)
		return expr.trad;
	else if(expr.baseType === EnumTypes.CHAR)
		return toNum(expr.trad);
	else 
		throw new compilationError(ErrorTypes.STRINGTONUMBER, sym.line , sym.name); // Asignacion de cadena a numero no valida
}

/**
 * Funcion para controlar la asignacion de una expresiona una variable de tipo character
 * @param  {Symbol} sym  Simbolo al que queremos asignar los datos
 * @param  {Mark} expr Expresion que contiene las operaciones para el caracter
 * @return {String}     cadena creada para la asignacion del simbolo
 */
function charAssignation (sym,expr) {
 	
 	if(expr.baseType === EnumTypes.CHAR)
 		return expr.trad;
 	else if(expr.baseType === EnumTypes.INTEGER || expr.baseType === EnumTypes.FLOAT || expr.baseType === EnumTypes.BOOL)
 		return toChar(expr.trad);
 	else 
 		throw new compilationError(ErrorTypes.STRINGTOCHAR, sym.lin , sym.name); // Asingancion de cadena a caracter no valida
}


/**
 * Funcion para controlar la asignacion de una expresion a una variable de tipo booleana
 * @param  {Symbol} sym  Simbolo al que queremos asignar los datos
 * @param  {Mark} expr Expresion que contiene las operaciones para el booleano
 * @return {String}     Cadena creada para la asignacion del simbolo
 */
function boolAssignation (sym,expr) {
 	
 	var value = "Boolean(";
 	if(expr.baseType === EnumTypes.STRING)
 		throw new compilationError(ErrorTypes.STRINGTOBOOL, sym.lin , sym.name); // Asignacion de cadena a booleano no valida
 	
 	value = value + expr.trad + ")";
	
	return value;

}