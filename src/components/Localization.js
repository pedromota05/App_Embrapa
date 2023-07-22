import React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableHighlight, Linking } from "react-native";
import Sombra from "../../assets/images/sombra.png";

export const Localization = () => {
  const handleSACPress = () => {
    Linking.openURL("https://www.embrapa.br/fale-conosco");
  };

  const handleAcessoRestritoPress = () => {
    Linking.openURL("https://www.embrapa.br/group/intranet/agropecuaria-oeste");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Sombra} style={styles.footerTop}>
        <View style={styles.rodapeUnidadeConteudo}>
          <View style={styles.rodapeUnidadeColuna1}>
            <Text key="tituloEsquerda" style={styles.tituloEsquerda}>Embrapa Agropecuária Oeste</Text>
          </View>
          <View style={styles.rodapeUnidadeColuna2}>
            <View style={styles.conteudoDireita}>
              <Text style={styles.textoCentro}>
                Rodovia BR 163, Km 253,6, Caixa Postal 449, CEP: 79804-970, Dourados, MS
                Fone: + 55 (67) 3416-9700 |
                <TouchableHighlight onPress={handleSACPress}>
                  <Text style={styles.link}> SAC</Text>
                </TouchableHighlight>
              </Text>
              <Text style={styles.textoCentro}>
                <TouchableHighlight onPress={handleAcessoRestritoPress} style={styles.acessoContainer}>
                  <Text style={styles.acesso}>Acesso restrito</Text>
                </TouchableHighlight>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    justifyContent: 'center',
  },
  footerTop: {
    width: '100%',
    minHeight: 25,
    resizeMode: 'cover',
    color: '#ccc',
  },
  rodapeUnidadeColuna1: {
    marginVertical: 10,
  },
  tituloEsquerda: {
    marginVertical: 10,
    fontSize: 24.5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  conteudoDireita: {
    lineHeight: 18,
    marginBottom: 80,
  },
  acessoContainer: {
    alignSelf: 'center',
  },
  link: {
    color: '#6ca7e7',
  },
  acesso: {
    color: '#6ca7e7',
  },
  textoCentro: {
    textAlign: 'center',
  },
});

export default Localization;
