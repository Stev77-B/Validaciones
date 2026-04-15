// =====================
// FUNCIONES DE CÁLCULO
// =====================

// Disponible
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    return disponible < 0 ? 0 : disponible;
}

// Capacidad de pago (50%)
function calcularCapacidadPago(disponible) {
    return disponible * 0.5;
}

// Interés simple
function calcularInteresSimple(monto, tasa, plazo) {
    return monto * (tasa / 100) * plazo;
}

// Total a pagar
function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

// Cuota mensual
function calcularCuotaMensual(total, plazo) {
    return total / (plazo * 12);
}

// Aprobación
function aprobarCredito(capacidad, cuota) {
    return capacidad > cuota;
}

// =====================
// FUNCIONES VISUALES
// =====================

// Formato dinero
function formatear(valor) {
    return "$ " + valor.toFixed(2);
}

// Limpiar errores
function limpiarErrores() {
    document.querySelectorAll(".error").forEach(e => e.innerText = "");
}

// Mostrar error
function mostrarError(id, mensaje) {
    document.getElementById(id).innerText = mensaje;
}

// =====================
// VALIDACIONES
// =====================
function validar() {
    limpiarErrores();
    let valido = true;

    let ingresos = txtIngresos.value.trim();
    let egresos = txtEgresos.value.trim();
    let monto = txtMonto.value.trim();
    let plazo = txtPlazo.value.trim();
    let tasa = txtTasa.value.trim();

    if (ingresos === "" || isNaN(ingresos) || ingresos <= 0) {
        mostrarError("errIngresos", "Ingrese ingresos válidos");
        valido = false;
    }

    if (egresos === "" || isNaN(egresos) || egresos < 0) {
        mostrarError("errEgresos", "Egresos inválidos");
        valido = false;
    }

    if (monto === "" || isNaN(monto) || monto < 100 || monto > 50000) {
        mostrarError("errMonto", "Monto entre 100 y 50000");
        valido = false;
    }

    if (plazo === "" || isNaN(plazo) || plazo < 1 || plazo > 30) {
        mostrarError("errPlazo", "Plazo entre 1 y 30 años");
        valido = false;
    }

    if (tasa === "" || isNaN(tasa) || tasa <= 0 || tasa > 100) {
        mostrarError("errTasa", "Tasa inválida");
        valido = false;
    }

    return valido;
}

// =====================
// FUNCIÓN PRINCIPAL
// =====================
function calcular() {

    if (!validar()) return;

    let ingresos = parseFloat(txtIngresos.value);
    let egresos = parseFloat(txtEgresos.value);
    let monto = parseFloat(txtMonto.value);
    let plazo = parseInt(txtPlazo.value);
    let tasa = parseFloat(txtTasa.value);

    // Cálculos
    let disponible = calcularDisponible(ingresos, egresos);
    let capacidad = calcularCapacidadPago(disponible);
    let interes = calcularInteresSimple(monto, tasa, plazo);
    let total = calcularTotalPagar(monto, interes);
    let cuota = calcularCuotaMensual(total, plazo);

    // Mostrar resultados
    lblDisponibleValor.innerText = formatear(disponible);
    lblCapacidadValor.innerText = formatear(capacidad);
    lblInteresValor.innerText = formatear(interes);
    lblTotalValor.innerText = formatear(total);
    lblCuotaValor.innerText = formatear(cuota);

    // Resultado final
    let aprobado = aprobarCredito(capacidad, cuota);

    if (aprobado) {
        lblResultado.innerText = "✅ CRÉDITO APROBADO";
        lblResultado.style.color = "green";
    } else {
        lblResultado.innerText = "❌ CRÉDITO RECHAZADO";
        lblResultado.style.color = "red";
    }
}