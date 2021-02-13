export const campoRequerido = (value) => {
    
    if (!value.toString().trim().length ) {
        return "El campo es obligatorio"
    }
    return null;
};

export const esEmail = (value) => {
    if (!value.match(/(.+)@(.+){2,}\.(.+){2,}/) ){
        return "No es un email valido";
    }
    return null;
};


export const esTelefono = (value) => {
    if (!value.match(/^[0-9]{10}$/) ){
        return "No es un telefono valido";
    }
    return null;
}

export const esTexto = (value) => {
    if (!value.match(/^[A-Za-z0-9\s]+$/g)){
        return "Caracteres no validos";
    }
    return null;
}