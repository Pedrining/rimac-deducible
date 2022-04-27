module.exports = function (tipo, mensaje, data, indMostrarMensaje) {
  return {
    tipo: tipo,
    mensaje: mensaje,
    data: data,
    indMostrarMensaje: typeof indMostrarMensaje === "undefined"?'1':'0',
  };
};