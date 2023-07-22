import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Linking } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 

const Cards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    EmbrapaApi();
  }, []);

  const EmbrapaApi = async () => {
    const url = 'https://apirestembrapa--pedromota05.repl.co/api/services';
    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        const responseData = json; // Remova o .data, pois a resposta já é um array de objetos
        console.log('API response:', responseData);
        setData(responseData);
      } else {
        throw new Error('Falha na requisição. Código de status: ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonPress = () => {
    const url = 'https://www.embrapa.br/agropecuaria-oeste';
    Linking.openURL(url).catch((error) => console.error('Não foi possível abrir a URL:', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
        {data && data.length > 0 ? (
            data.map((item) => (
          <Card key={item._id} style={{borderColor: '#ccc'}}>
            <Card.Image
              style={{ padding: 0 }}
              source={{ uri: item.image }}
            />
            <Text style={{marginBottom: 10, fontSize: 13, fontWeight: 'bold', color: '#888', marginTop: 8}}>
              {item.date}
            </Text>
            <Card.Title style={{fontSize: 16, fontWeight: 700, color: '#3a74b0'}}>{item.title}</Card.Title>
            <View style={[styles.buttonContainer, { flexDirection: 'row-reverse' }]}>
                  <Button
                    title="Saiba Mais"
                    href="https://www.embrapa.br/agropecuaria-oeste"
                    icon={
                      <AntDesign
                        name="arrowright"
                        size={24}
                        color="#ffffff"
                        style={{ marginLeft: 10 }}
                      />
                    }
                    buttonStyle={{ backgroundColor: '#3a74b0', borderColor: '#3a74b0' }}
                    iconRight
                    onPress={handleButtonPress}
                  />
                </View>
          </Card>
          ))
          ) : (
            <Text style={styles.loadingText}>Carregando dados...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  buttonMore: {
    color: '#fff',
    fontSize: 10,
    borderRadius: 4,
    marginTop: 30,
  },
  buttonContainer:{
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 10,
  },
});

export default Cards;