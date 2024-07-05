import { Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { Header } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const TermsOfService = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showCenter={false} />
      <ScrollView style={styles.tcContainer}>
        <Text style={styles.title}>Terms and Conditions of Use</Text>

        <Text style={styles.header}>
          Acceptance of the Terms and Conditions of Use
        </Text>
        <Text style={styles.text}>
          These terms and conditions of use for this mobile and tablet
          application constitute a legal agreement and are entered into by and
          between you and the publishers of the application whom you downloaded
          this application from (“we,” “us,” “our”). The following terms and
          conditions, together with any documents and/or additional terms they
          expressly incorporate by reference (collectively, these “Terms and
          Conditions”), govern your access to and use, including any content,
          functionality, and services offered on or through this app (the
          “App”).
        </Text>
        <Text style={styles.text}>
          BY USING THE APP OR BY CLICKING TO ACCEPT THE TERMS AND CONDITIONS,
          YOU ACCEPT AND AGREE TO BE BOUND AND COMPLY WITH THESE TERMS AND
          CONDITIONS AND OUR PRIVACY POLICY. IF YOU DO NOT AGREE TO THESE TERMS
          AND CONDITIONS OR THE PRIVACY POLICY, YOU MUST NOT ACCESS OR USE THE
          APP.{" "}
        </Text>
        <Text style={styles.text}>
          By using this App, you represent and warrant that you are the legal
          age of majority under applicable law to form a binding contract with
          us and meet all of the foregoing eligibility requirements. If you do
          not meet all of these requirements, you must not access or use the
          App.
        </Text>

        <Text style={styles.header}>
          Modifications to the Terms and Conditions and to the App
        </Text>
        <Text style={styles.text}>
          We reserve the right in our sole discretion to revise and update these
          terms and conditions from time to time. Any and all such modifications
          are effective immediately upon posting and apply to all access to and
          continued use of the App. You agree to periodically review the terms
          and conditions in order to be aware of any such modifications and your
          continued use shall be your acceptance of these.{" "}
        </Text>
        <Text style={styles.text}>
          The information and material on this App, and the App, may be changed,
          withdrawn, or terminated at any time in our sole discretion without
          notice. We will not be liable if, for any reason, all or any part of
          the App is restricted to users or unavailable at any time or for any
          period.
        </Text>

        <Text style={styles.header}>
          Your Use of the App and Account Set-Up and Security
        </Text>
        <Text style={styles.text}>
          The security of your personal information is very important to us. We
          use physical, electronic, and administrative measures designed to
          secure your personal information from accidental loss and from
          unauthorized access, use, alteration, and disclosure.
        </Text>
        <Text style={styles.text}>
          The safety and security of your information also depends on you. Users
          are responsible for obtaining their own access to the App. Users are
          required to ensure that all persons who access the App through a
          user’s internet connection are aware of these Terms and Conditions and
          comply with them. The App, including content or areas of the App, may
          require user registration. It is a condition of your use of the App
          that all the information you provide on the App is correct, current,
          and complete.
        </Text>
        <Text style={styles.text}>
          Unfortunately, the transmission of information via the Internet is not
          completely secure. Although we do our best to protect your personal
          information, we cannot guarantee the security of your personal
          information transmitted to our App. Any transmission of personal
          information is at your own risk. We are not responsible for
          circumvention of any privacy settings or security measures contained
          on the App.
        </Text>
        <Text style={styles.text}>
          Your provision of registration information and any submissions you
          make to the App through any functionality such as applications, chat
          rooms, e-mail, message boards, personal, or interest group web pages,
          profiles, forums, bulletin boards, and other such functions
          (collectively, “Interactive Functions”) constitutes your consent to
          all actions we take with respect to such information consistent with
          our Privacy Policy.
        </Text>
        <Text style={styles.text}>
          Any username, password, or any other piece of information chosen by
          you, or provided to you as part of our security procedures, must be
          treated as confidential, and you must not disclose it to any other
          person or entity. You must exercise caution when accessing your
          account from a public or shared computer so that others are not able
          to view or record your password or other personal information. You
          understand and agree that should you be provided an account, your
          account is personal to you and you agree not to provide any other
          person with access to this App or portions of it using your username,
          password, or other security information. You agree to notify us
          immediately of any unauthorized access to or use of your username or
          password or any other breach of security. You also agree to ensure
          that you logout from your account at the end of each session. You are
          responsible for any password misuse or any unauthorized access.
        </Text>
        <Text style={styles.text}>
          We reserve the right at any time and from time to time, to disable or
          terminate your account, any username, password, or other identifier,
          whether chosen by you or provided by us, in our sole discretion for
          any or no reason, including any violation of any provision of these
          Terms and Conditions.
        </Text>
        <Text style={styles.text}>
          You are prohibited from attempting to circumvent and from violating
          the security of this App, including, without limitation: (a) accessing
          content and data that is not intended for you; (b) attempting to
          breach or breaching the security and/or authentication measures which
          are not authorized; (c) restricting, disrupting or disabling service
          to users, hosts, servers, or networks; (d) illicitly reproducing
          TCP/IP packet header; (e) disrupting network services and otherwise
          disrupting App owner’s ability to monitor the App; (f) using any
          robot, spider, or other automatic device, process, or means to access
          the App for any purpose, including monitoring or copying any of the
          material on the App; (g) introducing any viruses, trojan horses,
          worms, logic bombs, or other material that is malicious or
          technologically harmful; (h) attacking the App via a denial-of-service
          attack, distributed denial-of-service attack, flooding, mailbombing,
          or crashing; and (i) otherwise attempting to interfere with the proper
          working of the App.
        </Text>

        <Text style={styles.header}>
          Conditions of Use and User Submissions and Site Content Standards
        </Text>
        <Text style={styles.text}>
          As a condition of your access and use, you agree that you may use the
          App only for lawful purposes and in accordance with these Terms and
          Conditions.
        </Text>
        <Text style={styles.text}>
          The following content standards apply to any and all content,
          material, and information a user submits, posts, publishes, displays,
          or transmits (collectively, “submit”) to the App, to other users or
          other persons (collectively, “User Submissions”) and any and all
          Interactive Functions. Any and all User Submissions must comply with
          all applicable federal, provincial, local, and international laws,
          regulations, and terms of service. User Submissions refer only to app
          entries that you have saved, stored or shared to the App with the
          explicit intention of allowing other users or us to view or access it
          through the App (i.e public or semi-public). Any entries made to the
          app that have not been expressly declared as such by you are not
          considered User Submissions and will be treated as confidential.
        </Text>
        <Text style={styles.text}>
          Without limiting the foregoing, you warrant and agree that your use of
          the App and any User Submissions shall not:
        </Text>
        <Text style={styles.text}>
          (a)  In any manner violate any applicable federal, provincial, local,
          or international law or regulation including, without limitation, any
          laws regarding the export of data or software, patent, trademark,
          trade secret, copyright, or other intellectual property, legal rights
          (including the rights of publicity and privacy of others) or contain
          any material that could give rise to any civil or criminal liability
          under applicable laws or regulations or that otherwise may be in
          conflict with these Terms and Conditions and our Privacy Policy.
        </Text>
        <Text style={styles.text}>
          (b)  In any manner violate the terms of use of any third-party website
          that is linked to the App, including but not limited to, any
          third-party social media website.
        </Text>
        <Text style={styles.text}>
          (c)  Include or contain any material that is exploitive, obscene,
          harmful, threatening, abusive, harassing, hateful, defamatory,
          sexually explicit or pornographic, violent, inflammatory, or
          discriminatory based on race, sex, religion, nationality, disability,
          sexual orientation, or age or other such legally prohibited ground or
          be otherwise objectionable, such determination to be made in our sole
          discretion.
        </Text>
        <Text style={styles.text}>
          (d)  Involve stalking, attempting to exploit or harm any individual
          (including minors) in any way by exposing them to inappropriate
          content or otherwise or ask for personal information as prohibited
          under applicable laws, regulations, or code.
        </Text>
        <Text style={styles.text}>
          (e)  Involve, provide, or contribute any false, inaccurate, or
          misleading information.
        </Text>
        <Text style={styles.text}>
          (f)  Impersonate or attempt to impersonate us, our employees, another
          user, or any other person or entity (including, without limitation, by
          using email addresses, or screen names associated with any of the
          foregoing).
        </Text>
        <Text style={styles.text}>
          (g)  Transmit, or procure the sending of, any advertisements or
          promotions without our prior written consent, sales, or encourage any
          other commercial activities, including, without limitation, any
          “spam”, “junk mail”, “chain letter”, contests, sweepstakes and other
          sales promotions, barter, or advertising or any other similar
          solicitation, that are not authorized hereunder.
        </Text>
        <Text style={styles.text}>
          (h)  Encourage any other conduct that restricts or inhibits anyone’s
          use or enjoyment of the App, or which, as determined by us, may harm
          us or users of the App or expose them to liability.
        </Text>
        <Text style={styles.text}>
          (j)  Cause annoyance, inconvenience, or needless anxiety or be likely
          to upset, embarrass, or alarm any other person.
        </Text>
        <Text style={styles.text}>
          (k)  Promote any illegal activity, or advocate, promote, or assist any
          unlawful act.
        </Text>
        <Text style={styles.text}>
          (l)  Give the impression that they originate from or are endorsed by
          us or any other person or entity, if this is not the case.
        </Text>

        <Text style={styles.header}>User Submissions: Grant of Licence</Text>
        <Text style={styles.text}>
          The App may contain Interactive Functions allowing User Submissions on
          or through the App.
        </Text>
        <Text style={styles.text}>
          None of the User Submissions you submit to the App will be subject to
          any confidentiality by us. By providing any User Submission to the
          App, you grant us and our affiliates and service providers, and each
          of their and our respective licensees, successors, and assigns the
          right to a world-wide, royalty free, perpetual, irrevocable,
          non-exclusive licence to use, reproduce, modify, perform, display,
          distribute, and otherwise disclose to third parties any such material
          for any purpose and according to your account settings and/or
          incorporate such material into any form, medium or technology
          throughout the world without compensation to you. You further waive
          any moral rights or other rights of authorship as a condition of
          submitting any User Submission.
        </Text>
        <Text style={styles.text}>
          By submitting the User Submissions, you declare and warrant that you
          own or have the necessary rights to submit the User Submissions and
          have the right to grant the licence hereof to us and our affiliates
          and service providers, and each of their and our respective licensees,
          successors, and assigns to the User Submissions and comply with these
          Terms and Conditions. You represent and warrant that all User
          Submissions comply with applicable laws and regulations.
        </Text>
        <Text style={styles.text}>
          You understand and agree that you, and not us nor our parent,
          subsidiaries, affiliates nor their respective directors, officers,
          employees, agents, service providers, contractors, licensors,
          suppliers, or successors, are fully responsible for any User
          Submissions you submit or contribute, and you are fully responsible
          and legally liable, including to any third party, for such content and
          its accuracy. We are not responsible or legally liable to any third
          party for the content or accuracy of any User Submissions submitted by
          you or any other user of the App.{" "}
        </Text>

        <Text style={styles.header}>
          Site Monitoring and Enforcement, Suspension, and Termination
        </Text>
        <Text style={styles.text}>
          We have the right, without provision of notice to:
        </Text>
        <Text style={styles.text}>
          Remove or refuse to post on the App any User Submissions for any or no
          reason in our sole discretion.
        </Text>
        <Text style={styles.text}>
          At all times, take such actions with respect to any User Submission
          deemed necessary or appropriate in our sole discretion, including,
          without limitation, for violating these Terms and Conditions or the
          Privacy Policies or other policies.
        </Text>
        <Text style={styles.text}>
          Take appropriate legal action, including, without limitation, referral
          to law enforcement or regulatory authority, or notifying the harmed
          party of any illegal or unauthorized use of the App. Without limiting
          the foregoing, we have the right to fully cooperate with any law
          enforcement authorities or court order requesting or directing us to
          disclose the identity or other information of anyone posting any
          materials on or through the App.
        </Text>
        <Text style={styles.text}>
          Terminate or suspend your access to all or part of the App for any or
          no reason, including, without limitation, any violation of these Terms
          and Conditions.
        </Text>
        <Text style={styles.text}>
          YOU WAIVE AND HOLD US HARMLESS AND OUR AFFILIATES, AND THEIR
          RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS,
          CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, AND SUCCESSORS FROM ANY
          AND ALL CLAIMS RESULTING FROM ANY ACTION TAKEN BY US AND ANY OF THE
          FOREGOING PARTIES RELATING TO ANY INVESTIGATIONS BY US OR SUCH PARTIES
          OR BY LAW ENFORCEMENT AUTHORITIES.
        </Text>
        <Text style={styles.text}>
          We have no obligation, nor any responsibility to any party to monitor
          the App or its use, and do not and cannot undertake to review material
          that you or other users submit to the App. We cannot ensure prompt
          removal of objectionable material after it has been posted and we have
          no liability for any action or inaction regarding transmissions,
          communications, or content provided by any user or third party,
          subject to applicable laws.
        </Text>

        <Text style={styles.header}>No Reliance</Text>
        <Text style={styles.text}>
          The content on our App is provided for general information purposes
          only. It is not intended to amount to advice on which you should rely.
          You must obtain more specific or professional advice before taking, or
          refraining from, any action or inaction on the basis of the content on
          our site.
        </Text>
        <Text style={styles.text}>
          Although we make reasonable efforts to update the information on our
          App, we make no representations, warranties, or guarantees, whether
          express or implied, that the content on our App is accurate, complete,
          or up to date. Your use of the App is at your own risk and neither we
          nor our affiliates, and their respective directors, officers,
          employees, agents, service providers, contractors, licensors,
          licensees, suppliers, or successors has any responsibility or
          liability whatsoever for your use of this App.
        </Text>
        <Text style={styles.text}>
          This App may include content provided by third parties, including from
          other users and third-party licensors. All statements and/or opinions
          expressed in any such third-party content, other than the content
          provided by us, are solely the opinions and the responsibility of the
          person or entity providing those materials. Such materials do not
          necessarily reflect our opinion. Neither us nor our affiliates, and
          their respective directors, officers, employees, agents, service
          providers, contractors, licensors, licensees, suppliers, or successors
          have any responsibility or liability whatsoever to you, or any third
          party, for the content or accuracy of any third-party materials.
        </Text>

        <Text style={styles.header}>Privacy</Text>
        <Text style={styles.text}>
          By submitting your personal information and using our App, you consent
          to the collection, use, reproduction, hosting, transmission, and
          disclosure of any such user content submissions in compliance with our
          Privacy Policy, as we deem necessary for use of the App and provision
          of services.
        </Text>
        <Text style={styles.text}>
          By using this App you are consenting to the use of cookies which allow
          a server to recall previous requests or registration and/or IP
          addresses to analyze website use patterns. You can set your browser to
          notify you before you receive a cookie, giving you the chance to
          decide whether to accept it. You can also set your browser to turn off
          cookies. If you do, however, some areas of the App may not function
          adequately.{" "}
        </Text>

        <Text style={styles.header}>Third-Party Websites</Text>
        <Text style={styles.text}>
          For your convenience, this App may provide links or pointers to
          third-party sites. We make no representations about any other websites
          that may be accessed from this App. If you choose to access any such
          sites, you do so at your own risk. We have no control over the
          contents of any such third-party sites and accept no responsibility
          for such sites or for any loss or damage that may arise from your use
          of them. You are subject to any terms and conditions of such
          third-party sites.
        </Text>
        <Text style={styles.text}>
          Such links to third-party sites from the App may include links to
          certain social media features that enable you to link or transmit, on
          your own or using certain third-party websites, certain content from
          this App. You may only use these features when they are provided by us
          and solely with respect to the content identified.
        </Text>
        <Text style={styles.text}>
          You may link to the App, provided you do so in a way that is fair and
          legal and does not damage our reputation or take advantage of it. You
          must not establish a link in such a way as to suggest any form of
          association, approval, or endorsement on our part where none exists.
          Our App must not be framed on any other site. We reserve the right to
          withdraw linking permission without notice. The website in which you
          are linking must comply in all respects with these Terms and
          Conditions. You agree to cooperate with us in causing any unauthorized
          framing or linking to immediately stop.
        </Text>

        <Text style={styles.header}>Services and Fees</Text>
        <Text style={styles.text}>
          We offer placement services through our App in exchange for Fees
          (defined below) (“Services”). We connect available and qualified
          contractors (“Contactors”) with businesses (“Businesses”) seeking
          their services (“Contractor Services”). The availability of Services
          through our App does not indicate an affiliation with or endorsement
          of any Contractors or Businesses (collectively “Clients”).
          Accordingly, we do not provide any conditions or warranties with
          respect to Clients or Contractor Services.{" "}
        </Text>
        <Text style={styles.text}>
          All orders, purchases or transactions for the sale of services or
          information or fees associated with referrals, made through the App,
          or made using this App, (collectively “Fees”) are subject to these
          Terms and Conditions.
        </Text>
        <Text style={styles.text}>
          All Fees posted on the App are subject to change without notice. Fee
          increases will only apply to transactions made after the time of the
          increase. Posted Fees do not include taxes or other similar charges.
          All such taxes and charges will be added to your total Fees and will
          be itemized in your statement. We strive to display accurate Fees
          information; however, we may, on occasion, make inadvertent
          typographical errors, inaccuracies, or omissions related to Fees. We
          reserve the right to correct any errors, inaccuracies, or omissions at
          any time and to correct transactions arising from such occurrences.{" "}
        </Text>
        <Text style={styles.text}>
          Terms of payment of Fees are within our sole discretion and, unless
          otherwise agreed by us in writing, payment must be received by us
          concurrently with a transaction on the App. We accept [APPROVED CREDIT
          CARDS AND OTHER PAYMENT METHODS] for all purchases. You represent and
          warrant that: (i) any credit card information you supply to us is
          true, correct, and complete, (ii) you are duly authorized to use such
          credit card for the transactions and Fees, (iii) charges incurred by
          you will be honoured by your credit card company, and (iv) you will
          pay Fees incurred by you at the posted prices, including all
          applicable taxes, if any.
        </Text>
        <Text style={styles.text}>
          ALL CONTRACTOR SERVICES OFFERED THROUGH THE APP ARE PROVIDED BY THE
          CONTRACTORS WITHOUT ANY WARRANTY OR CONDITION WHATSOEVER BY US,
          INCLUDING, WITHOUT LIMITATION, ANY WARRANTY OR CONDITION: (A) OF
          SUITABILITY; (B) CONDUCT; OR (C) SUCCESS; WHETHER EXPRESS OR IMPLIED
          BY LAW, COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE OF TRADE, OR
          OTHERWISE.
        </Text>
        <Text style={styles.text}>
          YOU AFFIRM THAT WE SHALL NOT BE LIABLE, UNDER ANY CIRCUMSTANCES, FOR
          ANY BREACH OF WARRANTY OR CONDITION CLAIMS OR FOR ANY DAMAGES ARISING
          OUT OF THE PROVISION OF CONTRACTOR SERVICES BY THE CONTRACTORS.
        </Text>
        <Text style={styles.text}>
          IN NO EVENT SHALL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR
          CONSEQUENTIAL, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR
          AGGRAVATED DAMAGES, LOST PROFITS OR REVENUES, OR DIMINUTION IN VALUE,
          ARISING OUT OF, OR RELATING TO, AND/OR IN CONNECTION WITH ANY BREACH
          OF THESE TERMS, REGARDLESS OF (A) WHETHER SUCH DAMAGES WERE
          FORESEEABLE, (B) WHETHER OR NOT WE WERE ADVISED OF THE POSSIBILITY OF
          SUCH DAMAGES, AND (C) THE LEGAL OR EQUITABLE THEORY (CONTRACT, TORT,
          OR OTHERWISE) UPON WHICH THE CLAIM IS BASED.
        </Text>
        <Text style={styles.text}>
          OUR SOLE AND ENTIRE MAXIMUM LIABILITY, FOR ANY REASON, AND YOUR SOLE
          AND EXCLUSIVE REMEDY FOR ANY CAUSE WHATSOEVER, SHALL BE LIMITED TO THE
          ACTUAL AMOUNT OF FEES PAID BY YOU FOR THE SERVICES THROUGH THE APP.
        </Text>
        <Text style={styles.text}>
          The limitation of liability set forth above shall not apply to (i)
          liability resulting from our gross negligence or wilful misconduct,
          and (ii) death or bodily injury resulting from our acts or omissions.
        </Text>

        <Text style={styles.header}>Diet and Fitness Recommendations</Text>
        <Text style={styles.text}>
          Our App provides diet and fitness recommendations solely for
          information purposes. Any information or guidance we provide should
          not replace or substitute for the consultation, diagnosis, and/or
          medical treatment of your doctor or other appropriate healthcare
          professional. You should consult with a qualified healthcare provider
          before taking any actions based upon information provided by us,
          before making significant changes to your diet or fitness routine, or
          if you have any specific questions or concerns about your health. This
          is especially true if you or your family have a history of high blood
          pressure or heart disease, or if you smoke, have high cholesterol, or
          have a bone or joint problem that could be made worse by a change in
          physical activity, or if you have ever experienced chest pain when
          exercising or have experienced chest pain in the past month when not
          engaged in physical activity. The use or reliance of any information
          provided on the website or App is solely at your own risk. We
          expressly disclaim all responsibility, and shall have no liability,
          for any damages, loss, injury, or liability whatsoever suffered by you
          or any third party as a result of your reliance on any information or
          guidance we provide you with.
        </Text>

        <Text style={styles.header}>Foods Database</Text>
        <Text style={styles.text}>
          For diet tracking purposes, our App utilizes a third-party foods
          database. We have not verified, investigated, or reviewed the
          information in the database and we cannot guarantee its accuracy or
          completeness. You are encouraged to verify the information with
          reliable sources. We are not responsible for any personal injury or
          any other damages that may have been the result, direct or indirect,
          of any use or misuse of the Services.
        </Text>

        <Text style={styles.header}>Testimonials</Text>
        <Text style={styles.text}>
          Our website, App, and social media content may contain testimonials by
          users of our Services. Testimonials are received in various forms
          including but not limited to text, audio, and/or video, and through a
          variety of submission methods including but not limited to email,
          social media, text, applications, and websites.
        </Text>
        <Text style={styles.text}>
          These testimonials reflect the real-life experiences and opinions of
          such users. However, the experiences are personal to those users and
          may not necessarily be representative of all users of our Services. We
          do not claim, and you should not assume, that all users will have the
          same experiences. Your individual results may vary.
        </Text>
        <Text style={styles.text}>
          The testimonials are displayed verbatim as given by users, except for
          the correction of grammatical or typing errors. Some testimonials may
          have been shortened for the sake of brevity or where the whole
          testimonial did not seem relevant for the general visitor.
        </Text>
        <Text style={styles.text}>
          Users are not paid for their testimonials. Any individual giving a
          testimonial for our App may have been compensated with free or
          discounted products or services for the use of their experiences, and
          this is noted in the posting of the testimonials. All testimonials are
          reviewed for authenticity of claims and the individual is verified as
          a user of our Services.
        </Text>
        <Text style={styles.text}>
          The views and opinions contained in the testimonials belong solely to
          the individual user and do not reflect our views and opinions.
        </Text>

        <Text style={styles.header}>
          Intellectual Property Rights and Ownership
        </Text>
        <Text style={styles.text}>
          Our name, our logo, and all related names, logos, product and service
          names, designs, images, and slogans are trademarks of ours or our
          affiliates or licensors. You must not use such marks without our prior
          written permission. Other names, logos, product and service names,
          designs, images, and slogans mentioned, or which appear on this App
          are the trademarks of their respective owners. Use of any such
          property, except as expressly authorized, shall constitute an
          infringement or violation of the rights of the property owner and may
          be a violation of federal or other laws and could subject the
          infringer to legal action.
        </Text>

        <Text style={styles.header}>Waiver</Text>
        <Text style={styles.text}>
          No failure to exercise, or delay in exercising, any right, remedy,
          power, or privilege arising from these Terms and Conditions operates,
          or may be construed, as a waiver thereof; and no single or partial
          exercise of any right, remedy, power, or privilege hereunder precludes
          any other or further exercise thereof or the exercise of any other
          right, remedy, power, or privilege.
        </Text>

        <Text style={styles.header}>Disclaimer of Warranties</Text>
        <Text style={styles.text}>
          YOU UNDERSTAND AND AGREE THAT YOUR USE OF THE APP, ITS CONTENT, AND
          ANY SERVICES ATTAINED THROUGH THE APP IS AT YOUR OWN RISK. THE APP,
          ITS CONTENT, AND ANY SERVICES ATTAINED THROUGH THE APP ARE PROVIDED ON
          AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OR
          CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED INCLUDING, BUT NOT
          LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, OR NON-INFRINGEMENT. THE FOREGOING DOES NOT AFFECT
          ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE
          LAW.
        </Text>
        <Text style={styles.text}>
          NEITHER US NOR OUR AFFILIATES, OR THEIR RESPECTIVE DIRECTORS,
          OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS,
          LICENSORS, LICENSEES, SUPPLIERS, OR SUCCESSORS MAKE ANY WARRANTY,
          REPRESENTATION, OR ENDORSEMENT WITH RESPECT TO THE COMPLETENESS,
          SECURITY, RELIABILITY, SUITABILITY, ACCURACY, CURRENCY, OR
          AVAILABILITY OF THE APP OR ITS CONTENTS. WITHOUT LIMITING THE
          FOREGOING, NEITHER US NOR OUR AFFILIATES OR THEIR RESPECTIVE
          DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS,
          CONTRACTORS, LICENSORS, LICENSEES, SUPPLIERS, OR SUCCESSORS REPRESENT
          OR WARRANT THAT THE APP, ITS CONTENT, OR ANY SERVICES ATTAINED THROUGH
          THE APP WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT
          DEFECTS WILL BE CORRECTED, THAT OUR APP OR THE SERVER THAT MAKES IT
          AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
        </Text>
        <Text style={styles.text}>
          WE CANNOT AND DO NOT GUARANTEE OR WARRANT THAT FILES OR DATA AVAILABLE
          FOR DOWNLOADING FROM THE INTERNET OR THE APP WILL BE FREE OF VIRUSES
          OR OTHER DESTRUCTIVE CODE. YOU ARE SOLELY AND ENTIRELY RESPONSIBLE FOR
          YOUR USE OF THE APP AND YOUR COMPUTER, INTERNET, AND DATA SECURITY. TO
          THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS
          OR DAMAGE CAUSED BY DENIAL-OF-SERVICE ATTACK, DISTRIBUTED
          DENIAL-OF-SERVICE ATTACK, OVERLOADING, FLOODING, MAILBOMBING, OR
          CRASHING, VIRUSES, TROJAN HORSES, WORMS, LOGIC BOMBS, OR OTHER
          TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER
          EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE
          TO YOUR USE OF THE APP OR ANY SERVICES OR ATTAINED THROUGH THE APP OR
          TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE
          LINKED TO IT.
        </Text>

        <Text style={styles.header}>Indemnification</Text>
        <Text style={styles.text}>
          To the maximum extent permitted by applicable law, you agree to
          defend, indemnify, and hold us and our affiliates, and their
          respective directors, officers, employees, agents, service providers,
          contractors, licensors, suppliers, successors, and assigns harmless
          from and against any claims, liabilities, damages, judgments, awards,
          losses, costs, expenses, or fees (including reasonable attorneys’
          fees) arising out of or relating to your breach of these Terms and
          Conditions or your use of the App, including, but not limited to, your
          User Submissions, third-party sites, any use of the App’s content,
          services, and products other than as expressly authorized in these
          Terms and Conditions.
        </Text>

        <Text style={styles.header}>Limitation on Liability</Text>
        <Text style={styles.text}>
          EXCEPT WHERE SUCH EXCLUSIONS ARE PROHIBITED BY LAW, UNDER NO
          CIRCUMSTANCE WILL WE NOR OUR AFFILIATES OR THEIR RESPECTIVE DIRECTORS,
          OFFICERS, EMPLOYEES, AGENTS, SERVICE PROVIDERS, CONTRACTORS,
          LICENSORS, LICENSEES, SUPPLIERS, OR SUCCESSORS BE LIABLE FOR
          NEGLIGENCE, GROSS NEGLIGENCE, NEGLIGENT MISREPRESENTATION, FUNDAMENTAL
          BREACH, DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, INCLUDING ANY
          DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE
          DAMAGES, INCLUDING, BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND
          SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS
          OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL,
          LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE),
          BREACH OF CONTRACT, BREACH OF PRIVACY, OR OTHERWISE, EVEN IF THE PARTY
          WAS ALLEGEDLY ADVISED OR HAD REASON TO KNOW, ARISING OUT OF OR IN
          CONNECTION WITH YOUR USE, OR INABILITY TO USE, OR RELIANCE ON, THE
          APP, ANY LINKED WEBSITES OR SUCH OTHER THIRD-PARTY WEBSITES, NOR ANY
          APP CONTENT, MATERIALS, POSTING, OR INFORMATION THEREON EVEN IF THE
          PARTY WAS ALLEGEDLY ADVISED OR HAD REASON TO KNOW. 
        </Text>

        <Text style={styles.header}>Entire Agreement</Text>
        <Text style={styles.text}>
          The Terms and Conditions and our Privacy Policy and any other terms
          and conditions or policies published through the App constitute the
          sole and entire agreement between you and us regarding the App and
          supersedes all prior and contemporaneous understandings, agreements,
          representations and warranties, both written and oral, regarding such
          subject matter.
        </Text>
        <Text style={styles.text}>
          Additional terms and conditions may be applicable to parts or features
          of this App, the Services, and the Fees, as published through the App,
          and are hereby incorporated by reference into these Terms and
          Conditions.
        </Text>

        <Text style={styles.header}>Severability</Text>
        <Text style={styles.text}>
          If any term or provision of these Terms and Conditions is invalid,
          illegal, or unenforceable in any jurisdiction, such invalidity,
          illegality, or unenforceability shall not affect any other term or
          provision of these Terms and Conditions or invalidate or render
          unenforceable such term or provision in any other jurisdiction.
        </Text>

        <Text style={styles.header}>Reporting and Contact</Text>
        <Text style={styles.text}>
          This App is operated by Us, the publishers of whom you downloaded the
          App from.
        </Text>
        <Text style={styles.text}>
          Should you become aware of misuse of the App including libelous or
          defamatory conduct, you must report it to us via our contact listed in
          the App's posting
        </Text>
        <Text style={styles.text}>
          All other feedback, comments, requests for technical support, and
          other communications relating to the App should be directed to us via
          our contact listed in the App's posting
        </Text>

        <Text style={styles.header}>Geographic Restrictions</Text>
        <Text style={styles.text}>
          The owner of the App is based in Manitoba in Canada. We provide this
          App for use only by persons located in Canada. This App is not
          intended for use in any jurisdiction where its use is not permitted.
          If you access the App from outside Canada, you do so at your own risk
          and you are responsible for compliance with local laws of your
          jurisdiction.
        </Text>

        <Text style={styles.header}>Governing Law and Choice of Forum</Text>
        <Text style={styles.text}>
          The App and these Terms and Conditions will be governed by and
          construed in accordance with the laws of the Province of Manitoba and
          the federal laws of Canada applicable therein, without giving effect
          to any choice or conflict of law provision, principle, or rule
          (whether of the laws of the Province of Manitoba or any other
          jurisdiction) and notwithstanding your domicile, residence, or
          physical location.
        </Text>
        <Text style={styles.text}>
          Any action or proceeding arising out of or relating to this App and
          under these Terms and Conditions will be instituted in the courts of
          the Province of Manitoba and/or the Federal Court of Canada, and each
          party irrevocably submits to the exclusive jurisdiction of such courts
          in any such action or proceeding. You waive any and all objections to
          the exercise of jurisdiction over you by such courts and to the venue
          of such courts.
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

export default TermsOfService;
