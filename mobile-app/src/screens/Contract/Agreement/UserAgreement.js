import {
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Header } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValueSheet } from "../../../ValueSheet";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { sharedStyles } from "../../styles";

const UserAgreement = () => {
  const { width, height } = useWindowDimensions();
  const theme = useContext(ThemeContext).value;
  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <Header showCenter={false} />
      <ScrollView style={[styles.tcContainer, { height: height * 0.7 }]}>
        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          Licence Agreement
        </Text>
        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          Software Licence Agreement
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          THIS PROJECT IS OPEN-SOURCE AND IS NOT OWNED BY US. THE SOURCE CODE
          FOR THIS APP CAN BE FOUND ONLINE. CAREFULLY READ THE FOLLOWING LICENCE
          AGREEMENT. IT CONTAINS VERY IMPORTANT INFORMATION ABOUT YOUR RIGHTS
          AND OBLIGATIONS, AS WELL AS LIMITATIONS AND EXCLUSIONS THAT MAY APPLY
          TO YOU. THIS DOCUMENT CONTAINS A DISPUTE RESOLUTION CLAUSE. BY
          CLICKING ON THE “ACCEPT” BUTTON, YOU ARE CONSENTING TO BE BOUND BY AND
          ARE BECOMING A PARTY TO THIS AGREEMENT, AND ARE SUBJECT TO OUR PRIVACY
          POLICY FOUND AND TERMS AND CONDITIONS OF USE PROVIDED IN THE APP. IF
          YOU DO NOT AGREE TO ALL OF THE TERMS OF THIS AGREEMENT, CLICK THE “DO
          NOT ACCEPT” BUTTON OR DELETE THE APP.
        </Text>

        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          Please contact us via our email listed in the App's posting for any
          queries.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          “You” or “Your” means the person or company who is being licensed to
          use the Licensor software in association with the Usage Agreement
          (“Usage Agreement”). “We”, “Our” and “Us” means the publishers of this
          application whom you downloaded the app from.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          NOW, THEREFORE, THIS AGREEMENT WITNESSETH that, in consideration of
          the mutual covenants contained herein, the
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          Parties hereto agree as follows:
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          1. DEFINITIONS
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          1.1. Definitions. Capitalized terms in this Agreement will have the
          following meanings:
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          “Agreement” means this Software Licence Agreement between Us and You;
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          “Licensed Software” means certain commercial software products being
          provided to You under this Agreement, including executable program
          modules thereof, as well as related documentation and computer
          readable media;
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          “Sublicensed Software” means certain third party owned software
          components being provided under this Agreement, that are required to
          properly enable or operate the Licensed Software;
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          Other capitalized terms have the meanings defined in the Usage
          Agreement.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          2. SOFTWARE LICENCE, RIGHTS & RESTRICTIONS
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          2.1 Software Licence and Rights. In consideration of the mutual
          covenants, and subject to the provisions contained in this Agreement,
          We hereby grant to You a revocable, non-exclusive licence to use the
          Licensed Software solely in order to utilize the Products and Services
          as provided under the Usage Agreement.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          2.2 Restrictions. Without limiting the generality of the foregoing,
          You will use the Licensed Software only for purposes set forth herein,
          and, further, You expressly agree that You DO NOT have rights to:
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          (a) own title, or transfer title to the Licensed Software to another
          party;
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          (b) pledge, hypothecate, alienate or otherwise encumber the Licensed
          Software to any third party;
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          (c) use the Licensed Software to rent, lease or otherwise provide
          location-enabled telecommunication or information services to Your
          customers, including, without limitation, data processing, hosting,
          outsourcing, service bureau or online application services (ASP)
          offerings; or
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          2.3 Enforcement of Restrictions. We will have the right to inspect and
          enforce the restrictions and covenants contained in this Agreement at
          Your sole expense, and You hereby agree to promptly notify Us of any
          known violations of such restrictions.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          2.4 Our Obligations. Upon execution of this Agreement, We will:
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          (a) permit You to download a copy of the most current version of the
          Licensed Software for Your use under this Agreement; and
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          (b) provide You with ongoing updates to the Licensed Software.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          3. COPYRIGHT AND MARKS
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          3.1 Copyright. The Licensed Software, is open source and we do not own
          it. The Licensed Software is protected under Canadian copyright laws
          and international treaty provisions. You Will have a right to copy the
          materials, provided copyright notices and acknowledgement of
          trade-marks are included, pursuant to the covenants herein.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          3.2 Trade-marks. Certain logos, product names and trade-marks owned by
          Us may be contained within the printed materials and electronic
          manifestations of the Licensed Software. You will have no right to use
          such marks in its end-user applications except as set out in the User
          Agreement.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          4. TITLE
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          4.1 Title. You acknowledge that the Licensed Software, including any
          associated written materials and other documentation provided under
          this Agreement, is open source. Unencumbered title to the Licensed
          Software will, at all times, remain open source. You agree to protect
          the Licensed Software from unauthorized use, reproduction,
          distribution or publication in electronic or physical form.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          5. WARRANTY AND INDEMNITY
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          5.1 Warranty. We warrant that We have rights to use the Licensed
          Software, and have the right and authority to grant the licence to the
          Licensed Software. We do not warrant, guarantee, accept any condition
          or make any representation that the Licensed Software will meet Your
          requirements or that the use of the Licensed Software will be
          uninterrupted or error-free. No other verbal or written information
          provided by Us will create a warranty or in any way increase Our
          liability, and You will not rely on such information.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          5.2 Indemnity. We warrant that the Licensed Software does not infringe
          on any current subsisting and enforceable Canadian patent or Canadian
          copyright, and We will and hereby do agree to indemnify and hold You
          harmless in respect of any losses, costs, damages or expenses
          (including reasonable attorney’s fees and court costs) arising out of
          any claim, demand or action alleging that the Licensed Software
          violates or infringes the Canadian copyright, patent or other
          intellectual property right of any third party, providing that You
          provide Us with reasonable cooperation in preparing a defence against
          any such claim.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          5.3 DISCLAIMER. THERE ARE NO WARRANTIES FOR SERVICES. WE MAKE NO
          EXPRESS REPRESENTATIONS OR WARRANTIES, OR ACCEPT ANY CONDITIONS EXCEPT
          THOSE EXPRESSLY STATED IN SECTIONS 5.1 AND 5.2 ABOVE. WE DISCLAIM ALL
          OTHER REPRESENTATIONS, WARRANTIES AND CONDITIONS, EXPRESS OR IMPLIED,
          INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF
          MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. SOME PROVINCES
          DO NOT PERMIT THE EXCLUSION OF CERTAIN IMPLIED WARRANTIES OR
          CONDITIONS. THEREFORE, THE FOREGOING DISCLAIMERS MAY NOT APPLY TO YOU.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          6. LIMITATION OF LIABILITY AND REMEDIES
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          6.1 LIMITATION OF LIABILITY. IN NO EVENT WILL WE BE LIABLE FOR ANY
          LOSSES OR DAMAGES INCURRED BY YOU, WHETHER DIRECT, INDIRECT,
          INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL, INCLUDING LOST OR
          ANTICIPATED PROFITS, SAVINGS, INTERRUPTION TO BUSINESS, LOSS OF
          BUSINESS OPPORTUNITIES, LOSS OF BUSINESS INFORMATION, THE COST OF
          RECOVERING SUCH LOST INFORMATION, THE COST OF SUBSTITUTE INTELLECTUAL
          PROPERTY OR ANY OTHER PECUNIARY LOSS ARISING FROM THE USE OF, OR THE
          INABILITY TO USE, THE LICENSED SOFTWARE REGARDLESS OF WHETHER YOU HAVE
          ADVISED US OR WE HAVE ADVISED YOU OF THE POSSIBILITY OF SUCH DAMAGES.
          OUR AGGREGATE LIABILITY IN RESPECT OF ANY AND ALL CLAIMS WILL BE
          LIMITED TO ONE HUNDRED ($100.00) DOLLARS. THE FOREGOING LIMITATIONS
          APPLY REGARDLESS OF THE CAUSE OR CIRCUMSTANCES GIVING RISE TO SUCH
          LOSS, DAMAGE OR LIABILITY, EVEN IF SUCH LOSS, DAMAGE OR LIABILITY IS
          BASED ON NEGLIGENCE OR OTHER TORTS OR BREACH OF CONTRACT (INCLUDING
          FUNDAMENTAL BREACH OR BREACH OF A FUNDAMENTAL TERM). NEITHER YOU NOR
          WE MAY INSTITUTE ANY ACTION IN ANY FORM ARISING OUT OF THIS AGREEMENT
          MORE THAN ONE (1) YEAR AFTER THE CAUSE OF ACTION HAS ARISEN. SOME
          PROVINCES DO NOT ALLOW THE EXCLUSION OF LIMITATION OF INCIDENTAL OR
          CONSEQUENTIAL DAMAGES SO THE ABOVE EXCLUSIONS MAY NOT APPLY.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          6.2 Dispute Resolution. You acknowledge that We possess valuable
          confidential and proprietary information, including trade-marks and
          business practices, which would be damaging to Us if revealed in open
          court. You further acknowledge and agree that it is preferable to
          resolve all disputes between Us and You confidentially, individually
          and in an expeditious and inexpensive manner. We and You accordingly
          acknowledge and agree that private dispute resolution is preferable to
          court actions. Before commencing any arbitration in the manner set out
          in Section 6.3 below, We and You shall first attempt to resolve any
          dispute or differences between the both of us by way of good faith
          negotiation. The good faith negotiation shall commence by each of Us
          and You communicating our position regarding the complaint, claim,
          dispute or controversy to the other party, and how the both of us
          should resolve the dispute. We and You shall then make good faith
          efforts to negotiate a resolution of the claim, dispute or
          controversy. Neither We nor You shall commence any arbitral
          proceedings unless and until the good faith negotiation fails.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          6.3 ARBITRATION. ANY CLAIM, DISPUTE OR CONTROVERSY (WHETHER IN
          CONTRACT, TORT OR OTHERWISE, WHETHER PRE-EXISTING, PRESENT OR FUTURE,
          AND INCLUDING STATUTORY, COMMON LAW, INTENTIONAL TORT AND EQUITABLE
          CLAIMS CAPABLE IN LAW OF BEING SUBMITTED TO BINDING ARBITRATION)
          AGAINST US, Our agents, employees, officers, directors, successors,
          assigns or affiliates (collectively, for purposes of this paragraph,
          “Licensor Group”) arising from or relating to this Agreement, its
          interpretation or the breach, termination or validity thereof, the
          relationships between the parties, whether pre-existing, present or
          future (including, to the full extent permitted by applicable law,
          relationships with third parties who are not signatories to this
          Agreement), Licensor Group’s advertising or any related purchase SHALL
          BE RESOLVED EXCLUSIVELY AND FINALLY BY BINDING ARBITRATION
          ADMINISTERED BY THE CANADIAN ARBITRATION ASSOCATION under its Code of
          Procedure and any specific procedures for the resolution of small
          claims and/or consumer disputes then in effect (available via the
          Internet at https://canadianarbitrationassociation.ca/, or via
          telephone at 1-800-856-5154). The arbitration will be limited solely
          to the dispute or controversy between Customer and Licensor Group. Any
          award of the arbitrator(s) shall be final and binding on each of us,
          and may be entered as a judgment in any court of competent
          jurisdiction. Information may be obtained, and claims may be filed
          with the Canadian Arbitration Association at 180 Duncan Mill Road, 4th
          Floor, Toronto, Ontario, M3B 1Z6, or by email at
          info@canadianarbitrationassociation.ca, or by online filing at
          https://canadianarbitrationassociation.ca/.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          7. SUCCESSORS AND ASSIGNS
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          7.1 Successors and Assigns. You may not assign Your rights and duties
          under this Agreement to any party at any time. This Agreement will
          enure to the benefit of and will be binding on Us and our respective
          successors and permitted assigns. In the event of corporate merger,
          amalgamation, divestiture or asset sale, We will have the right to
          transfer and assign Our rights and obligations hereunder to any third
          party (the “Assignee”), upon written notice to You, provided that We
          cause the Assignee to agree in writing to all the terms contained in
          this Agreement.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          8. UPGRADES
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          8.1 Upgrades. Other than our obligation under Section 2.4(b), We shall
          have no other obligations to provide updates or support services to
          You. Obligations or expectations with regard to product upgrades,
          enhancements, support or remedies for errors, defects or deficiencies
          will be limited to those expressly set forth in a separate agreement
          between Us and You. In the absence of such an agreement between Us and
          You, We will use reasonable efforts to provide ongoing support and
          remedies to identified errors and defects, on a time and material
          basis, at Our then current commercial rates.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          9. TERM
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.1 Term. The term of this Agreement will commence on the date of
          Your agreement to these terms and shall continue for the same term as
          the Usage Agreement.
        </Text>

        <Text style={[styles.header, sharedStyles["textColour_" + theme]]}>
          10. GENERAL
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.1 Consents. Any consent required under this Agreement will not be
          unreasonably withheld.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.2 Captions. The Article and paragraph headings used herein are for
          convenience only and are not a part of this Agreement and will not be
          used in construing it.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.3 Entire Agreement. This Agreement, the Terms and Conditions, and
          the Privacy Policy encompass the entire agreement of the Parties, and
          no amendment to the terms of this Agreement will be effective unless
          in writing and signed by both parties hereto.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.4 Equitable Relief. You agree that any breach of this Agreement by
          You would cause irreparable damage, and that, in event of such breach,
          in addition to any and all remedies at law, We will have the right to
          an injunction, specific performance or other equitable relief to
          prevent the continuous violations of the terms of this Agreement.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.5 Force Majeure. Notwithstanding anything herein to the contrary,
          We shall not be liable for any delay or failure in performance caused
          by circumstances beyond Our reasonable control.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.6 Relationship of the Parties. This Agreement does not constitute a
          partnership or joint venture, and nothing herein contained is intended
          to constitute, nor will it be construed to constitute, such a
          partnership or joint venture. Except as expressly provided in this
          Agreement, neither We nor You will have any power or authority to act
          in the name or on behalf of the other party, or to bind the other
          party to any legal agreement.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.7 Severability. The provisions of this Agreement are to be
          considered separately, and if any provision hereof should be found by
          any court or competent jurisdiction to be invalid or unenforceable,
          this Agreement will be deemed to have effect as if such provision were
          severed from this Agreement.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.8 Number and Gender. Where the context permits, the singular
          includes the plural, and the masculine includes the feminine and vice
          versa.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.9 Notices. All notices and communications required or permitted
          under this Agreement will be in writing and will be sent by registered
          or certified mail, postage prepaid, return receipt requested,
          facsimile transmission (the “Fax”), with confirmed answer back, or
          electronic mail, with confirmation of receipt, to Us or You at the
          respective addresses we provide to each other or to such other address
          as We or You may from time to time specify by notice to the other
          given as provided in this paragraph. In Our case, Our address
          isvlisted in the App's posting. A notice given in electronic form
          shall be admissible in judicial or administrative proceedings based
          upon or relating to this Agreement to the same extent and subject to
          the same conditions as other business documents and records originally
          generated and maintained in printed form.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.10 JURISDICTION. THE PARTIES HEREBY IRREVOCABLY ATTORN TO THE
          EXCLUSIVE JURISDICTION OF THE COURTS OF THE PROVINCE OF MANITOBA WITH
          RESPECT TO ANY DISPUTE ARISING HEREUNDER.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.11 GOVERNING LAW. THIS AGREEMENT AND ANY SALES THEREUNDER SHALL BE
          DEEMED TO HAVE BEEN MADE IN THE PROVINCE OF MANITOBA AND SHALL BE
          CONSTRUED AND INTERPRETED ACCORDING TO THE LAWS OF THE PROVINCE OF
          MANITOBA AND THE APPLICABLE LAWS OF CANADA. We and You expressly
          exclude the United Nations Convention on Contracts for the
          International Sale of Goods, and the International Sale of Goods Act
          (Manitoba), as amended, replaced or re-enacted from time to time.
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          10.12 Revisions to this Agreement. We may at any time revise the terms
          of this Agreement by updating these terms and by providing notice to
          you of that change.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignSelf: "stretch",
    fontSize: 12,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginTop: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 30,
  },
  header: {
    alignSelf: "stretch",
    fontSize: 12,
    fontFamily: ValueSheet.fonts.primaryBold,
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

export default UserAgreement;
