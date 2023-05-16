import React, {useEffect, useState, useContext} from 'react';
import {Container, TextInput} from './styles';
import {Alert, ToastAndroid} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import DeleteButton from '../../components/DeleteButton';
import {PersonagensContext} from '../../context/PersonagemProvider';

const Personagem = ({navigation}: {navigation: any}, {route}: {route: any}) => {
  const [Nome, setNome] = useState('');
  const [Classe, setClasse] = useState('');
  const [Subclasse, setSubclasse] = useState('');
  const [Nível, setNível] = useState('');
  const [uid, setUid] = useState('');
  const {save, del} = useContext(PersonagensContext);
  console.log(Nome, Classe, Subclasse, Nível);

  useEffect(() => {
    if (route.params.value) {
      setNome(route.params.value.Nome);
      setClasse(route.params.value.Classe);
      setSubclasse(route.params.value.Subclasse);
      setNível(route.params.value.Nível);
      setUid(route.params.value.uid);
    }
  }, [route]);

  const salvar = async () => {
    if (
      await save({
        personagem: {
          uid,
          Nome,
          Classe,
          Subclasse,
          Nível,
        },
      })
    ) {
      ToastAndroid.show('Show! Você salvou com sucesso.', ToastAndroid.LONG);
      navigation.navigate('Personagens');
    } else {
      ToastAndroid.show('Ops!Deu problema ao salvar.', ToastAndroid.LONG);
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Opa! Fique esperto.',
      'Você tem certeza que deseja excluir o aluno?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            if (await del({uid})) {
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
        placeholder="Classe"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setClasse(t)}
        value={Classe}
      />
      <TextInput
        placeholder="Subclasse"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setSubclasse(t)}
        value={Subclasse}
      />
      <TextInput
        placeholder="Nível"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNível(t)}
        value={Nível}
      />
      <PrimaryButton
        text="Salvar"
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

export default Personagem;
