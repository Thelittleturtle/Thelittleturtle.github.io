import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faSmog,
} from '@fortawesome/free-solid-svg-icons';
import device from '../responsive/Device';
import ForecastHour from './ForecastHour';
import ResultFadeIn from './ResultFadeIn';
import BigLabel from './LargeLabel';
import MediumLabel from './MediumLabel';
import SmallLabel from './SmallLabel';
import Text from './Text';

const Results = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px 0;
    opactiy: 0;
    visibility: hidden;
    position: relative;
    top: 20px;
    animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

const LocationWrapper = styled.div`
    flex-basis: 100%;
`;

const CurrentWeatherWrapper = styled.div`
    flex-basis: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: auto 1fr;
    margin: 20px 0;
    grid-gap: 30px;
    @media ${device.mobileL} {
        flex-basis: 50%;
        padding-right: 10px;
    }
    @media ${device.tablet} {
        grid-template-columns: 1fr 1fr;
        padding-right: 20px;
    }
`;

const WeatherIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items; center;
    color: #ffffff;
    font-size: 70px;
    @media ${device.tablet} {
        font-size: 100px;
        justify-content: flex-end;
    }
    @media ${device.laptop} {
        font-size: 120px;
    }
    @media ${device.laptopL} {
        font-size: 140px;
    }
`;

const TemperatureWrapper = styled.div``;

const Temperature = styled.h3`
    display: block;
    font-size: 60px;
    font-weight: 400;
    color: #ffffff;
    @media ${device.tablet} {
    font-size: 70px;
    }
    @media ${device.laptop} {
    font-size: 90px;
    }
    @media ${device.laptopL} {
    font-size: 110px;
    }
`;

const CurrentDetailWeather = styled.div`
    flex-basis: 100%;
    display: flex;
    background-color: rgba(255,255,255,0.2);
    flex-wrap: wrap;
    padding: 20px 0;
    margin: 20px 0;
    align-self: flex-start;
    border-radius: 10px;
    @media ${device.mobileL} {
        flex-basis: 50%;
    }
`;

const WeatherDetail = styled.div`
    flex-basis: calc(100%/3);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media ${device.laptop} {
        padding: 20px 10px;
    }
`;

const ForeCast = styled.div`
    display: flex;
    flex-wrap: no-wrap;
    overflow-x: scroll;
    overflow-y: hidden;
`;
const Result = ({weather}) => {
    const {
        city,
        country,
        date,
        description,
        main,
        temp,
        sunset,
        sunrise,
        humidity,
        wind,
        highestTemp,
        lowestTemp,
        forecast,
    } = weather;

    console.log(weather);
    const forecasts = forecast.map( item => {
        return(
            <ForecastHour
                key={item.dt}
                temp={Math.floor(item.main.temp)}
                month={item.dt_txt.slice(5,7)}
                day={item.dt_txt.slice(8,10)}
                hour={item.dt_txt.slice(11,13)*1}
                icon={item.weather[0].icon}
            />
        )
    })
    let weatherIcon = null;

    if (main === 'Thunderstorm') {
        weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (main === 'Drizzle') {
        weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (main === 'Rain') {
        weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (main === 'Snow') {
        weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (main === 'Clear') {
        weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (main === 'Clouds') {
        weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
        weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }

    return(
        <Results>
            <LocationWrapper>
                <BigLabel>
                    {city}, {country}
                </BigLabel>
                <Text>
                    {date}
                </Text>
            </LocationWrapper>
            <CurrentWeatherWrapper>
                <WeatherIcon>
                    {weatherIcon}
                </WeatherIcon>
                <TemperatureWrapper>
                    <Temperature>
                        {Math.floor(temp)}&#176;
                    </Temperature>
                    <SmallLabel firstToUpperCase >
                        {description}
                    </SmallLabel>
                </TemperatureWrapper>
            </CurrentWeatherWrapper>
            <CurrentDetailWeather>
                <WeatherDetail>
                    <SmallLabel>
                        {Math.floor(highestTemp)}&#176;
                    </SmallLabel>
                    <Text>
                        High
                    </Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel>
                        {wind}mph
                    </SmallLabel>
                    <Text>
                        Wind
                    </Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel>
                        {sunrise}
                    </SmallLabel>
                    <Text>
                        Sunrise
                    </Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel>
                        {Math.floor(lowestTemp)}&#176;
                    </SmallLabel>
                    <Text>
                        Low
                    </Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel>
                        {humidity}
                    </SmallLabel>
                    <Text>
                        Rain
                    </Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel>
                        {sunset}
                    </SmallLabel>
                    <Text>
                        Sunset
                    </Text>
                </WeatherDetail>
            </CurrentDetailWeather>
            <ForeCast>
                {forecasts}
            </ForeCast>
        </Results>
    )
}

export default Result;