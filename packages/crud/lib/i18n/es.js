export const translations = {
  http_unhandled_success: "Respuesta de éxito no procesada",
  http_404: "Recurso inexistente",
  http_401: "No autorizado",
  http_405: "Método HTTP no permitido",
  http_413: "Contenido enviado al servidor demasiado largo",
  http_419: "La sesión ha expirado. Refresca la página.",
  http_502: "Error de conexión, gateway no válido",
  http_504: "Error de timeout con el gateway",
  http_other_error: "Acción no completada por un error del servidor",
  http_no_response: "No se ha recibido respuesta del servidor",
  ajax_form_not_supported: "Operación no soportada por dile-ajax-form. Elige entre 'insert' o 'update'",
  success_operation: (operation) => `${operation == 'insert' ? 'Inserción' : 'Actualización'} completada con éxito`,
  error_operation: (operation) => `Se ha producido un error en la ${operation == 'insert' ? 'inserción' : 'actualización'}`,
  send_label: "Enviar",
  insert_label: "Insertar",
  update_label: "Actualizar",
  start_update_label: "Editar",
  delete_label: "Borrar",
  cancel_label: "Cancelar",
  accept_label: "Aceptar",
  help_label: "Ayuda",
  filters_label: "Filtros",
  sort_label: "Orden",
  page_label: "Página",
  actions_label: "Acciones",
  element_label: "Elemento",
  element_plural_label: "Elementos",
  run_action_label: "Realizar acción",
  loading: "Cargando...",
  delete_confirm_message: "¿Estás seguro que quieres borrar este ítem?",
  delete_confirm_message_plural: "¿Seguro que quieres borrar estos elementos?",
  items_total: "Elementos en total",
  showing_page_size: (pageSize) => `Mostrando ${pageSize} elementos por página.`,
  empty_list: "No tenemos elementos todavía",
  one_page: "Página 1 de 1",
  current_page: (page, numPages) => `Página ${page} de ${numPages}`,
  select: "Seleccionar",
  all: "todos",
  all_in_page: "Todos de esta página",
  select_matching: "Seleccionar coincidentes",
  element_actions: "Acciones en este ítem",
};