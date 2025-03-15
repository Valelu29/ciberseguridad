var vigenere = vigenere || (function() {

    var proceso = function(txt, clave, action) {
        var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var longitud = abc.length;

        return String(txt).replace(/([a-z])/ig, function(match, index) {
            var i = abc.indexOf(match.toLowerCase());
            if (i !== -1) {
                var pos = i;
                if (action) {
                    pos += obindiceClave(clave.charAt(index % clave.length));
                    pos = (pos >= longitud) ? pos - longitud : pos;
                } else {
                    pos -= obindiceClave(clave.charAt(index % clave.length));
                    pos = (pos < 0) ? pos + longitud : pos;
                }
                return abc[pos];
            }
            return match;
        });
    };

    return {
        encode: function(txt, clave) {
            return proceso(txt, clave, true);
        },
        decode: function(txt, clave) {
            return proceso(txt, clave, false);
        }
    };

})();

// Función para obtener el índice de la clave en el alfabeto
function obindiceClave(reco) {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return abc.indexOf(reco.toLowerCase());
}

// Validación de texto y clave
function validarCampos() {
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;

    if (texto === "") {
        alert("Por favor, ingresa el texto a cifrar o descifrar.");
        return false;
    }
    if (clave === "") {
        alert("Por favor, ingresa una clave secreta.");
        return false;
    }
    if (clave.length > texto.length) {
        alert("La clave no puede ser más larga que el texto.");
        return false;
    }
    return true;
}

// Función para cifrar el texto
function cifrar() {
    if (!validarCampos()) return;
    
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;

    var resultado = vigenere.encode(texto, clave);
    document.getElementById("respuesta").value = resultado;
}

// Función para descifrar el texto
function descifrar() {
    if (!validarCampos()) return;
    
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;

    var resultado = vigenere.decode(texto, clave);
    document.getElementById("respuesta").value = resultado;
}

// Función para reiniciar los campos
function reiniciarCampos() {
    document.getElementById("txt").value = "";
    document.getElementById("txtclave").value = "";
    document.getElementById("respuesta").value = "";
}

// Función para copiar el resultado
function copiarResultado() {
    var resultado = document.getElementById("respuesta");
    resultado.select();
    document.execCommand("copy");
    alert("Texto copiado al portapapeles.");
}


var vigenere = vigenere || (function() {
    var proceso = function(txt, clave, action) {
        var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var longitud = abc.length;

        return String(txt).replace(/([a-z])/ig, function(match, index) {
            var i = abc.indexOf(match.toLowerCase());
            if (i !== -1) {
                var pos = i;
                if (action) {
                    pos += obindiceClave(clave.charAt(index % clave.length));
                    pos = (pos >= longitud) ? pos - longitud : pos;
                } else {
                    pos -= obindiceClave(clave.charAt(index % clave.length));
                    pos = (pos < 0) ? pos + longitud : pos;
                }
                return abc[pos];
            }
            return match;
        });
    };

    return {
        encode: function(txt, clave) {
            return proceso(txt, clave, true);
        },
        decode: function(txt, clave) {
            return proceso(txt, clave, false);
        }
    };

})();

// Función para obtener el índice de la clave en el alfabeto
function obindiceClave(reco) {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return abc.indexOf(reco.toLowerCase());
}

// Validación de texto y clave
function validarCampos() {
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;

    if (texto === "") {
        alert("Por favor, ingresa el texto a cifrar o descifrar.");
        return false;
    }
    if (clave === "") {
        alert("Por favor, ingresa una clave secreta.");
        return false;
    }
    if (clave.length > texto.length) {
        alert("La clave no puede ser más larga que el texto.");
        return false;
    }
    return true;
}

// Función para cifrar el texto
function cifrar() {
    if (!validarCampos()) return;
    
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;

    var resultado = vigenere.encode(texto, clave);
    document.getElementById("respuesta").value = resultado;
}

// Función para descifrar el texto
function descifrar() {
    if (!validarCampos()) return;
    
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;

    var resultado = vigenere.decode(texto, clave);
    document.getElementById("respuesta").value = resultado;
}

// Función para reiniciar los campos
function reiniciarCampos() {
    document.getElementById("txt").value = "";
    document.getElementById("txtclave").value = "";
    document.getElementById("respuesta").value = "";
}

// Función para copiar el resultado
function copiarResultado() {
    var resultado = document.getElementById("respuesta");
    resultado.select();
    document.execCommand("copy");
    alert("Texto copiado al portapapeles.");
}

