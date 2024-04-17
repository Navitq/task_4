const express = require('express'); 
const formidable = require('express-formidable');
const db = require('./db');
const session = require('express-session')



const app = express(); 
const port = process.env.PORT||4000; 

app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.use(formidable());

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret:"b5c82c4c-0add-440e-b4cf-51a7e845a46e",
   
  }));

    async function setLogIn(){
        try {
            const result = await db.query(`
            UPDATE clienthttpdata SET regdate = '17.04.2024'  WHERE email = '${session.email}'
            `);
            
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
    }


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
            return;
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
            INSERT INTO clientHTTPData(email, name, password, status, lastVisit , regDate) VALUES ( '${req.fields.email}','${req.fields.name}','${req.fields.password}', 'unblock', '${(new Date()).toLocaleDateString('ru-RU', {year: 'numeric',month: '2-digit',day: '2-digit'})}','${(new Date()).toLocaleDateString('ru-RU', {year: 'numeric',month: '2-digit',day: '2-digit'})}')`);
            session.auth = true;
            session.email = req.fields.email;

        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ state: 'redirect' })
        return
}); 

app.get('/sign_in', async (req, res) => { 
    console.log(session.auth)
    if(session.auth){
        res.json({ state: 'redirect' })
    }
})

app.get('/sign_up', async (req, res) => { 
    console.log(session.auth)
    if(session.auth){
        res.json({ state: 'redirect' })
        return
    }  
})

app.delete('/log_out', async (req, res) => { 
        console.log("well done")
        delete session.auth;
})

app.post('/sign_in', async (req, res) => { 
    if(session.auth){
        res.json({ state: 'redirect' })
        return;
    }
    try {
        const result = await db.query(`SELECT * from clientHTTPData WHERE email='${req.fields.email}' and password='${req.fields.password}' and status='unblock'`);
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
    session.email = req.fields.email;
    res.json({ state: 'redirect' })
    return
}); 

app.get('/admin', async (req, res) => { 
    if(!session.auth){
        res.status(401).send('Unauthorized');
        return;
    }
    setLogIn()
    try {
        const result = await db.query(`SELECT id, regdate, email, name, lastvisit, status from clientHTTPData`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    }
}); 

