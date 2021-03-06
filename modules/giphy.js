module.exports = {
  returnData: function(data) {
    return data; // one GIPHY
  },

  ///////////////////////////////////////////////////////////////////////////////
  //    HOW TO USE IN SERVER.JS = sendGiphy(request,messageText,10,senderID);
  /////////////////////////////////////////////////////////////////////////////

  get: function(request, keywords, limit, callback) {
    var keywords = encodeURIComponent(keywords);
    var options = {
      url:
        "http://api.giphy.com/v1/gifs/search?q=" +
        keywords +
        "&api_key=&limit=" +
        limit +
        "&offset=0",
      method: "GET"
    };

    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var choice = Math.floor(Math.random() * (limit - 1)); // + 0 (from zero to limit)

        var obj = body;
        var data = obj; // ... returned JSON - unparsed?

        var stringConstructor = "test".constructor;
        var arrayConstructor = [].constructor;
        var objectConstructor = {}.constructor;

        console.log("=========== GIPHY LOGGER! ==========");
        // if (data.constructor===stringConstructor){  console.log("STRING!"); }
        // else if (data.constructor===arrayConstructor){ console.log("ARRAY!"); }
        // else if (data.constructor===objectConstructor){console.log("OBJECT!"); }

        // console.log(JSON.stringify(object.data[choice]));

        console.log(choice);

        var url;

        // console.time("json parse");
        var object = JSON.parse(data); // 1000x element: 108.723ms  | 25x element took: 3.266ms
        // console.log(object);
        // console.timeEnd("json parse");

        object.data[choice]
          ? (url = object.data[choice].images.fixed_height.url)
          : console.log("GIPHY NOT FOUND!");

        callback(module.exports.returnData(url));
      } else {
        console.log(body);
      }
    });
  }
};
