const express = require('express'); 
const formidable = require('express-formidable');
const db = require('./db');
const session = require('express-session')
const uuid = require('uuid')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express(); 
const port = process.env.PORT||4000; 

app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("secret"));


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret:"secret",
   
  }));

    async function setNewSession(req){
        try {
            const result = await db.query(`
            UPDATE clienthttpdata SET session = '${req.session.id}'  WHERE email = '${req.session.email}'
            `);
            
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
    }

    async function setLogIn(req){
        try {
            const result = await db.query(`
            UPDATE clienthttpdata SET lastVisit = '${(new Date()).toLocaleDateString('ru-RU', {year: 'numeric',month: '2-digit',day: '2-digit'})
        }'  WHERE email = '${req.session.email}'
            `);
            
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
    }

app.post('/sign_up',formidable(), async (req, res) => {
    if(req.session.auth){
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
            status varchar(32) not null,
            session varchar(64) not null UNIQUE
         )
        `);
        
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
      
        try {
            const result = await db.query(`SELECT * from clientHTTPData WHERE email='${req.fields.email}'`);
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
            INSERT INTO clientHTTPData(session,email, name, password, status, lastVisit , regDate) VALUES (' ${req.session.id}','${req.fields.email}','${req.fields.name}','${req.fields.password}', 'unblock', '${(new Date()).toLocaleDateString('ru-RU', {year: 'numeric',month: '2-digit',day: '2-digit'})}','${(new Date()).toLocaleDateString('ru-RU', {year: 'numeric',month: '2-digit',day: '2-digit'})}')`);
            req.session.auth = true;
            req.session.email = req.fields.email;

        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ state: 'redirect' })
        return
}); 

app.get('/sign_in', async (req, res) => { 
    if(req.session.auth){
        res.json({ state: 'redirect' })
    }
})

app.get('/sign_up', async (req, res) => { 

    if(req.session.auth){
        res.json({ state: 'redirect' })
        return
    }  
})

app.delete('/log_out', async (req, res) => { 
        console.log("well done")
        delete req.session.auth;
        req.session.destroy();
})

app.post('/sign_in',formidable(), async (req, res) => { 

    if(req.session.auth){
        res.json({ state: 'redirect' })
        return;
    }
    try {
        const result = await db.query(`SELECT * from clientHTTPData WHERE email='${req.fields.email}' and password='${req.fields.password}' and status='unblock'`);
        if(result.rowCount<1){
            res.json({ state: 'Login or password error!' })
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    }
    setNewSession(req)
    req.session.auth = true;
    req.session.email = req.fields.email;
    res.json({ state: 'redirect' })
    return
}); 

app.get('/admin', async (req, res) => { 
    if(!req.session.auth){
        res.status(401).send('Unauthorized');
        return;
    }
    setLogIn(req)
    try {
        const result = await db.query(`SELECT id, regdate, email, name, lastvisit, status from clientHTTPData`);
        res.json(result.rows);
    } catch (err) {
        console.log(123123213231)
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
    }
}); 



app.delete('/admin',bodyParser.json(), async (req, res) => {
    if(!req.session.auth){
        res.status(401).send('Unauthorized');
        return;
    }
    let deletedUsers=req.body;;
    for(let i = 0;i<deletedUsers.length;++i){
        try {
            let result = await db.query(`SELECT session from clientHTTPData WHERE email='${deletedUsers[i]}'`);
            await req.sessionStore.destroy(result.rows[0].session, (error) => {console.log(error)});

            await db.query(`DELETE FROM clientHTTPData WHERE email='${deletedUsers[i]}'`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
    }
    res.status(200).send()
})

app.put('/admin',bodyParser.json(), async (req, res) => {
    if(!req.session.auth){
        res.status(401).send('Unauthorized');
        return;
    }
    let blockedUsers = req.body;

    for(let i = 0;i<blockedUsers.length;++i){
        let blockedUsers = req.body;
        console.log(blockedUsers,123)
        try {
            let result = await db.query(`SELECT session from clientHTTPData WHERE email ='${blockedUsers[i]}'`);
            console.log(result)
            await req.sessionStore.destroy(result.rows[0].session, (error) => {console.log(error)});
            await db.query(`UPDATE clienthttpdata SET status='block'  WHERE email='${blockedUsers[i]}'`);
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
    }
    res.status(200).send()
})

app.patch('/admin',bodyParser.json(), async (req, res) => {
    if(!req.session.auth){
        res.status(401).send('Unauthorized');
        return;
    }
    let blockedUsers = req.body;

    for(let i = 0;i<blockedUsers.length;++i){
        try {
            await db.query(`UPDATE clienthttpdata SET status='unblock' WHERE email = '${blockedUsers[i]}'`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
    }
    res.status(200).send()
})
