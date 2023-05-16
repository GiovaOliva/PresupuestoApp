let presupuesto;
//Funcion para capturar el presupuesto
function ingresoPresupuesto() {
    presupuesto = parseInt(document.getElementById("presupuesto").value);
    //Validamos que sea distinto de nulo o menor que 0
    if (presupuesto == null || presupuesto <= 0) {
        alert('Ingrese un Presupuesto valido. \n 1.-El presupuesto debe ser ingresado. \n 2.-El presupuesto debe ser mayor a 0.')
    } else {
        //Lo ingresamos en nuestra aplicacion.
        document.getElementById('totalPresupuesto').innerText = presupuesto
    }
}
//Creamos el objeto gasto
function Gasto(nombre, monto, id) {
    this.nombre = nombre;
    this.monto = monto;
    this.id = id;
}

//Array de gastos
let Gastos = [];
//contador para id de los gastos ingresados
let idGasto = 0

//Funcion para capturar los gatos
function ingresoGasto() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let montoGasto = parseInt(document.getElementById("cantidadGasto").value);
    //Validamos que se ingrese un nombre y un monto valido
    if (nombreGasto == "" || montoGasto == NaN || montoGasto <= 0) {
        alert("Ingrese un Gasto valido. \n 1.- Todo gasto debe tener un nombre. \n 2.- A todo gasto se le debe asignar una cantidad mayor a 0");
    } else {
        //Pasada la validacion creamos un objeto Gasto y lo agregamos al array Gastos
        //Luego vaciamos los campos.
        idGasto += 1
        let gasto = new Gasto(nombreGasto, montoGasto, idGasto);
        Gastos.push(gasto);
        document.getElementById("cantidadGasto").value = ""
        document.getElementById("nombreGasto").value = ""
        ingresoSaldo(Gastos)
        tablaGastos(Gastos)
    }
}

//Creamos la funcion para manejar el saldo
function actualizarSaldo(presupuesto, gastos) {

    let saldo = presupuesto
    let saldoActualizado = saldo - gastos
    document.getElementById("saldo").innerText = saldoActualizado

}

//Creamos una funcion para calcular los gatos e ingresar el saldo
function ingresoSaldo(gastos) {
    let monto = 0
    for (let i = 0; i < gastos.length; i++) {
        monto += parseInt(gastos[i].monto)
    }
    document.getElementById("totalGastos").innerText = monto
    actualizarSaldo(presupuesto, monto)
}

//Creamos funcion para cargar la tabla de Gastos
function tablaGastos(gastos) {
    try {
        let filas = ""
        gastos.forEach((gasto) => {
            filas += `<tr>
                        <td>${gasto.nombre}</td>
                        <td>${gasto.monto}</td>
                        <td>
                            <button class="btn borrarGasto bi bi-trash btn-outline-primary border-0" data-id="${gasto.id}">
                            </button>
                        </td>
                    </tr>`

        });
        document.getElementById("tablaGastos").innerHTML = filas;
    } catch (e) {
        console.log(e)
        alert("Erros al cargar la tabla.")
    }
}
//Creamos funcionionalidad que permite borrar los gatos.
$("#tablaGastos").on("click", ".borrarGasto",
    function (evento) {
        let basurero = evento.target;
        let idGasto = basurero.dataset.id
        let gasto = Gastos.find((gastoActual, index) => {
            if (gastoActual.id == idGasto) {
                gastoActual.indice = index
                return gastoActual
            }
        })
        if (gasto) {
            Gastos.splice(gasto.indice, 1)
            ingresoSaldo(Gastos)
            tablaGastos(Gastos)

        }


    })