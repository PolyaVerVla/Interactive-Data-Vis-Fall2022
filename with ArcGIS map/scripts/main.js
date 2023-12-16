const API_KEY = 'd08bd17521244c1c9c9200308220607'

//const API_KEY = 'AAPK3ab2f8bc8f9e403aabbc77e46310008ddDpjZcbNcqg8zFKFFdAWqRAPaVaz33qukpibDDIiWfA8AfTs5Qa_W5trX1PSMZK_'

//const API_KEY = 'AIzaSyC-ECSbUQz3sWZY4alub3AnlUZ6QGGMoqw';


const mediaQuery = window.matchMedia('(max-width: 500px)')
window.addEventListener('resize',function(){
// Check if the media query is true
if (mediaQuery.matches) {
    // Then trigger an alert
    console.log('Media Query Matched!')
  }
})

let agent = navigator.userAgent;
console.log(agent.includes('Mac'))

function getData(query) {
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q="${query}"&aqi=yes`;

    $("#loading").show();

    axios.get(URL).then(function (response) {
        console.log(response)
        $("#loading").hide();
        let current = response.data.current;
        let Displaycurrent= [
            {displayName:"temperature", value:current.temp_f},
            {displayName:"feels like", value:current.feelslike_f},
            {displayName:"humidity", value:current.humidity},
            {displayName:"UV", value:current.uv},
            {displayName:"EPA", value:current.air_quality["us-epa-index"]},
        ]
    

        let htmlContainer = document.getElementById("select-me");
        
        htmlContainer.innerHTML = ""

        Displaycurrent.forEach(function (item) {
            let DisplaycurrentDiv = document.createElement('div');
            let currentName = document.createTextNode(item.displayName);
            DisplaycurrentDiv.appendChild(currentName);
        
           htmlContainer.appendChild(DisplaycurrentDiv);

            let DisplayvalueDiv = document.createElement('div');
            let currentValue  = document.createTextNode(item.value);
            DisplayvalueDiv.appendChild(currentValue);

           htmlContainer.appendChild(DisplayvalueDiv);
        
          

        })
        //function changeResults() {
          //  document.getElementById("select-me").reset();
      //   }
        
       // .catch(function (error) {
        //    alert(error);
        
    //      });
    });
}




  ///      let temp = response.data.current.temp_f;
  //      $("#weather-results").text(`It is ${temp} degrees out`); 
  //      let feels = response.data.current.feelslike_f;
   //     $("#weather-results").text(`Feels like ${feels} degrees out`);
   //     $("#weather-results").css("opacity", 0);
   //     $("#weather-results").show();
   //     $("#weather-results").animate({
   //         opacity:1
   //     },1500)

 


$("#submit-button").on("click",function () {
    let userInput = document.getElementById("user-input");
    getData(userInput.value);

})

//CLICK EXAMPLE:
// let timesClicked = 0;

// submitButton.addEventListener("click",function(){
//     timesClicked++;
//     let resultContainer = document.getElementById("weather-results");
//    // let txt = document.createTextNode(`You clicked ${timesClicked} times`);
//     resultContainer.innerText = `You clicked ${timesClicked} times`
// });