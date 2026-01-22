import { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from '../../src/components/GiftedChat/GiftedChat';

import fakeMessages from '../../src/components/GiftedChat/fakeMessages.json';

export default function App() {
  const [messages, setMessages] = useState<any>(fakeMessages);

  const onSend = useCallback((messages: any) => {
    console.log('messages', messages);

    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <GiftedChat
          isKeyboardInternallyHandled={false}
          messages={messages}
          onSend={(messages: any) => onSend(messages)}
          user={{
            _id: 3,
          }}
          alwaysShowSend
          onFocusInput={() => {
            console.log('focus input');
          }}
          onBlurInput={() => {
            console.log('blur input');
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentView: {
    flex: 1,
    padding: 16,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});
