const form = document.getElementById("form");
const cityInput = document.querySelector(".search-input");
const cardContainer = document.querySelector(".card-container");
const searchMsg = document.querySelector(".search-msg")

const isEmptyInput = () =>{
    return cityInput.value.trim() === "";
};

const isValidCity = (cityData) =>{
    return !cityData.id
};

const getCityData = (cityData)=>{
	return{
	    cityName: cityData.name,
		imageName: cityData.weather[0].icon,
		cityWeatherInfo: cityData.weather[0].description,
		cityTemp: Math.round(cityData.main.temp),
		cityST: Math.round(cityData.main.feels_like),
		cityMaxTemp:Math.round (cityData.main.temp_max),
		cityMinTemp:Math.round (cityData.main.temp_min),
		cityHumidity: cityData.main.humidity,
	}
}

const createCityTemplate =  async (cityData)=>{
	const {
		cityName,
		imageName,
		cityWeatherInfo,
		cityTemp,
		cityST,
		cityMaxTemp,
		cityMinTemp,
		cityHumidity,
	} = await getCityData (cityData);
    return `
    <div class="weather-card animate">
		<div class="weather-info-container">
			<h2 class="weather-title">${cityName}</h2>
			<p class="weather-description">${cityWeatherInfo}</p>
			<div class="weather-temp-container">
				<span class="weather-temp">${cityTemp}°</span>
				<span class="weather-st">- ${cityST}° ST</span>
			</div>
		</div>
		<div class="weather-img-container">
			<img src="./assets/img/${imageName}.png" alt="weather image" />
		</div>
		<div class="weather-extra-container">
			<div class="weather-minmax-container">
				<span class="weather-span">
					<i class="fa-solid fa-arrow-up-long"></i>
					Max: ${cityMaxTemp}º
				</span>
				<span class="weather-span">
					<i class="fa-solid fa-arrow-down-long"></i>
					Min: ${cityMinTemp}º
				</span>
			</div>
			<span class="weather-humidity">${cityHumidity}% Humedad</span>
		</div>
	</div>
    `
}

const rederCityCard = async (cityData) =>{
    cardContainer.innerHTML = await createCityTemplate(cityData);
};

const changeSearchMsg = async (cityData)=>{
	const cityName = await cityData.name;
   searchMsg.innerHTML = ` Así esta el clima en ${cityName},
   ¿Querés ver el clima de otra ciudad?`
};

const searchCity = async (e)=> {
    e.preventDefault();

    if(isEmptyInput())
    {
        alert("Please enter a city");
        return;
    }

    const fetchedCity = await requestCity(cityInput.value);
    
    console.log(fetchedCity);
    
    if(isValidCity(fetchedCity)){
        alert("The city entered does not exist");
        form.reset();
        return;
    }
    
	rederCityCard(fetchedCity);

	changeSearchMsg(fetchedCity);
	form.reset();

};



const init = () =>{
    form.addEventListener("submit", searchCity)
}; 

init();