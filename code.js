function doGet(e) {
    const action = e.parameter.action;
    if (action === 'agregarRegistro') {
      const nombre = e.parameter.nombre;
      const apellido = e.parameter.apellido;
      const email = e.parameter.email;
      const telefono = e.parameter.telefono;
      return agregarRegistro(nombre, apellido, email, telefono);
    } else if (action === 'obtenerRegistros') {
      return obtenerRegistros();
    } else {
      return ContentService.createTextOutput('Acción no válida');
    }
  }
  function agregarRegistro(nombre, apellido, email, telefono) {
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    hoja.appendRow([nombre, apellido, email, telefono]);
    return ContentService.createTextOutput("Registro agregado");
  }
  function obtenerRegistros() {
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const datos = hoja.getDataRange().getValues();
    return ContentService.createTextOutput(JSON.stringify(datos)).setMimeType(ContentService.MimeType.JSON);
  }