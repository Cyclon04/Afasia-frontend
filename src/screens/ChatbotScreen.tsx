import { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { ChatMessageBubble } from '../components/chat/ChatMessageBubble';
import { BottomBar } from '../components/layout/BottomBar';
import { AppText } from '../components/ui/AppText';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../navigation/routes';
import { RADIUS, SPACING } from '../styles/theme';

interface ChatMessage {
  id: number;
  role: 'assistant' | 'user';
  text: string;
}

const FAQS = [
  {
    question: '¿Cómo puedo acompañar la comunicación de mi hijo?',
    answer:
      'Dale tiempo para responder, escucha con atención y celebra cada intento de comunicación. Puedes repetir sus palabras y ampliar la idea con una frase sencilla.',
    keywords: ['comunicacion', 'hablar', 'expresar', 'acompanar'],
  },
  {
    question: '¿Qué actividades puedo hacer en casa?',
    answer:
      'Prueben juegos por turnos, buscar objetos por color, leer un cuento juntos o describir lo que hacen durante una rutina. Mantén la actividad breve y divertida.',
    keywords: ['actividades', 'casa', 'juegos', 'jugar'],
  },
  {
    question: '¿Cómo entiendo el progreso de mi hijo?',
    answer:
      'Observa qué actividades disfruta y cuáles puede realizar con menos ayuda. El progreso puede ser gradual; revisa sus logros con frecuencia y coméntalos con su especialista.',
    keywords: ['progreso', 'avance', 'logros', 'resultados'],
  },
  {
    question: '¿Cuánto tiempo debería usar la aplicación?',
    answer:
      'Es mejor hacer sesiones cortas y regulares, adaptadas a la atención y energía de tu hijo. Haz una pausa si pierde interés y sigue las recomendaciones de su especialista.',
    keywords: ['tiempo', 'duracion', 'sesiones', 'frecuencia'],
  },
  {
    question: '¿Qué hago si se frustra durante una actividad?',
    answer:
      'Haz una pausa tranquila, reconoce cómo se siente y ofrece una opción más sencilla o un descanso. No es necesario terminar la actividad si necesita parar.',
    keywords: ['frustra', 'frustracion', 'enoja', 'dificil', 'pausa'],
  },
  {
    question: '¿Para qué sirven los premios?',
    answer:
      'Los premios ayudan a reconocer el esfuerzo. Acompáñalos con elogios específicos, como “te esforzaste mucho”, para que el foco también esté en el proceso.',
    keywords: ['premios', 'recompensas', 'monedas', 'recompensa'],
  },
  {
    question: '¿Qué puedo hacer en el modo de juegos?',
    answer:
      'En los juegos, anima a tu hijo a mirar, elegir y probar. Puedes jugar a su lado y ayudarle con pistas pequeñas, sin presionarlo para responder rápido.',
    keywords: ['modo', 'juego', 'juegos', 'actividad'],
  },
  {
    question: '¿Cómo puedo participar como familia?',
    answer:
      'Pueden turnarse para acompañar las actividades y compartir qué estrategias funcionan mejor. La constancia y un ambiente amable ayudan a que aprender sea una experiencia positiva.',
    keywords: ['familia', 'participar', 'padres', 'acompanar'],
  },
  {
    question: '¿Qué hago si mi hijo no quiere responder?',
    answer:
      'Dale tiempo y evita insistir. Puedes modelar una respuesta, ofrecer dos opciones sencillas o volver a intentarlo más tarde; también está bien simplemente observar.',
    keywords: ['responder', 'no quiere', 'silencio', 'contestar'],
  },
  {
    question: '¿Este chatbot reemplaza a un especialista?',
    answer:
      'No. Este asistente ofrece orientación general automatizada y no sustituye la evaluación ni las recomendaciones de un profesional que conozca a tu hijo.',
    keywords: ['especialista', 'profesional', 'diagnostico', 'terapia'],
  },
] as const;

function normalize(text: string) {
  return text
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function findAnswer(question: string) {
  const normalizedQuestion = normalize(question);
  const match = FAQS.find(
    (faq) =>
      normalize(faq.question) === normalizedQuestion ||
      faq.keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );

  return (
    match?.answer ??
    'Puedo orientarte sobre comunicación, actividades en casa, progreso, sesiones, frustración, premios y juegos. Elige una pregunta frecuente para que te cuente más.'
  );
}

export default function ChatbotScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const scrollRef = useRef<ScrollView>(null);
  const nextId = useRef(1);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: 'assistant',
      text: '¡Hola! Soy tu asistente de apoyo para familias. ¿Qué te gustaría saber?',
    },
  ]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendQuestion = (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: 'user',
      text: trimmedQuestion,
    };
    const assistantMessage: ChatMessage = {
      id: nextId.current++,
      role: 'assistant',
      text: findAnswer(trimmedQuestion),
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Volver al inicio de padres"
            onPress={() => router.replace(ROUTES.PARENTS_HOME)}
            style={styles.backButton}
          >
            <AppText size={22} bold color={colors.primaryDark}>‹</AppText>
          </Pressable>
          <View style={styles.headerCopy}>
            <AppText size={18} bold color={colors.text}>Asistente para familias</AppText>
            <AppText size={12} color={colors.textMuted}>Respuestas automatizadas</AppText>
          </View>
          <View style={styles.statusDot} />
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.messages}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              role={message.role}
              text={message.text}
            />
          ))}
          {messages.length === 1 && (
            <View style={styles.suggestionsSection}>
              <AppText size={13} bold color={colors.textMuted}>
                PREGUNTAS FRECUENTES
              </AppText>
              <View style={styles.suggestions}>
                {FAQS.map((faq) => (
                  <Pressable
                    key={faq.question}
                    onPress={() => sendQuestion(faq.question)}
                    style={({ pressed }) => [
                      styles.suggestion,
                      pressed && styles.suggestionPressed,
                    ]}
                  >
                    <AppText size={13} color={colors.primaryDark}>
                      {faq.question}
                    </AppText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="Escribe tu pregunta"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendQuestion(input)}
            placeholder="Escribe tu pregunta..."
            placeholderTextColor={colors.textMuted}
            returnKeyType="send"
            style={styles.input}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Enviar pregunta"
            disabled={!input.trim()}
            onPress={() => sendQuestion(input)}
            style={({ pressed }) => [
              styles.sendButton,
              !input.trim() && styles.sendDisabled,
              pressed && input.trim() && styles.sendPressed,
            ]}
          >
            <AppText size={18} bold color={colors.textInverse}>↑</AppText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <BottomBar mode="parents" activeRoute={ROUTES.CHATBOT} />
    </SafeAreaView>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      minHeight: 68,
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
      paddingHorizontal: SPACING.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    backButton: {
      width: 38,
      height: 38,
      borderRadius: RADIUS.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryLight,
    },
    headerCopy: {
      flex: 1,
      gap: 2,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: RADIUS.pill,
      backgroundColor: colors.success,
    },
    scroll: {
      flex: 1,
    },
    messages: {
      flexGrow: 1,
      padding: SPACING.md,
      paddingBottom: SPACING.lg,
    },
    suggestionsSection: {
      gap: SPACING.sm,
      marginTop: SPACING.md,
    },
    suggestions: {
      gap: SPACING.xs,
    },
    suggestion: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: RADIUS.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    suggestionPressed: {
      backgroundColor: colors.primaryLight,
    },
    composer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
      padding: SPACING.sm,
      marginHorizontal: SPACING.md,
      marginBottom: SPACING.sm,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: RADIUS.pill,
      backgroundColor: colors.surface,
    },
    input: {
      flex: 1,
      minHeight: 42,
      paddingHorizontal: SPACING.sm,
      color: colors.text,
      fontSize: 15,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: RADIUS.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryDark,
    },
    sendDisabled: {
      opacity: 0.45,
    },
    sendPressed: {
      transform: [{ scale: 0.92 }],
    },
  });
