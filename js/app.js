//Constructors

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Create the quote with the data selected
Seguro.prototype.cotizarSeguro = function () {
    /*
        1 = Americano 1.15
        2 = Asiático 1.05
        3 = Europeo 1.35
    */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //Read the year
    const diferencia = new Date().getFullYear() - this.year;

    //For each year passed, the cost is 3% less
    cantidad -= (diferencia * 0.03) * cantidad;

    /*
    If it's basic insurance, will add 30% to the final price
    If it's complete insurance, will add 50% to the final price
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.3;
    } else {
        cantidad *= 1.5;
    }

    return cantidad;
}

function UI() { }


//Fill the years options
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Show alerts on screen
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insert message on HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 3000)
}

UI.prototype.mostrarResultado = (total, seguro) => {

    const { marca, year, tipo } = seguro;

    let textoMarca;

    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiático';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    //Create the result
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">€ ${total}</span></p>
    `

    const resultadoDiv = document.querySelector('#resultado');


    //Show a loading spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        //After the spinner is deleted, show the result of the quote
        resultadoDiv.appendChild(div);
    }, 3000);

}

//instantiate UI
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //Fill select with years
})

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    //check selected brand
    const marca = document.querySelector('#marca').value;

    //check selected year
    const year = document.querySelector('#year').value;

    //check selected coverage
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');

    //Hide the previous quotes
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }

    //Instantiate the insurance
    const seguro = new Seguro(marca, year, tipo);

    //Call the prototype that will quote
    const total = seguro.cotizarSeguro();

    //Call the prototype that will show the price on screen
    ui.mostrarResultado(total, seguro);
}