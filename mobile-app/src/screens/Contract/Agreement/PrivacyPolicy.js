import {
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Header } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValueSheet } from "../../../ValueSheet";

const PrivacyPolicy = () => {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Header showCenter={false} />
      <ScrollView style={[styles.tcContainer, { height: height * 0.7 }]}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          "We" (publishers of who whom you downloaded this application from)
          take your privacy seriously. We have created this Privacy Policy to
          explain our policies and procedures for collecting, using, and
          disclosing your information.{" "}
        </Text>
        <Text style={styles.text}>
          We provide information about our app on our website (“Site”) Users can
          access the app through our mobile device and tablet
          application(“App”). In this Privacy Policy, the Site, the App, and our
          related services are referred to collectively as the “Service” or
          “Services.” This Privacy Policy governs your access of the Services,
          regardless of how you access them, and by using our Services you
          consent to the transfer, processing, storage and other uses described
          in this Privacy Policy. All of the different forms of data, content,
          and information described below are collectively referred to as
          “information” or “data”.
        </Text>

        <Text style={styles.header}>1. OUR COMMITMENT</Text>
        <Text style={styles.text}>
          We prioritize your privacy and the confidentiality of your data. As a
          personal journal and diary, we understand the importance of keeping
          your entries private and secure.
        </Text>
        <Text style={styles.text}>
          1.1 Confidential Treatment of Your Data - All data you enter into the
          App is treated as strictly confidential. We do not access, review, or
          share your data under any circumstances, including for troubleshooting
          or service-related issues. Even in the event of broken functionality
          or system errors where access to user data could assist in resolving
          the issue, we will not access your personal entries.
        </Text>
        <Text style={styles.text}>
          1.2 Privacy in Service Improvements - Your data may be used to enhance
          your experience within the App, but it will never be linked to you in
          any way when utilized for analytics or AI-driven improvements. Any
          data used for these purposes will be anonymized and processed in
          aggregate to ensure individual privacy. We are committed to
          maintaining strict safeguards that prevent personal data from being
          tied to any improvements or third-party systems.
        </Text>
        <Text style={styles.text}>
          1.3 Third-Party Services and Data Protection - We may use third-party
          services to improve the App, such as analytics or AI-driven
          enhancements. However: (a)Your personal data is never shared with
          third-party services. (b)Any data used to improve our services remains
          fully anonymized and unlinked to your account. (c)Third-party services
          we utilize do not have access to the data used for algorithm training,
          ensuring your personal information remains private.
        </Text>
        <Text style={styles.text}>
          1.4 Government Requests & Backdoors - We do not build backdoors or
          provide any means for unauthorized access to your data. If we receive
          a request from any government or authority to provide user data or
          implement access mechanisms, we will not comply. Instead, upon receipt
          of such a request, we will take immediate action to protect our users
          by wiping all user data from our systems, regardless of whether a
          specific user’s data was requested. Your privacy is our highest
          priority, and we will not compromise on this principle.
        </Text>
        <Text style={styles.text}>
          By using the App, you can trust that your journal remains a private
          space for you. We are committed to upholding the highest standards of
          confidentiality and security.
        </Text>

        <Text style={styles.header}>
          2. THE INFORMATION WE COLLECT AND STORE
        </Text>
        <Text style={styles.text}>
          We may collect and store the following information when you access the
          Services:
        </Text>
        <Text style={styles.text}>
          Information you provide. When you register an account, contact us with
          inquiries, or otherwise communicate with us (including through social
          media), we collect some personal information such as your name and
          contact information such as your e-mail address. You may also ask us
          to import your contacts by giving us access to your third party
          services (for example, your Google account, or Facebook), access your
          location using global positioning technology, and to use your social
          networking information if you give us access to your account on social
          network connection services and contacts. If provided, you will be
          able to turn off these features through your App, or settings menu on
          your device.{" "}
        </Text>
        <Text style={styles.text}>
          Additionally, we store personal (private) data that you input when you
          use the App. The personal data saved may vary based on what you choose
          to input, but it will generally include your year of birth, height,
          weight, age, gender, mood, sleep patterns, dream journal entries,
          habits, to-dos, workouts, dietary choices, and other information you
          regard relevant to your self improvement journey. Information you
          provide may also include payment and transaction information when you
          make purchases through the Services, such as transaction history.
        </Text>
        <Text style={styles.text}>
          Cookies. We do not utilize cookies. When you login, we will store a
          private authentication token or “key” on your device in a secure
          manner so that you do not have to login every time you access the App.
        </Text>

        <Text style={styles.header}>3. HOW WE USE PERSONAL INFORMATION</Text>
        <Text style={styles.text}>
          Personal Information: In the course of using the Services, we may
          collect personal information that can be used to contact or identify
          you (“Personal Information”). Personal Information is or may be used:
          (i) to provide and improve our Services, (ii) to administer your use
          of the Services, (iii) to better understand your needs and interests,
          (iv) to personalize and improve your experience, and (v) to provide or
          offer software updates and product announcements. If you no longer
          wish to receive communications from us, please follow the
          “unsubscribe” instructions provided in any of those communications, or
          update your account information.
        </Text>

        <Text style={styles.header}>4. INFORMATION SHARING AND DISCLOSURE</Text>
        <Text style={styles.text}>
          Service Providers, Business Partners and Others. We may use certain
          trusted third-party companies and individuals to help us provide,
          analyze, and improve the Service. These third parties may have access
          to specific pieces of your personal information (such as height,
          weight, gender, etc.) only for purposes of performing these tasks on
          our behalf and under the obligations outlined in section 1, and in a
          manner that will not be linked personally to you.
        </Text>

        <Text style={styles.text}>
          Below is a list of third-party applications we use in our App:
        </Text>
        <Text style={styles.text}>Edamam - Food and Grocery Database API</Text>
        <Text style={styles.text}>
          Food and Grocery Database API is a database that helps us provide you
          with nutritional information for the foods you eat. Your data is
          collected and protected by this third party according to their privacy
          policy.
        </Text>

        <Text style={styles.header}>
          5. SOCIAL MEDIA AND OTHER COMMUNICATIONS
        </Text>
        <Text style={styles.text}>
          We advertise our Services on several social media platforms which may
          include, but are not necessarily limited to, Facebook, Instagram,
          Twitter, and LinkedIn. Our Services may also use third-party social
          networking features, such as allowing users to share certain
          information on social media platforms. Our Privacy Policy also applies
          to this information. Additionally, the third-party social media
          platforms we use may have their own privacy policies, and when users
          utilize social features of our Services, users also agree to the
          privacy policies and terms of use of the third parties.
        </Text>

        <Text style={styles.header}>
          6. CHANGING OR DELETING YOUR INFORMATION
        </Text>
        <Text style={styles.text}>
          If you are a registered user, you may review, update, correct or
          delete the information provided in your registration or account
          profile by changing your “account settings” through the App. If your
          information changes, or if you no longer desire to use the App, you
          may update or delete it by making the change on your account settings.
        </Text>

        <Text style={styles.header}>7. DATA RETENTION</Text>
        <Text style={styles.text}>
          We will retain your information for as long as your account is active
          or as needed to provide you access to the App. If you wish to cancel
          your account or request that we no longer use your information to
          provide you access to the App, you may delete your account through the
          App’s settings. Please note, however, that there may be a delay in
          deleting information from our servers and backed-up versions will not
          exist after deletion.
        </Text>

        <Text style={styles.header}>8. SECURITY</Text>

        <Text style={styles.text}>
          We follow generally accepted standards to protect the information
          submitted to us, both during transmission and once we receive it. No
          method of electronic transmission or storage is 100% secure, however.
          Therefore, we cannot guarantee its absolute security. If you have any
          questions about security on our website, you can contact us at via our
          email.
        </Text>

        <Text style={styles.header}>9. CONTACTING US</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy, please contact us
          via our email listed on our posting.
        </Text>

        <Text style={styles.header}>10. CHANGES TO OUR PRIVACY POLICY</Text>
        <Text style={styles.text}>
          This Privacy Policy may change from time to time. If we make a change
          to this privacy policy that we believe materially reduces your rights,
          we will provide you with notice (for example, by email). And we may
          provide notice of changes in other circumstances as well. By
          continuing to use the Services after those changes become effective,
          you agree to be bound by the revised Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
  },
  text: {
    alignSelf: "stretch",
    fontSize: 12,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
    marginTop: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
    marginTop: 30,
  },
  header: {
    alignSelf: "stretch",
    fontSize: 12,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
    marginTop: 50,
    textDecorationLine: "underline",
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default PrivacyPolicy;
