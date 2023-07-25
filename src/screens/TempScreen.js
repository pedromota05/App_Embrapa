import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import TabContainer from "../components/TabContainer";
import MainHeader from "../components/MainHeader";
import { PLACES } from "../data";
import { colors, shadow, spacing } from "../constants/theme";

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//963a672481c77a42b380480094d446a6

const TempScreen = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=963a672481c77a42b380480094d446a6`;

    const searchLocation = () => {
        setIsLoading(true);
        
        if (!location.trim()) {
            setError('Por favor, digite o nome da cidade.');
            setShowError(true); 
            setIsLoading(false); 
            return;
        }
    
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    setError('Cidade não encontrada. Verifique o nome e tente novamente.');
                    setData({});
                    setShowError(true); 
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    setData(data);
                    setError(null); 
                    setShowError(false); 
                    console.log(data);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Erro na busca:', error);
                setError('Ocorreu um erro na busca. Tente novamente mais tarde.');
                setData({});
                setShowError(true);
                setIsLoading(false);
            });
    
        setLocation('');
    };

    const handleTextInputChange = (text) => {
        setLocation(text);
    };

    const handleSearchButtonPress = () => {
        searchLocation();
    };

    const convertToCelsius = (kelvin) => {
        return kelvin - 273.15;
    };
    
    const feelsLikeTemperature = data.main ? convertToCelsius(data.main.feels_like) : null;
    const actualTemperature = data.main ? convertToCelsius(data.main.temp) : null;
    const displayFeelsLikeTemperature = feelsLikeTemperature && feelsLikeTemperature >= actualTemperature ? feelsLikeTemperature : actualTemperature;


    const getWeatherIconName = (iconCode) => {
        switch (iconCode) {
            case "01d":
                return "sun";
            case "01n":
                return "moon"; 
            case "02d":
            case "03d":
            case "04d":
                return "cloud";
            case "02n":
            case "03n":
            case "04n":
                return "cloud";
            case "09d":
            case "10d":
                return "cloud-drizzle"; 
            case "09n":
            case "10n":
                return "cloud-drizzle";
            case "11d":
                return "cloud-lightning"; 
            case "11n":
                return "cloud-lightning"; 
            case "13d":
                return "cloud-snow"; 
            case "13n":
                return "cloudy-snow"; 
            case "50d":
                return "align-center"; 
            case "50n":
                return "align-center"; 
            default:
                return "question-circle"; 
        }
    };

    const translateWeatherMain = (main) => {
        switch (main) {
          case "Clear":
            return "Limpo";
          case "Clouds":
            return "Nuvens";
          case "Drizzle":
            return "Chuvisco";
          case "Rain":
            return "Chuva";
          case "Thunderstorm":
            return "Trovoadas";
          case "Snow":
            return "Neve";
          case "Mist":
            return "Neblina";
          default:
            return main;
        }
    };
    
    const maxTemperature = data.main ? convertToCelsius(data.main.temp_max) : null;
    const minTemperature = data.main ? convertToCelsius(data.main.temp_min) : null;

    return (
        <TabContainer>
            <MainHeader list={PLACES}></MainHeader>
            <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={60} color='#3a74b0' />
                </View>
            )}
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>
                            Confira o Clima de uma Cidade{" "}
                        </Text>
                        <View style={styles.iconeWrapper}>
                            <Ionicons name="ios-earth-sharp" size={26} color="black" style={styles.iconeMundo} />
                        </View>
                    </View>
                    <View style={styles.formInputContainer}>
                        <TextInput 
                            placeholder="Digite o nome da cidade" 
                            clearButtonMode="always" 
                            value={location}
                            onChangeText={handleTextInputChange}
                            onSubmitEditing={handleSearchButtonPress}
                            style={styles.inputSearch}></TextInput>
                            <View style={styles.iconSearch} pointerEvents="none">
                                <Feather name="search" size={20} color="black" />
                            </View>
                    </View>
                </View>
                <View>
                    {showError && ( // Exibir a mensagem de erro apenas se showError for verdadeiro
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                    )}
                    <View style={styles.location}>
                        <View style={styles.locationRow}>
                        {data.name && data.sys && (
                            <>
                            <Ionicons name="location" size={24} color="black" />
                            <Text style={styles.nameCity}>
                                {data.name} - {data.sys.country}
                            </Text>
                            </>
                        )}
                        </View>
                    </View>
                    <View style={styles.tempContainer}>
                    {data.main ? (
                        <Text style={styles.temp}>
                            {(data.main.temp - 273.15).toFixed(0)}°C
                        </Text>
                        ) : null
                    }
                    </View>
                    <View>
                        <View style={styles.description}>
                            {data.weather ? (
                                <View style={styles.weatherInfoContainer}>
                                    <Feather
                                        name={getWeatherIconName(data.weather[0].icon)}
                                        size={23}
                                        color="black"
                                    />
                                    <Text style={styles.weatherText}>
                                        {translateWeatherMain(data.weather[0].main)}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
                {data.name != undefined && data.main ? (
                    <View style={styles.maxMinItem}>
                        <Text style={styles.maxMinText}>Temperatura: </Text>
                        <Text style={styles.maxMinTemp}>
                        <FontAwesome5 name="temperature-high" size={22} color="black" /> Máxima: {maxTemperature ? maxTemperature.toFixed(0) : 'N/A'}°C 
                        {" "} | {" "}
                        <FontAwesome5 name="temperature-low" size={22} color="black" /> Mínima: {minTemperature ? minTemperature.toFixed(0) : 'N/A'}°C
                        </Text>
                    </View>
                ) : null}
                {data.name != undefined &&
                    <View style={styles.bottom}>
                        <View style={styles.bottomItem}>
                            {displayFeelsLikeTemperature ? <Text style={[styles.feels]}>{displayFeelsLikeTemperature.toFixed(0)}°C <MaterialCommunityIcons name="motion-sensor" size={21} color="white" /></Text> : null}
                            <Text style={styles.bottomLabel}>Sensação</Text>
                        </View>
                        <View style={styles.bottomItem}>
                            {data.main ? <Text style={styles.humidity}>{data.main.humidity}% <Ionicons name="water" size={21} color="white" /></Text> : null}
                            <Text style={styles.bottomLabel}>Umidade no Ar</Text>
                        </View>
                        <View style={styles.bottomItem}>
                            {data.wind ? <Text style={styles.wind}>{data.wind.speed}MPH <Entypo name="air" size={21} color="white" /></Text> : null}
                            <Text style={styles.bottomLabel}>Velocidade do Vento</Text>
                        </View>
                    </View>
                }
            </View> 
            </SafeAreaView>
        </TabContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: spacing.l,
        paddingBottom: spacing.l / 1.5,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999, 
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 17,
        fontWeight: 500,
        marginBottom: 18,
        textAlign: 'center',
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconeWrapper: {
        marginBottom: 16,
    },
    formInputContainer: {
        flexDirection: "row",
    },
    inputSearch: {
        backgroundColor: '#fff',
        paddingLeft: spacing.m,
        paddingRight: spacing.m,
        paddingVertical: spacing.m,
        borderRadius: 8,
        height: 54,
        flex: 1,
        ...shadow.light,
        borderColor: '#ccc',
        borderWidth: 0.3,
    },
    iconSearch: {
        position: 'absolute',
        top: 17,
        right: 15,
        zIndex: 1,
    },
    location: {
        alignItems: 'center',
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 50,
    },
    nameCity: {
        fontSize: 19,
        marginLeft: 5,
    },
    maxMinText: {
        fontSize: 19,
        marginLeft: 5,
        fontWeight: 400,
        marginBottom: 3,
    },
    tempContainer: {
        alignItems: 'center',
    },
    temp: {
        fontSize: 55,
        fontWeight: 'bold',
    },
    description: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    weatherInfoContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: -10, 
    },
    weatherText: {
        fontSize: 20, 
        fontWeight: 500,
        marginLeft: 10,
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        textAlign: 'center',
        width: '100%',
        padding: 18,
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        marginTop: 20,
    },
    bottomItem: {
        alignItems: "center",
        marginHorizontal: 35,
    },
    maxMinItem: {
        alignItems: "center",
        marginHorizontal: 35,
        marginBottom: 50,
    },
    feels: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 8,
    },
    humidity: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    wind: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    bottomLabel: {
        fontSize: 14,
        color: "#fff",
    },
    maxMinTemp: {
        fontSize: 17,
        fontWeight: 500,
        color: "#000",
    },
    errorContainer: {
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        padding: 8,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    errorText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
  });

export default TempScreen;