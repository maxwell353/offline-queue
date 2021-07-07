import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import { Container, Input, SubmitButton, SubmitButtonText } from './styles';
import Queue from './utils/Queue';
import Api from './services/api';

const queue = new Queue();

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected as boolean);
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    if(!queue.isEmpty() && isConnected) {
      const offlineData = queue.getQueue();

      console.log('OFFLINE DATA: ', offlineData);

      if (Array.isArray(offlineData)) {
        offlineData.forEach((data) => {
          Api.save(data);
          queue.dequeue();
        });
      }
    }
  }, [isConnected]);

  const handleSubmit = useCallback(() => {
    const body = {
      name,
      email,
    };

    if (!isConnected) {
      queue.enqueue(body);

      console.log('Foi adicionado a fila');

      setName('');
      setEmail('');

      return;
    }

    Api.save(body);

    setName('');
    setEmail('');
  }, [name, email, isConnected]);

  const status = useMemo(() => isConnected ? 'Conectado' : 'Desconectado', [isConnected]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 16}}> Status: {status} </Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#6b6b6b"
        />
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#6b6b6b"
        />

        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Salvar</SubmitButtonText>
        </SubmitButton>
      </Container>
    </SafeAreaView>
  );
};

export default App;
