const key = "2538f49c3c5b7af49397ec70888f57c9";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const requestCity = async (city) => {
    const response = await fetch(`${BASE_URL}weather?q=${city}&units=metric&lang=es&appid=${key}`);
    const data = await response.json();
    return data;
};

