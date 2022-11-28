import express from 'express';
import { GETCAT, POSTCAT, DELETECAT, PUTCAT, GETBYIDCAT } from './controllers/categories.controller.js';
import { GETSUBCAT, POSTSUBCAT, DELETESUBCAT, PUTSUBCAT, GETBYIDSUBCAT } from './controllers/sub_categories.controller.js';
import { GETPRODUCT, POSTPRODUCT, DELETEPRODUCT, PUTPRODUCT, GETBYIDPRODUCT } from './controllers/products.controller.js';

const app = express();
app.use(express.json());

// categories

app.get('/categories', GETCAT);
app.get('/categories/:id', GETBYIDCAT);
app.post('/categories', POSTCAT);
app.delete('/categories/:id', DELETECAT);
app.put('/categories/:id', PUTCAT);

// sub_categories

app.get('/subcategories', GETSUBCAT);
app.get('/subcategories/:subId', GETBYIDSUBCAT);
app.post('/subcategories', POSTSUBCAT);
app.delete('/subcategories/:id', DELETESUBCAT);
app.put('/subcategories/:id', PUTSUBCAT);

// products

app.get('/products', GETPRODUCT);
app.get('/products/:productId', GETBYIDPRODUCT);
app.post('/products', POSTPRODUCT);
app.delete('/products/:id', DELETEPRODUCT);
app.put('/products/:id', PUTPRODUCT);

app.listen(5000, () => console.log('server url: http://localhost:5000'));