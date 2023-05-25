/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState, useContext} from 'react';
import {Container, TextInput} from './styles';
import {Alert, ToastAndroid} from 'react-native';
import DeleteButton from '../../components/DeleteButton';
import {GrimorioContext} from '../../context/GrimorioProvider';
import SaveButton from '../../components/SaveButton';

interface MagiaProps {
  route: any;
  navigation: any;
}

const Magia: React.FC<MagiaProps> = ({route, navigation}) => {
  const [Nome, setNome] = useState('');
  const [Escola, setEscola] = useState('');
  const [Nivel, setNivel] = useState('');
  const [uid, setUid] = useState('');
  const {saveMagic, deleteMagic} = useContext(GrimorioContext);

  useEffect(() => {
    if (route.params?.value) {
      const {Nome, Escola, Nivel, uid} = route.params.value;
      setNome(Nome);
      setEscola(Escola);
      setNivel(Nivel);
      setUid(uid);
    }
  }, [route]);

  const salvar = async () => {
    if (await saveMagic({uid, Nome, Escola, Nivel})) {
      ToastAndroid.show('Show! Você salvou com sucesso.', ToastAndroid.LONG);
      navigation.navigate('Grimorio');
    } else {
      ToastAndroid.show('Ops! Deu problema ao salvar.', ToastAndroid.LONG);
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Opa! Fique esperto.',
      'Você tem certeza que deseja excluir a Magia?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            if (await deleteMagic(uid)) {
              ToastAndroid.show(
                'Ordem dada é ordem cumprida',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Deu problema ao excluir.', ToastAndroid.SHORT);
            }
            navigation.navigate('Personagens');
          },
        },
      ],
    );
  };

  return (
    <Container>
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={Nome}
      />
      <TextInput
        placeholder="Escola"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEscola(t)}
        value={Escola}
      />
      <TextInput
        placeholder="Nivel"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNivel(t)}
        value={Nivel}
      />
      <SaveButton
        texto="Salvar"
        onClick={() => {
          salvar();
        }}
      />
      {uid && (
        <DeleteButton
          texto="Excluir"
          onClick={() => {
            excluir();
          }}
        />
      )}
    </Container>
  );
};

export default Magia;
