var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true );
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if(query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      var word = query['word'];
      for(var i = 0; i < word.length; i++)
      {
         res.write('<pre>' + word + '</pre>' + '<br>');
      }
      res.end('');
      
    }
    
    if(query['cmd'] == 'dotted')
    {
      console.log("Handling a request");
      console.log(query);
      var word1 = query['word1'];
      var word2 = query['word2'];
      var max = 30;
      var length1 = word1.length;
      var length2 = word2.length;
      var sum = 0;
      sum = length1 + length2;
      var space = max - sum;
      var dots = '';
      for(var i = 0; i < space; i++)
      {
        dots = dots + '.';
      }
      res.write('<pre>' + word1 + dots + word2 + '</pre>');
      res.end('');
    }
    
    if(query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var total = 0;
      var num = 0;
      var min = 100;
      var max = 0;
      for(var i in query['grades'])
      {
        total = total + parseInt(query['grades'][i]);
        num++;
        if(parseInt(query['grades'][i]) < min)
        {
          min = parseInt(query['grades'][i]);
        }
        if(parseInt(query['grades'][i]) > max)
        {
          max = parseInt(query['grades'][i]);
        }
      }
      var avg = total / num;
      res.write('<pre> Ave: ' + avg + ' Min: ' + min + ' Max: ' + max + '</pre>');
      res.end('');
    }
    else
    {
      res.end('');
    }
}