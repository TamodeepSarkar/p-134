img="";
status="";

function setup()
{
    canvas= createCanvas(380 , 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modleLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}


function modleLoaded()
{
    console.log("modle loaded");
    status= true;
    objectDetector.detect(video,gotResults);
}

function gotResults(error,results)
{
  if(error)
  {
    console.log(error);
  }
  console.log(results);
  
  objects=results;
}

function preload()
{
    img = loadImage('bottle.webp');
}

objects=[];
function draw()
{
    image(video,0,0,380,380);
   
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
      for(i = 0 ; i < objects.length ; i++)
      {
        document.getElementById("status").innerHTML = "Status : Detecting Objects";
        fill(r,g,b);       
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + percent + "%" , objects[i].x , objects[i].y);
        noFill()
        stroke(r,g,b);
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
          
          if(objects[i].label == "person")
              {
                  document.getElementById("number_of_objects").innerHTML = "Baby Found";
              }
          else{
              document.getElementById("number_of_objects").innerHTML = "Baby Not Found";     
          }
      }
    }
    /*fill("#FF0000");
    text("Bottle",45,75);
    noFill();
    stroke("#FF0000");
    rect(30,60,450,350);*/
    
}