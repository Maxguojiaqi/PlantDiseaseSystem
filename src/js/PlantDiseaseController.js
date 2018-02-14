define([], function(){
	_url: "",
	setServerUrl: function(url){
		this._url = url;
	},

	prepareLayerForExport: function(coords){
		if (_url == ""){
			throw Exception("No URL defined.");
		}

	return $.post(_url, 
      { 
       minX: String(coords[0]),
       minY: String(coords[1]),
       maxX: String(coords[2]),
       maxY: String(coords[3]),
      })


      .done(function(data, status)
      {
        $("#status").html("done");
          data = jQuery.parseJSON(data);
          console.log(data[0]);

          // Trigger event so page is refreshed accordingly?

          // Call the publishing service?

          return "";//publishedUrl;
      });

	},

	generateRiskMap: function(/*???*/){

	}
})