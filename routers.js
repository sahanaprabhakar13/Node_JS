const fs=require("fs");

const requestHandler=(req,res)=>{

    const url=req.url;
const method =req.method;
if(url === '/'){


res.write('<html>');
res.write('<head><title>Hello</title></head>');
res.write('<body><form action="/message"  method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
return res.end();

}

if(url === '/message' && method === 'POST')

{
    const body=[];
    req.on('data',(chunk)=>{

        body.push(chunk);
    });

    req.on('end',()=>{

  const parsedBody=Buffer.concat(body).toString();
  const message =parsedBody.split("=")[1];
  fs.writeFileSync('message.txt',message);
  res.StatusCode=302 ;
  res.setHeader('location','/');
  return res.end();
    });
 
 


}


res.write('<html>');
res.write('<head><title>Hello</title></head>');
res.write('<body><h1>First Node Server</h1></body>');
res.end();
};

module.exports = requestHandler;