const express = require('express');
   const bodyParser = require('body-parser');
   const xlsx = require('xlsx');
   const path = require('path');
   const app = express();
   const PORT = process.env.PORT || 3000;
   app.use(bodyParser.json());
   app.use(express.static('public'));
   // Ruta para obtener contribuyentes
   app.get('/contribuyentes', (req, res) => {
       const workbook = xlsx.readFile('data/contribuyentes.xlsx');
       const sheetName = workbook.SheetNames[0];
       const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
       res.json(data);
   });
   // Ruta para agregar un contribuyente
   app.post('/contribuyentes', (req, res) => {
       const newContribuyente = req.body;
       const workbook = xlsx.readFile('data/contribuyentes.xlsx');
       const sheetName = workbook.SheetNames[0];
       const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
       data.push(newContribuyente);
       const newSheet = xlsx.utils.json_to_sheet(data);
       workbook.Sheets[sheetName] = newSheet;
       xlsx.writeFile(workbook, 'data/contribuyentes.xlsx');
       res.status(201).json(newContribuyente);
   });
   app.listen(PORT, () => {
       console.log(`Servidor corriendo en http://localhost:${PORT}`);
   });