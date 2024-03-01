import { Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Header } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showCenter={false} />
      <ScrollView style={styles.tcContainer}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          "We" (publishers of who whom you downloaded this application from)
          take your privacy seriously. We have created this Privacy Policy to
          explain our policies and procedures for collecting, using, and
          disclosing your information.{" "}
        </Text>
        <Text style={styles.text}>
          Users can access the app through our mobile device and tablet
          application (“App”). In this Privacy Policy, the Site, the App, and
          our related services are referred to collectively as the “Service” or
          “Services.” This Privacy Policy governs your access of the Services,
          regardless of how you access them, and by using our Services you
          consent to the collection, transfer, processing, storage, disclosure
          and other uses described in this Privacy Policy. All of the different
          forms of data, content, and information described below are
          collectively referred to as “information.”
        </Text>

        <Text style={styles.header}>
          1. THE INFORMATION WE COLLECT AND STORE
        </Text>
        <Text style={styles.text}>
          We may collect and store the following information when you access the
          Services:
        </Text>
        <Text style={styles.text}>
          Information you provide. When you register an account, contact us with
          inquiries, or otherwise communicate with us (including through social
          media), we collect some personal information such as your full name
          and contact information such as your e-mail address, telephone number,
          or address. You may also ask us to import your contacts by giving us
          access to your third party services (for example, your email account,
          or Facebook), access your location using global positioning
          technology, and to use your social networking information if you give
          us access to your account on social network connection services and
          contacts. You may be able to turn some of these features off through
          your App, browser, or settings menu on your device.{" "}
        </Text>
        <Text style={styles.text}>
          Additionally, we collect personal data that you input when you use the
          App. The personal data collected may vary based on what you choose to
          share with us, but it will generally include your year of birth,
          height, weight, age, gender, mood, sleep patterns, dream journal
          entries, habits, to-dos, workouts, dietary choices, and other
          information relevant to helping us track your productivity, health,
          and wellness goals. Information you provide may also include payment
          and transaction information when you make purchases through the
          Services, such as payment card information and transaction history.
        </Text>
        <Text style={styles.text}>
          Cookies. Like many websites and applications, we use "cookies" to
          enhance your experience and gather information about visitors and
          visits to our website and App. Cookies are small files that a site or
          its service provider transfers to your tablet, mobile device, or
          computer's hard drive through your Web browser or application that
          enables the site's or service provider's systems to recognize your
          browser and capture and remember certain information. For instance, we
          use cookies to help us remember and process items that you may order
          or persons that you may connect with. They are also used to help us
          understand your preferences based on previous or current site and App
          activity, which enables us to provide you with improved services. We
          also use cookies to help us compile aggregate data about site traffic,
          site and App interaction so that we can offer better site and App
          experiences and tools in the future. We may contract with third-party
          service providers to assist us in better understanding our site
          visitors. These service providers are not permitted to use the
          information collected on our behalf except to help us conduct and
          improve our business.
        </Text>

        <Text style={styles.header}>2. HOW WE USE PERSONAL INFORMATION</Text>
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
        <Text style={styles.text}>
          Analytics: We also collect some information (ourselves or using third
          party services) using logging and cookies, which can sometimes be
          correlated with Personal Information. We use this information for the
          above purposes and to monitor and analyze use of the Services, for the
          Service’s technical administration, to increase our Service’s
          functionality and user-friendliness, and to verify users have the
          authorization needed for the Service to process their requests.
        </Text>

        <Text style={styles.header}>3. INFORMATION SHARING AND DISCLOSURE</Text>
        <Text style={styles.text}>
          Service Providers, Business Partners and Others. We may use certain
          trusted third-party companies and individuals to help us provide,
          analyze, and improve the Service (including but not limited to web
          analytics, Service usage, payment processing, and improvement of the
          Service’s features). These third parties may have access to your
          information only for purposes of performing these tasks on our behalf
          and under obligations similar to those in this Privacy Policy. Other
          users of the Service may also see certain non-private information
          about you, including photographs, location, shared friends, and
          ratings, as it is the nature of the Service to connect users with
          other users based on shared preferences, shared friends, shared
          experiences, and other similar personal traits which the Service
          shares in order to help generate connections.
        </Text>
        <Text style={styles.text}>
          Third-Party Applications. We may share your information with a
          third-party application with your consent, for example when you choose
          to access our Services through such an application. We are not
          responsible for what those parties do with your information, so you
          should make sure you trust the application and that it has a privacy
          policy acceptable to you.
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
        <Text style={styles.text}>
          Compliance with Laws and Law Enforcement Requests; Protection of Our
          Rights. We may disclose to outside parties files stored by us and
          information about you that we collect when we have a good faith belief
          that disclosure is reasonably necessary to (a) comply with a law,
          regulation or compulsory legal request; (b) protect the safety of any
          person from death or serious bodily injury; (c) prevent fraud or
          abuse; or (d) to protect property rights.
        </Text>
        <Text style={styles.text}>
          Business Transfers. If we are involved in a merger, acquisition, or
          sale of all or a portion of our assets, your information may be
          transferred as part of that transaction, but we will notify you (for
          example, via email and/or a prominent notice on our website) of any
          change in control or use of your Personal Information.{" "}
        </Text>
        <Text style={styles.text}>
          Non-private or Non-Personal Information. We may disclose your
          non-private, aggregated, or otherwise non-personal information, such
          as usage statistics of the Services.
        </Text>

        <Text style={styles.header}>
          4. SOCIAL MEDIA AND OTHER COMMUNICATIONS
        </Text>
        <Text style={styles.text}>
          We advertise our Services on several social media platforms which may
          include, but are not necessarily limited to, Facebook, Instagram,
          Twitter, and LinkedIn. Our Services may also use third-party social
          networking features, such as allowing users to share certain
          information on social media platforms. We may also receive or share
          information about users via these platforms. Our Privacy Policy also
          applies to this information. Additionally, the third-party social
          media platforms we use may have their own privacy policies, and when
          users utilize social features of our Services, users also agree to the
          privacy policies and terms of use of the third parties.
        </Text>

        <Text style={styles.header}>
          5. CHANGING OR DELETING YOUR INFORMATION
        </Text>
        <Text style={styles.text}>
          If you are a registered user, you may review, update, correct or
          delete the information provided in your registration or account
          profile by changing your “account settings” through the App. If your
          information changes, or if you no longer desire to use the App, you
          may update or delete it by making the change on your account settings.
          In some cases we may retain copies of your information if required by
          law.
        </Text>

        <Text style={styles.header}>6. DATA RETENTION</Text>
        <Text style={styles.text}>
          We will retain your information for as long as your account is active
          or as needed to provide you access to the App. If you wish to cancel
          your account or request that we no longer use your information to
          provide you access to the App, you may delete your account by
          following instructions on the App/website. We may retain and use your
          information as necessary to comply with our legal obligations, resolve
          disputes, and enforce our agreements. Consistent with these
          requirements, we will try to delete your information quickly upon
          request. Please note, however, that there may be a delay in deleting
          information from our servers and backed-up versions may exist after
          deletion.
        </Text>

        <Text style={styles.header}>7. SECURITY</Text>
        <Text style={styles.text}>
          The security of your information is important to us. When you enter
          sensitive information (such as a credit card number) on our order
          forms, we encrypt the transmission of that information using secure
          socket layer technology (SSL).
        </Text>
        <Text style={styles.text}>
          We follow generally accepted standards to protect the information
          submitted to us, both during transmission and once we receive it. No
          method of electronic transmission or storage is 100% secure, however.
          Therefore, we cannot guarantee its absolute security. If you have any
          questions about security on our application, you can contact via our
          email listed on our posting.
        </Text>

        <Text style={styles.header}>8. OUR POLICY REGARDING CHILDREN</Text>
        <Text style={styles.text}>
          The App is not directed to persons under the age of 18. We do not
          knowingly collect information from persons under the age of 18. If a
          parent or guardian becomes aware that their child has provided us with
          information without the parent or guardian’s consent, they should
          contact us via our email listed on our posting. If we become aware
          that a person under the age of 18 has provided us with information, we
          will take steps to delete such information from our files.
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
    backgroundColor: "#fff",
  },
  text: {
    alignSelf: "stretch",
    fontSize: 12,
    fontFamily: "Sego",
    color: "#25436B",
    marginTop: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginTop: 30,
  },
  header: {
    alignSelf: "stretch",
    fontSize: 12,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginTop: 50,
    textDecorationLine: "underline",
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    height: height * 0.7,
  },
});

export default PrivacyPolicy;
