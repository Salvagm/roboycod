%token tId
%token tRelop tOr tAnd
%token tAssign 
%token tAddop tMulop
%token tNot
%token tLbrace tRbrace tLparen tRparen tRclasp tLclasp
%token tSemicolon tComa
%token tInt tChar tFloat tBool
%token tEOF
%token tReturn
%token tTrue tFalse
%token tInteger tFloat
%token tLdesp tRdesp
%token tEndl tCin tCout
%token tIf tElse
%{


// parser.yy.parseError = function (str, hash)
// {
// 	console.log(token);
// }

function Mark (lex,trad,simbolType )
{
	this.symbolType = simbolType || '';
	this.trad = trad || "";
	this.lex = lex || "";
	this.arrayLength = 0;

}
typeEnum = {
	INTEGER : 1,
	FLOAT : 2,
	CHAR : 3,
	BOOL : 4,
	VOID : 5
};

errorTypes =
{
	TYPEMISMATCH : 1,
	MISOPERATION : 2

}
	
%}


///////////////////////////
/// INICIO DE LA GRAMATICA
///////////////////////////
%%

S : FVM tEOF
	{
		
		// { typeof console !== 'undefined' ? console.log($1) : print($1);
  //         return $1; }
  console.log($1.trad);
  
  eval($1.trad);
  
	};

//////////////////////////////////////////
/// DECLARACION VARIABLES GLOBALES Y FUNC
//////////////////////////////////////////

FVM : Tipo tId FVMp
	{
		trad = $1.trad + " " + $2 +  $3.trad;
		$$ = new Mark("",trad,"");
	};
FVM : tVoid tId tLparen Arg tRparen Bloque
	{

	};

FVMp : VarArr LIdentp tSemicolon FVM 
	{
		trad = $1.trad + $2.trad + ";" + " " + $4.trad;
		$$ = new Mark("",trad,"");
	};
FVMp : tLparen Arg tRparen Bloque
	{

	};

///////////////
/// ARGUMENTOS
///////////////

Arg :
	{

	};
Arg : CArg
	{

	};
CArg : Tipo id CArgp
	{

	};
CArgp : coma Tipo id CArgp
	{

	};
CArgp :
	{


	};

////////////////////////////
/// BLOQUES DE CODIGO 
////////////////////////////

Bloque : tLbrace BDecl SeqInstr tRbrace
	{

	};
BDecl : BDeclp
	{

	};

BDeclp : DecVar BDeclp
	{

	};
BDeclp : 
	{

	};

//////////////////////////////
/// TIPOS FUNCIONES VARIABLES
//////////////////////////////

Tipo : tInt 
	{ 	
		var mark = new Mark($1,"var",typeEnum.INTEGER);
		$$ = mark; // devuelve el objeto con el tipo y el nombre
	};
Tipo : tChar 
	{
		var mark = new Mark($1,"var",typeEnum.CHAR);
		$$ = mark; // devuelve el objeto con el tipo y el nombre
	} ;
Tipo : tFloat 
	{
		var mark = new Mark($1,"var",typeEnum.FLOAT);
		$$ = mark; // devuelve el objeto con el tipo y el nombre
	};
Tipo : tBool 
	{ 
		var mark = new Mark($1,"var",typeEnum.BOOL);
		$$ = mark; // devuelve el objeto con el tipo y el nombre
	};

TipoFunc : Tipo
	{

	};
TipoFunc : void
	{

	};

/////////////////////////////
/// DECLARACION DE VARIABLES
/////////////////////////////

DecVar : Tipo LIdent tSemicolon 
	{
		trad = $1.trad + $2.trad + ";";
		$$ = new Mark("",trad,"");
	};
LIdent : Variable LIdentp 
	{

		trad = $1.trad + $2.trad;
		$$ = new Mark("",trad,"");
	};
LIdentp : tComa Variable LIdentp 
	{
		trad = $1 + $2.trad + $3.trad;
		$$ = new Mark("",trad,"");
	};
LIdentp : {

			$$ = new Mark();
		};
Variable : tId VarArr 
	{
		trad = $1 + $2.trad;
		$$ = new Mark("",trad,"");
	};
VarArr : {
			$$ = new Mark();
		};
VarArr : tRclasp tInteger tLclasp 
	{
		var trad = "=["; 
		var numArray = parseInt($2);
		for(var i = 0 ; i < numArray-1 ; ++i)
		{
			trad = trad + "0,"; 
		}
		
		trad = trad + "0]"; 
		
		var mark = new Mark($2,trad);
		mark.arrayLength = numArray;
		$$ = mark;
	};



//////////////////
/// INSTRUCCIONES
//////////////////
SeqInstr : SeqInstrp
	{

	};
SeqInstrp : Instr SeqInstrp
	{

	};
SeqInstrp : 
	{

	};
Instr : tSemicolon
	{

	};
Instr : Bloque
	{

	};
Instr : tReturn Expr tSemicolon
	{

	};
Instr : tId InstrId
	{

	};
InstrId : Refp tAssign Expr tSemicolon
	{

	};
InstrId : FunPar tSemicolon
	{

	};
Instr : tCin tRdesp tId tSemicolon
	{

	};
Instr : tCout tLdesp Expr Instrout
	{

	};
Instrout : tLdesp Instroutp
	{

	};
Instroutp : Expr Instrout
	{

	};
Instrout : tEndl tSemicolon
	{

	};
Instrout : tSemicolon
	{

	};
Instr : tIf tLparen Expr tRparen Instr Instrp
	{

	};
Instrp : tElse Instr
	{

	};
Instrp :
	{

	};

////////////////
/// EXPRESIONES
////////////////
Expr : ExprOr
	{

	};
ExprOr : ExprOr or ExprAnd
	{

	};
ExprOr : ExprAnd
	{

	};
ExprAnd : ExprAnd and ExprComp
	{

	};
ExprAnd : ExprComp
	{

	};
ExprComp : ExprComp relop ExprSimp
	{

	};
ExprComp : ExprSimp
	{

	};
ExprSimp : ExprSimp addop Term
	{

	};
ExprSimp : Term
	{

	};
Term : Term mulop Factor
	{

	};
Term : Factor
	{

	};

////////////
/// VALORES
////////////
Factor : tId Fp
	{

	};

Factor : Factorsr
	{

	};

Factorsr : tFalse
	{
		$$ = new Mark($1,$1,typeEnum.BOOL);
	};
Factorsr : tTrue
	{
		$$ = new Mark($1,$1,typeEnum.BOOL);
	};
Factorsr : tInteger
	{

	};
Factorsr : tFloat
	{

	};
// Factorsr : tString
// 		{

// 		};
Factorsr : tLparen Expr tRparen
	{

	};

//////////////
/// FUNCIONES
//////////////

Fp : Refp
	{

	};
Fp : FunPar
	{

	};
Ref : tId Refp
	{

	};
Refp : tLclasp ExprSimp tRclasp Refp
	{

	};
Refp : 
	{
		
	};
FunPar : tLparen Par tRparen
	{

	};
Par : 
	{

	};
Par : Expr CPar
	{

	};
CPar :
	{

	};
CPar : tcoma Expr CPar
	{

	};


%%

function SintacError(type)
{
	console.log("Error Sintactico");
	console.log("--------------------");
	if(type === errorTypes.TYPEMISMATCH)
	{
		console.log("Fallo extraño");
	}
	console.log("--------------------");
}
