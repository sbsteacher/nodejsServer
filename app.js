const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const getConn = require('./mariadb');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/list', async (req, res) => {
    getConn(conn => {
        const sql = `
        SELECT 
            iboard, title, writer 
        FROM t_board
        ORDER BY iboard DESC
        `;
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                console.log(rows);
                res.render('list', {data : rows});
            }            
        });
        conn.release();
    });
});

app.get('/write', (req, res) => {
    res.render('write');
})

app.post('/write', async (req, res) => {    
    const data = req.body;
    const sql = `
        INSERT INTO t_board
        (title, ctnts, writer)
        VALUES
        ('${data.title}', '${data.ctnts}', '${data.writer}')
    `;
    console.log(sql);
    
    getConn(conn => {
        conn.query(sql, (err, rows, fields) => {
            if(!err) {
                console.log(rows);
                res.redirect('/list');
            }            
        });
        conn.release();
    });
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/hi', (req, res) => {
    const result = `
        <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1>반가워</h1>
                <div>좋아요</div>
            </body>
        </html>
    `;
    res.send(result);
});

app.listen(port, () => {
    console.log(`서버 실행 포트번호 ${port}`);
});