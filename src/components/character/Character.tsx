import {
    Image,
    ImageSourcePropType,
    StyleSheet,
} from 'react-native';

interface CharacterProps {
  source: ImageSourcePropType;
  size?: number;
}

export const Character = ({
  source,
  size = 220,
}: CharacterProps) => {
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[
        styles.character,
        {
          width: size,
          height: size,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  character: {
    alignSelf: 'center',
  },
});