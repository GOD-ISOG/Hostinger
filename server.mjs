import { createServer } from 'node:http';
   import { readFile, writeFile } from 'node:fs/promises';
   import path from 'node:path';
   import xlsx from 'xlsx';
   const server = createServer(async (req, res) => {
       const url = req.url;
       if (url === '/contribuyentes' && req.method === 'GET') {
           try {
               const workbook = xlsx.readFile('data/contribuyentes.xlsx');
               const sheetName = workbook.SheetNames[0];
               const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
               res.writeHead(200, { 'Content-Type': 'application/json' });
               res.end(JSON.stringify(data));
           } catch (error) {
               res.writeHead(500, { 'Content-Type': 'text/plain' });
               res.end('Error al leer el archivo Excel');
           }
       } else if (url === '/contribuyentes' && req.method === 'POST') {
           let body = '';
           req.on('data', chunk => {
               body += chunk.toString(); // Convertir Buffer a string
           });
           req.on('end', async () => {
               const newContribuyente = JSON.parse(body);
               try {
                   const workbook = xlsx.readFile('data/contribuyentes.xlsx');
                   const sheetName = workbook.SheetNames[0];
                   const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
                   data.push(newContribuyente);
                   const newSheet = xlsx.utils.json_to_sheet(data);
                   workbook.Sheets[sheetName] = newSheet;
                   xlsx.writeFile(workbook, 'data/contribuyentes.xlsx');
                   res.writeHead(201, { 'Content-Type': 'application/json' });
                   res.end(JSON.stringify(newContribuyente));
               } catch (error) {
                   res.writeHead(500, { 'Content-Type': 'text/plain' });
                   res.end('Error al guardar el contribuyente');
               }
           });
       } else if (url.startsWith('/public/')) {
           const filePath = path.join(process.cwd(), url);
           try {
               const fileContent = await readFile(filePath);
               res.writeHead(200);
               res.end(fileContent);
           } catch (error) {
               res.writeHead(404, { 'Content-Type': 'text/plain' });
               res.end('Archivo no encontrado');
           }
       } else {
           res.writeHead(404, { 'Content-Type': 'text/plain' });
           res.end('Ruta no encontrada');
       }
   });
   // Inicia el servidor en el puerto 3000
   server.listen(3000, '127.0.0.1', () => {
       console.log('Listening on 127.0.0.1:3000');
   });