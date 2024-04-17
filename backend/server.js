const express = require('express'); 
const formidable = require('express-formidable');
const db = require('./db');
const session = require('express-session')

;

const app = express(); 
const port = process.env.PORT||4000; 

app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.use(formidable());



app.post('/sign_up', async (req, res) => {
    if(session.auth){
        res.json({ state: 'redirect' })
        return;
    }
    try {
        const result = await db.query(`
        CREATE TABLE IF NOT EXISTS clientHTTPData(
            id SERIAL PRIMARY KEY,
            regDate  varchar(20) not null,
            email varchar(256) not null UNIQUE,
            name varchar(256) not null,
            password varchar(256) not null,
            lastVisit varchar(20) not null,
            status varchar(32) not null
         )
        `);
        
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
      
        try {
            const result = await db.query(`SELECT * from clientHTTPData WHERE email='${req.fields.email}'`);
            console.log(result.rowCount)
            if(result.rowCount>=1){
                res.json({ state: 'This user is already registered' })
                return;
        }
       
        } catch (err) {
            console.error(err);
            es.status(500).send('Internal Server Error');
        }
        try {
            const result = await db.query(`
            INSERT INTO clientHTTPData(email, name, password, status, lastVisit , regDate) VALUES ( '${req.fields.email}','${req.fields.name}','${req.fields.password}', 'unblock', '${(new Date(2020, 0, 9)).toLocaleDateString('ru-RU', {year: 'numeric',month: '2-digit',day: '2-digit'})}','${(new Date(2020, 0, 9)).toLocaleDateString('ru-RU', {year: 'numeric',month: '2-digit',day: '2-digit'})}')`);
            session.auth = true;
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        res.json({ state: 'redirect' })
        return
}); 

app.get('/sign_in', async (req, res) => { 
    if(session.auth){
        res.json({ state: 'redirect' })
    }
})

app.get('/sign_up', async (req, res) => { 
    console.log(session.auth, 123123)
    if(session.auth){
        res.json({ state: 'redirect' })
        return
    }
    
})

app.post('/sign_in', async (req, res) => { 
    if(session.auth){
        res.json({ state: 'redirect' })
        return;
    }
    try {
        const result = await db.query(`SELECT * from clientHTTPData WHERE email='${req.fields.email}' and password='${req.fields.password}'`);
        console.log(result.rowCount)
        if(result.rowCount<1){
            res.json({ state: 'Login or password error!' })
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    }
    session.auth = true;
    res.json({ state: 'redirect' })
    return
}); 

app.use(session({
    resave: false,
    saveUninitialized: false,
  }));