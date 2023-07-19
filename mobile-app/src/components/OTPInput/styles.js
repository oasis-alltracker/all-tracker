import {StyleSheet, Platform} from 'react-native';
import { registration } from '../../AppStyles';

export const CELL_SIZE = 70;
export const CELL_BORDER_RADIUS = 20;
export const DEFAULT_CELL_BG_COLOR = '#FFD8FF';
export const NOT_EMPTY_CELL_BG_COLOR = '#FFD8FF';
export const ACTIVE_CELL_BG_COLOR = '#FFD8FF';

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    borderWidth: 1,
    borderColor: 'silver',
    backgroundColor: colorSet.secondaryForeground,
    

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
});
}

export default dynamicStyles