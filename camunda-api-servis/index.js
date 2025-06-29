const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/banka/nalog', (req, res) => {
    console.log('-----------------------------------------');
    console.log('API POZVAN: Zaprimljen nalog za isplatu!');
    
    const nalog = req.body;

    console.log(`  > Primatelj: ${nalog.primatelj}`);
    console.log(`  > Iznos za isplatu: ${nalog.iznos} ${nalog.valuta}`);
    console.log(`  > Opis plaćanja: ${nalog.opis}`);
    
    console.log('-----------------------------------------');
    
    res.status(200).json({ 
        status: 'uspjeh', 
        poruka: `Nalog za isplatu u iznosu od ${nalog.iznos} ${nalog.valuta} je uspješno zaprimljen.` 
    });
});

app.listen(port, () => {
    console.log(`Poslužitelj sluša na adresi http://localhost:${port}`);
});