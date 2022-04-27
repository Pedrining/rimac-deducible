'use strict';

var deducibleDAO = require('./dao/DeduciblesDAO.js');
const parametro = require('./bean/Parametros.js');
var funciones = require('./util/Funciones.js');
const constantes = require('./util/Constantes.js');
const respuesta = require('./bean/Respuesta.js');


module.exports.deducible = function(event, context, callback) {

  funciones.copiar(parametro, event);
  context.callbackWaitsForEmptyEventLoop = false;

  var obtenerDeducible = function (err, response) {
      var retorna = {};
       if (err) {
        retorna = respuesta (constantes.TIPO_MENSAJE.ERROR, constantes.MENSAJE.ERROR_GENERAL);
      } else {
        retorna = respuesta (constantes.TIPO_MENSAJE.SUCCESS, constantes.TIPO_MENSAJE.SUCCESS, response);
      }
      callback(null, retorna);
      context.succeed();
  };
  
  try {

    if(event.operacion === "obtenerDeducible"){
      deducibleDAO.obtenerDeducible(constantes.PAYLOAD,parametro,obtenerDeducible);
    }
    
  } catch (err) {
    let retorna = respuesta(constantes.TIPO_MENSAJE.ERROR,
      constantes.MENSAJE.ERROR_GENERAL,
      err);
    callback(null, retorna);
    context.succeed();
  }
};
