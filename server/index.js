const express = require('express');
const port = process.env.PORT || 4260;
const app = express();
const path = require('path');

// Path to 'dist'
const destinationPath = path.join(__dirname, '../dist/trimart-shop-app');

// Hosting from 'dist' folder
app.use(express.static(destinationPath));
console.log(`Express hosting from ${destinationPath}`);

// Serving index.html
app.get('*', (req,res) => {
    res.sendFile(path.join(destinationPath, 'index.html'));
})
console.log('Serving index.html');

// Initialize our app and listen to port
app.listen(port, () => console.log(`Server is running on port ${port}`));