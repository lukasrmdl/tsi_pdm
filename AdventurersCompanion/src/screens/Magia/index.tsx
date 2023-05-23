import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Container, TextInput} from './styles';
import PrimaryButton from '../../components/PrimaryButton';
import DeleteButton from '../../components/DeleteButton';
import {GrimorioContext} from '../../context/GrimorioProvider';

interface Magic {
  uid: string;
  Escola: string;
  Nivel: string;
  Nome: string;
}

interface Props {
  route: any;
  navigation: any;
}

const Magia: React.FC<Props> = ({route, navigation}) => {
  const [escola, setEscola] = useState('');
  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState('');
  const [uid, setUid] = useState('');
  const {saveMagic, updateMagic, deleteMagic} = useContext(GrimorioContext);

  useEffect(() => {
    if (route.params.magic) {
      setEscola(route.params.magic.Escola);
      setNome(route.params.magic.Nome);
      setNivel(route.params.magic.Nivel);
      setUid(route.params.magic.uid);
    }
  }, [route]);

  const salvar = async () => {
    if (escola && nome && nivel) {
      let magic: Magic = {
        uid: uid,
        Escola: escola,
        Nome: nome,
        Nivel: nivel,
      };

      if (uid) {
        if (await updateMagic(magic)) {
          ToastAndroid.show(
            'Show! Você alterou com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      } else {
        if (await saveMagic(magic)) {
          ToastAndroid.show(
            'Show! Você incluiu com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao incluir.', ToastAndroid.LONG);
        }
      }

      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir a magia?',
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
                'Show! Você excluiu com sucesso.',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Ops! Erro ao excluir.', ToastAndroid.LONG);
            }
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <Container>
      <TextInput
        placeholder="Escola da Magia"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setEscola(t)}
        value={escola}
      />
      <TextInput
        placeholder="Nome da Magia"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Nível da Magia"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNivel(t)}
        value={nivel}
      />
      <PrimaryButton text="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
    </Container>
  );
};

export default Magia;
