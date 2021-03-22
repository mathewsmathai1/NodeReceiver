var http=require('http');
const pg = require('pg');
var port = process.env.PORT || 2227;


/*
const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'NodeDB',
password: 'Eminem96',
port: '5432'});
*/

/*
Host
ec2-3-91-127-228.compute-1.amazonaws.com
Database
dcr8fdthk8rmi3
User
ercfxtzsiorbqj
Port
5432
Password
ce9e2ff72274bd3d70b08902bb41a5446e8f89e953442b207f11ac845238eae6
URI
postgres://ercfxtzsiorbqj:ce9e2ff72274bd3d70b08902bb41a5446e8f89e953442b207f11ac845238eae6@ec2-3-91-127-228.compute-1.amazonaws.com:5432/dcr8fdthk8rmi3
Heroku CLI
heroku pg:psql postgresql-colorful-92212 --app nodereceiver

*/
const pool = new pg.Pool({
user: 'ercfxtzsiorbqj',
host: 'ec2-3-91-127-228.compute-1.amazonaws.com',
database: 'dcr8fdthk8rmi3',
password: 'ce9e2ff72274bd3d70b08902bb41a5446e8f89e953442b207f11ac845238eae6',
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
    client.query('Insert into nodetable values(7)', (err, res) => {
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

/*
Good video however there are a few key details missed:

You cannot just write 'git push heroku master' as git has no clue where to push it too
Instead write the following commands Remember to change the brackets according to your respective projects).

$ heroku login
$ cd {PATH TO CODE}
$ git init
$ heroku git:remote -a {ENTER APP NAME}
$ git add .
$ git commit -am "make it better"
$ git push heroku master
$ heroku git:remote -a {ENTER APP NAME}

Also This is only one of the 3 methods and you can find them by going into your app from the dashboard and clikcing on the deploy tab. There you will see a row on deployment methods and their steps right under it.

A pin/like would be appriciated so others can view the comment easily. Thanks.

*/
