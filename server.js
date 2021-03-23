var http=require('http');
const pg = require('pg');
var port = process.env.PORT || 2227;





const pool = new pg.Pool({
user: 'User_Name',
host: 'xxxxxxxx.amazonaws.com',
database: 'Database_Name',
password: 'Password',
port: '5432'//,
//ssl: true,
//sslmode: require,
//rejectUnauthorized: false
});


/*
pool.query("Insert into nodetable values(2)", (err, res) => {
console.log(err, res);
pool.end();
});
*/
function pushToDb()
{
  console.log("Inside PushtoDB()");
pool.connect((err, client, done) => {
    if (err) throw err
    client.query('Insert into sometable values(7)', (err, res) => {
      done();
      if (err) {
        console.log("Error in PushToDB: "+err.stack);
      } else {
        console.log("ROWS : "+res.rows[0]);
      }
    })
  });
  //pool.end();
}
console.log("HELLO HELLO HELLO HELLO");


/*pool.query("Commit", (err, res) => {
console.log(err, res);
pool.end();
});*/  

//decodeURIComponent('JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B');

var server=http.createServer((function(request,response)
{

 
 const { headers, method, url } = request;
  
  let body = [];
  if(request.method == 'POST')
  {
  pushToDb();
  request.on('error', (err) => {
    console.error("ERROR IN request.method: "+err);
  }).on('data', (chunk) => {
    console.log("CHUNK "+chunk);
    body.push(chunk);
  }).on('end', () => {
    
    //console.log(`Printing Data ${body}`); 
    var obj = JSON.parse(body);
    console.log("Printing Data "+ obj.name); 
    
    //var obj = decodeURIComponent(body);

    //console.log("DECODE : "+obj);

    response.writeHead(200,
        {"Content-Type" : "text/plain"});
        if(request.method == 'POST')
           response.end(`Hello From The Server ${obj.name}\n`);
        
    }
    );
}
else if(request.method == 'GET')
  {
    console.log("PRINTING FOR GET METHOD "+request.method);
    response.end(`Hello World ${request.method}`);
  }
   
	

    
}));
server.listen(port);

console.log("HELLO 2");

