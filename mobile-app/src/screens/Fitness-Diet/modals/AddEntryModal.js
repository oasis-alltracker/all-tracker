import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    useWindowDimensions
} from "react-native";
import RNModal from "react-native-modal";

export default function AddEntryModal({
isVisible,
setVisible
}) {
    const { width, height} = useWindowDimensions();
    return (
        <RNModal
            isVisible={isVisible}
            onBackButtonPress={() => setVisible(false)}
            onBackdropPress={() => setVisible(false)}
            backdropOpacity={0}
            backdropColor="rgba(215, 246, 255, 0.27)"
            style={
                {
                    height: 100,
                    width: "50%",
                    backgroundColor: "white",
                    alignSelf: "center",
                    alignContent: "center"
                }
            }
        >
            <Text>Test123 :D :D :D </Text>

        </RNModal>


    );

}