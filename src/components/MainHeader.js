import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, SafeAreaView, Animated, Easing, Linking, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import { Feather } from '@expo/vector-icons'; 
import { shadow, sizes, spacing } from "../constants/theme";
import { Ionicons } from '@expo/vector-icons'; 

const MainHeader = ({ list }) => {
    const insets = useSafeAreaInsets();
    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;
    const options = [
        {
            title: 'Pesquisa',
            link: 'https://www.embrapa.br/pesquisa',
        },
        {
            title: 'Ações e campanhas',
            link: 'https://www.embrapa.br/acoes-e-campanhas',
        },
        {
            title: 'Sobre a Embrapa',
            link: 'https://www.embrapa.br/sobre-a-embrapa',
        },
        {
            title: 'Agência Embrapa de Informação Tecnológica - Ageitec',
            link: 'https://www.embrapa.br/agencia-de-informacao-tecnologica/inicial',
        },
        {
            title: 'Atuação internacional',
            link: 'https://www.embrapa.br/atuacao-internacional',
        },
        {
            title: 'Missão, visão e valores',
            link: 'https://www.embrapa.br/missao-visao-e-valores',
        },
        {
            title: 'Fale conosco',
            link: 'https://www.embrapa.br/fale-conosco',
        },
        {
            title: 'Unidades - Embrapa no Brasil',
            link: 'https://www.embrapa.br/embrapa-no-brasil',
        },
    ];

    function resizeBox(to){
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: false,
            duration: 200,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }

    function handleOptionPress(url) {
        Linking.openURL(url)
          .catch((err) => console.error('Erro ao abrir o link: ', err));
    }

    return (
        <View style={[styles.container, {marginTop: insets.top}]}>
            <TouchableOpacity onPress={() => resizeBox(1)}>
                <Feather name="menu" size={26} color="black" />
                    <Modal transparent visible={visible} style={styles.touchableLayer}>
                        <SafeAreaView style={{flex: 1}} onTouchStart={() => resizeBox(0)}>
                            <Animated.View style={[styles.popup, { opacity: scale, width: '100%', alignSelf: 'center' }]}>
                                {options.map((op, i) => (
                                <TouchableOpacity
                                    style={[styles.option, { borderBottomWidth: i === options.length - 1 ? 0 : 1 }]}
                                    key={i} onPress={() => handleOptionPress(op.link)}>
                                    <Text style={{fontSize: 16}}>{op.title}</Text>
                                </TouchableOpacity>
                                ))}
                            </Animated.View>
                        </SafeAreaView>
                    </Modal>
            </TouchableOpacity>
            {list.map((item) => (
                <Image
                key={item.id}
                source={item.image}
                style={styles.image}
                accessibilityLabel="Logo Embrapa"
                />
            ))}
            <Ionicons name="ios-notifications-outline" size={25} color="black" onPress={() => {}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.l,
        height: 60,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        ...shadow.light,
    },
    image: {
        width: 160,
        height: 35,
        resizeMode: 'stretch',
    },
    popup: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 10,
        position: 'absolute',
        top: 48,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomColor: '#ccc',
    },
    touchableLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
});

export default MainHeader;
