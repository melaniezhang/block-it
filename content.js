// future steps:
// add multiple filters
// add block image, extension figures out what you want to filter

var filter = "rabbit";

window.onload = function(){
  $("img").each(function() {
    var curr_img = this;


    var req = {
      "requests": [{
        "image": {},
        "features": [{
          "type": "LABEL_DETECTION",
          "maxResults": 3
        }]
      }]
    };

    if (this.src.startsWith('data:image/')) {
      var index = this.src.indexOf(',') + 1;
      req['requests'][0]['image']['content'] = this.src.slice(index);
    }
    else if (this.src.startsWith('http')) {
      req['requests'][0]['image']['source'] = {'imageUri': this.src};
    } 

    $.ajax({
      type: 'POST',
      url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCMICJ942eIkp2Yx0NsVnf-Ypq9KLgW5z4",
      data: JSON.stringify(req),
      contentType:"application/json; charset=utf-8",
      success: function(data) {
                      console.log("image src is " + curr_img.src)
                      console.log("response is " + data)
                      for (var j = 0; j < 3; j++) {
                        if (data['responses'][0]['labelAnnotations'][j]['description'] == filter) { //figure out path here
                          $(curr_img).attr('src', 'http://jera.com/sandbox/Super_Simple_AR_Target.png');
                        }
                      }
                  },
      dataType: "json",
      async:false
    });
  });
};