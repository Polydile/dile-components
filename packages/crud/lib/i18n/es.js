export const translations = {
  http_unhandled_success: "Respuesta de éxito no procesada",
  http_404: "Recurso inexistente",
  http_401: "No autorizado",
  http_405: "Método HTTP no permitido",
  http_419: "La sesión ha expirado. Refresca la página.",
  http_502: "Error de conexión, gateway no válido",
  http_504: "Error de timeout con el gateway",
  http_other_error: "Acción no completada por un error del servidor",
  http_no_response: "No se ha recibido respuesta del servidor",
  ajax_form_not_supported: "Operación no soportada por dile-ajax-form. Elige entre 'insert' o 'update'",
  success_operation: (operation) => `${operation == 'insert' ? 'Inserción' : 'Actualización'} completada con éxito`,
  error_operation: (operation) => `Se ha producido un error en la ${operation == 'insert' ? 'inserción' : 'actualización'}`,
};