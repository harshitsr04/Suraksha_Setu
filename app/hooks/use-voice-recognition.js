import { useState, useEffect } from "react";
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';

export const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [triggerDetected, setTriggerDetected] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Initialize voice recognition handlers
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (event) => {
      setResults(event.value);
      // Check for the specific command "sanket go"
      if (event.value && !isProcessing) {
        const command = event.value[0]?.toLowerCase() || '';
        if (command.includes('sanket go')) {
          setIsProcessing(true);
          // Add 2-second delay before triggering
          setTimeout(() => {
            setTriggerDetected(true);
            setIsProcessing(false);
          }, 2000);
        }
      }
    };
    Voice.onSpeechError = (event) => {
      setError(event.error);
      setIsListening(false);
    };

    // Cleanup
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [isProcessing]);

  const startListening = async () => {
    try {
      setTriggerDetected(false);
      await Voice.start('en-US');
      setError(null);
    } catch (e) {
      setError(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      setError(e);
    }
  };

  const speak = async (text) => {
    try {
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1,
        rate: 1,
      });
    } catch (e) {
      setError(e);
    }
  };

  return {
    isListening,
    triggerDetected,
    setTriggerDetected,
    results,
    error,
    startListening,
    stopListening,
    speak,
  };
};