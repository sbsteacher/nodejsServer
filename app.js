const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const getConn = require('./mariadb');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/static'));

app.get('/list', (req, res) => {   
    const sql = `
        SELECT 
            iboard, title, writer 
        FROM t_board
        ORDER BY iboard DESC
    `;

    getConn(conn => {
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
});

app.post('/write', (req, res) => {    
    const data = req.body;    
    const sql = `
        INSERT INTO t_board
        (title, ctnts, writer)
        VALUES
        ('${data.title}', '${data.ctnts}', '${data.writer}')
    `;
    console.log(sql);
    
    getConn(conn => {
        conn.query(sql, (err, result, fields) => {
            if(!err) {
                console.log(result);
                res.redirect('/list');
            }            
        });
        conn.release();
    });
})

app.get('/detail', (req, res) => {
    console.log(req.query);
    const sql = `
        SELECT * FROM t_board
        WHERE iboard = ${req.query.iboard}
    `;
    getConn(conn => {
        conn.query(sql, (err, rows, fields) => {
            if(!err) {                
                const data = rows[0];
                console.log(data);
                res.render('detail', {data});
            }            
        });
        conn.release();
    });   
});

app.get('/delete', (req, res) => {
    const sql = `
        DELETE FROM t_board
        WHERE iboard = ${req.query.iboard}
    `;
    getConn(conn => {
        conn.query(sql, (err, result, fields) => {
            if(!err) {                
                console.log(result);
                res.redirect('/list');
            }            
        });
        conn.release();
    }); 
});

app.get('/update', (req, res) => {

    const sql = `
        SELECT * FROM t_board
        WHERE iboard = ${req.query.iboard}
    `;
    getConn(conn => {
        conn.query(sql, (err, rows, fields) => {
            if(!err) {                
                const data = rows[0];
                console.log(data);
                res.render('update', {data});
            }            
        });
        conn.release();
    });     
});


app.post('/update', (req, res) => {
    const data = req.body;
    const sql = `
        UPDATE t_board
        SET title = '${data.title}'
        , ctnts = '${data.ctnts}'
        , writer = '${data.writer}'
        WHERE iboard = ${data.iboard}
    `;

    getConn(conn => {
        conn.query(sql, (err, result, fields) => {
            if(!err) {
                console.log(result);
                res.redirect('/list');
            }            
        });
        conn.release();
    });
});

app.listen(port, () => {
    console.log(`서버 실행 포트번호 ${port}`);
});