// EN LOS CDVs poner que tipo de acciones y consultas pueden realizar

/** EVENTOS DE JUEGO **/

// ALGUNO con CIN + COUT
// Recoger PickUps (la carga pude distribuirse)
// Controlar cantidad dada como maxima, para evitar vida+9999

	void main(){
		int cantidad;
		cout << "pickup?" << endl;
		cin >> cantidad;
		cout << "vida+" << cantidad << endl;
	}

// Deslizar por al pared

// Trepar

/** EVENTOS DE TECLADO **/

// Blaster Basico

	void main(){
		cout<< "disparar" << endl;
	}

// RoboBotas Basicas
	
	void main(){
		cout<< "saltar" << endl;
	}

// RoboBotas avanzadas

	int main()
	{   
	    bool enTierra;
	    cout << "enTierra?"<<endl;
	    cin >> enTierra;
	    if(enTierra == true){
		    cout << "saltar" << endl;
	    }
	    else{
	        cout << "aeroSaltar"<<endl;
	    }
	}

// DRON Ataque derecha 
//(se enconlan las acciones, cada vez que se pulsa, se vacia la pila y se encolan )

	void patrullar(){
		cout << "moverDerecha" << endl;
		cout << "bombardear" << endl;
	}
	void main(){
		int i;
		for(i = 0; i < 5; ++i){
			patrullar();
		}
	}

//TABLA ACCIONES 

	//MOVILIDAD

	"saltar"
	"saltarEnAire"

	//ARMAS

	"disparar"

	//CORE

	"defender"
	"empujar"

	"vida+"
	"arma+"
	"core+"
	"movil+"
	"addon+"

	//ADDONS

	// dear mover paramatrizado, mover y luego lo que sea
	"moverDerecha"
	"moverDerecha"
	"bombardear"

//TABLA CONSULTAS

	//MOVILIDAD

	"enAire?"

	//ARMAS

	//CORE

	"pickup?"

	//ADDONS


