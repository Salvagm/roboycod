%token tId
%token tRelop tOr tAnd
%token tAssign 
%token tAddop tMulop
%token tNot
%token tLbrace tRbrace tLparen tRparen tRclasp tLclasp
%token tSemicolon tComa
%token tInt tChar tFloat tBool
%token tEOF


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


%%

S : FVM tEOF
	{
		
		// { typeof console !== 'undefined' ? console.log($1) : print($1);
  //         return $1; }
  console.log($1.trad);
	};

FVM : Tipo tId FVMp
	{
		trad = $1.trad + " " + $2 +  $3.trad;
		$$ = new Mark("",trad,"");
	};
	
FVM : 
	{
		$$ = new Mark();
	};

FVMp : VarArr LIdentp tSemicolon FVM 
	{
		trad = $1.trad + $2.trad + ";" + " " + $4.trad;
		$$ = new Mark("",trad,"");
	};

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


DecVar : Tipo LIdent tSemicolon 
		{
			
		};
LIdent : Variable LIdentp 
		{
			
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
			var trad = "[" + $2 + "]";
			var mark = new Mark($2,trad);
			$$ = mark;
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
