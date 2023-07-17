import { Text } from 'react-native'
import { useTheme } from 'dopenative'
import { StyleSheet } from 'react-native'

export default function ScribbledText({children, style}) {
    const { theme, appearance } = useTheme()
    const colorSet = theme.colors[appearance]
    
    let baseStyle = styles.medium;

    (Array.isArray(style) ? style : [style]).forEach((style) => {
        if (style && style.fontWeight) {
          baseStyle = style.fontWeight === 'bold' ? styles.bold : styles.medium;
        }
      });

    return (
        <Text style={[style, {fontFamily: baseStyle.fontFamily, fontWeight: 'normal', color: colorSet.primaryText}]}>{children}</Text>
    );
  }

  const styles = StyleSheet.create({
    bold: {
      fontFamily: 'Segoe_bold',
    },
    medium: {
      fontFamily: 'Segoe',
    },
  });