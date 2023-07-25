# js-prototype-insurance-quote
Just a insurance quote simulator built using JS prototypes

Check the project here: https://prototypes-insurance-quote.netlify.app/

## Description
This is a JavaScript project that provides a simple insurance quote calculator. Users can input their vehicle information, such as the car's brand, manufacturing year, and desired coverage type (basic or complete). Based on this data, the calculator will generate a quote for the insurance cost.

## How it Works

### Constructors
The project includes two constructors:

Seguro(marca, year, tipo): This constructor creates an instance of the insurance quote. It takes three parameters: marca (car brand), year (manufacturing year of the car), and tipo (coverage type - basic or complete).
Calculating the Quote
The Seguro constructor has a prototype method cotizarSeguro() to calculate the insurance quote based on the provided information. The process involves the following steps:

- Assign a base cost of €2000.
- Adjust the cost based on the car's brand:
- American cars increase the cost by 15%.
- Asian cars increase the cost by 5%.
- European cars increase the cost by 35%.
- Calculate the difference between the current year and the car's manufacturing year. For each year passed, the cost is reduced by 3%.
- Adjust the cost based on the coverage type:
- If it's basic insurance, the cost is increased by 30%.
- If it's complete insurance, the cost is increased by 50%.
- Return the final calculated cost.

### User Interface
The project also includes a UI constructor that handles the user interface functionalities. It provides the following methods:

#### llenarOpciones(): Fills the select box for the car's manufacturing year with options ranging from the current year to 20 years ago.

#### mostrarMensaje(mensaje, tipo): Displays a message on the screen. The tipo parameter determines the style of the message (error or success). Messages are automatically removed after 3 seconds.

#### mostrarResultado(total, seguro): Shows the insurance quote result on the screen. It displays the car's brand, manufacturing year, coverage type, and the total insurance cost.

#### Event Listeners
The project sets up an event listener for the form submission. When the user submits the form with the required information, the cotizarSeguro function is triggered. This function:

- Retrieves the selected car brand, manufacturing year, and coverage type from the form.
- Validates that all fields are filled out; otherwise, it displays an error message.
- Displays a "Cotizando..." (Quoting...) success message while calculating the quote.
- Clears any previous quote results from the screen.
- Creates an instance of the Seguro constructor with the provided information.
- Calculates the insurance quote using the cotizarSeguro() method of the Seguro instance.
- Displays the insurance quote result on the screen using the mostrarResultado() method of the UI instance.
