import type { NextPage } from "next";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import DropDown from "../../components/Policies/DropDown";

const TermsOfService: NextPage = () => {
  return (
    <>
      <CustomHead title="Terms Of Service" />
      <Layout>
        <div className="customContainer my-4">
          <DropDown />

          <h1 className="mb-4">Terms Of Service</h1>

          <h6>Welcome to caradil!</h6>

          <p className="mb-2">
            These terms and conditions outline the rules and regulations for the
            use of Caradil's Website, located at https://caradil.com.
          </p>

          <p>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use caradil if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>

          <br />
          <h3>Introduction</h3>
          <p>
            Caradil and its subsidiaries (collectively, “Caradil”, “we”, or
            “us”), provide an online car sharing platform that connects vehicle
            owners with travelers, locals and tourists seeking to book those
            vehicles. Caradil is accessible online at&nbsp;
            <a
              href="https://caradil.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Caradil.com
            </a>
            . &nbsp; The Caradil websites, blog and associated services are
            collectively referred to as “the Services”. By accessing or using
            the Services, including by communicating with us or other Caradil
            users, you agree to comply with, and be legally bound by, the
            provisions of these Terms of Service (these “Terms”), whether or not
            you become a registered user of the Services. These Terms govern
            your access to and use of the Services and constitute a binding
            legal agreement between you and Caradil.
          </p>

          <br />
          <p>
            <strong>Modification.</strong>&nbsp;Caradil reserves the right, at
            our sole discretion, to modify the Services or to modify the
            Agreement, including these Terms, at any time. If we modify these
            Terms, we will post the modification on the Services. If you
            continue to access or use the Services after we have posted a
            modification or have provided you with notice of a modification, you
            are indicating that you agree to be bound by the modified terms. If
            the modified terms are not acceptable to you, your sole recourse is
            to stop using and accessing the Services and close your Caradil
            Account within 30 days. If you choose to close your Caradil Account,
            the previous effective version of these Terms will apply to you,
            unless you use the Services during the intervening 30 day period, in
            which case the new version of these Terms will apply to you.
          </p>
          <br />
          <h3 className="mb-2">Eligibility, registration, verification</h3>
          <h5>Eligibility</h5>
          <p>
            The Services are intended solely for persons who are 18 years and
            above of age. Any use of the Services by anyone that does not meet
            these age requirements is expressly prohibited.
          </p>
          <br />
          <h5>Registration</h5>
          <p>
            To access certain features of the Services, you must sign up for an
            account with us (a “Caradil Account”). You can create a Caradil
            Account by providing us your first and last name, email address, and
            creating a password. When you book a vehicle as a traveler or guest
            (“guest”), you provide us with certain additional information about
            yourself. Similarly, when you list a vehicle as a vehicle owner or
            host (“host”), you provide us with certain additional information
            about yourself and your vehicle(s) (if applicable). You must provide
            accurate, current, and complete information during the registration,
            booking, and/or listing process. You must keep your Caradil Account
            up to date at all times.
          </p>
          <br />
          <h5>Verification</h5>
          <p>
            Where permitted, Caradil has the right, but not the obligation, to
            undertake screenings, checks, and engage in processes designed to
            (1) help verify the identities or check the backgrounds of users,
            including driving history and driver’s license validity and (2)
            verify vehicle details. Caradil does not endorse any vehicle, user,
            or a user’s background, or commit to undertake any specific
            screening process. Caradil may in its sole discretion use
            third-party services to verify the information you provide to us and
            to obtain additional related information and corrections where
            applicable, and you hereby authorize Caradil to request, receive,
            use, and store such information. Caradil may permit or refuse your
            request to book or list a vehicle in its sole and absolute
            discretion. Caradil may, but does not commit to, undertake efforts
            to ensure the safety of vehicles shared through the Services. We do
            not make any representations about, confirm, or endorse the safety,
            roadworthiness, or legal status of any vehicles beyond our policies
            that require hosts to ensure their vehicles are in safe and operable
            condition, legally registered to be driven on public roads.
          </p>
          <br />
          <h3 className="mb-2">Fees</h3>
          {/* <h4>Fees</h4> */}
          <p>
            The fees we charge for using the Services and other cost structures
            will be itemized at checkout for guests. You can verify the amount
            for your trip at checkout before you submit your trip request. Hosts
            can view earnings on the Host Dashboard. When you provide Caradil a
            payment method, you authorize Caradil, or third-party service
            providers acting on behalf of Caradil, to store your payment
            credential for future use in the event you owe Caradil any money.
          </p>
          <br />
          <h3>Your commitments</h3>
          <p>
            You agree that you will always use your Caradil Account and the
            Services in compliance with these Terms, applicable law, and any
            other policies and standards provided to you by Caradil.
          </p>
          <br />
          <p>
            <strong>Account Activity.</strong>&nbsp;You are, and will be solely
            responsible for, all of the activity that occurs through your
            Caradil Account. Keep your Caradil Account information, including
            your password, secure. You agree that you will not disclose your
            password to any third party and that you will take sole
            responsibility for any activities or actions under your Caradil
            Account, whether or not you have authorized such activities or
            actions. You will immediately notify Caradil of any actual or
            suspected unauthorized use of your Caradil Account. We are not
            responsible for your failure to comply with this clause, or for any
            delay in shutting down or protecting your Caradil Account unless you
            have reported unauthorized access to us.
          </p>
          <br />
          <h3>Content</h3>
          <p>
            <strong>Caradil Content and User Content License.</strong>
            &nbsp;Subject to your compliance with the provisions of these Terms,
            Caradil grants you a limited, revocable, non-exclusive,
            non-transferable license, to access and view any Caradil and/or user
            content to which you are permitted access, solely for your personal
            and non-commercial purposes. You have no right to sublicense the
            license rights granted in this section. No licenses or rights are
            granted to you by implication or otherwise under any intellectual
            property rights owned or controlled by Caradil or its licensors,
            except for the licenses and rights expressly granted in these Terms.
          </p>
          <br />
          <p>
            <strong>User Content.</strong>&nbsp;We may, in our sole discretion,
            permit you to post, upload, publish, submit or transmit content
            through the Services such as photographs of you and your vehicle(s),
            reviews, feedback, and descriptions of you, your vehicle, or trip.
            By making available any content on or through the Services, or
            through Caradil promotional campaigns, you grant Caradil a
            worldwide, irrevocable, perpetual (or for the term of the
            protection), non-exclusive, transferable, royalty-free license, with
            the right to sublicense, to use, view, copy, adapt, modify,
            distribute, transfer, publicly display, publicly perform, transmit,
            stream, broadcast, access, view, and otherwise exploit such content
            on, through, by means of, or to promote or market the Services.
            Except as described above with respect to Caradil photography
            provided to hosts, Caradil does not claim any ownership rights in
            any such content and nothing in these Terms will be deemed to
            restrict any rights that you may have to use and exploit any such
            content.
          </p>
          <br />
          <h3>Prohibited activities</h3>
          <p className="mb-3">
            In connection with your use of or access to the Services, you agree
            that you will not, nor advocate, encourage, request, or assist any
            third party to:
          </p>
          <h5>Violate any law, including:</h5>
          <ul>
            <li>
              Post false, inaccurate, misleading, defamatory, or libelous
              content
            </li>
            <li>
              Infringe, reproduce, perform, display, distribute, reverse
              engineer, or prepare derivative works from content that belongs to
              or is licensed to Caradil, or that comes from the Services and
              belongs to another Caradil user or to a third party, including
              works covered by any copyrights, trademark, patent, or other
              intellectual property, privacy, publicity, moral, or contractual
              rights, except with prior express written permission of Caradil
            </li>
          </ul>
          <h5>
            Dilute, tarnish, or otherwise harm the Caradil brand in any way,
            including:
          </h5>
          <ul>
            <li>
              Through unauthorized use of the Services and/or user content
            </li>
            <li>
              Registering and/or using "Caradil" or derivative terms in domain
              names, trade names, trademarks, or otherwise
            </li>
            <li>
              Registering and/or using domain names, trade names, trademarks,
              social media account names, or other means of identification that
              closely imitate or are confusingly similar to Caradil domains,
              trademarks, taglines, promotional campaigns, or Caradil and/or
              user content
            </li>
          </ul>
          <h5>
            Provide or submit any false or misleading information, including:
          </h5>
          <ul>
            <li>
              False name, date of birth, driver’s license details, payment
              method, insurance, or other personal information
            </li>
            <li>
              In relation to a claim (for example about damage to a vehicle)
            </li>
            <li>
              By registering for a Caradil Account on behalf of an individual
              other than yourself
            </li>
            <li>
              Impersonating any person or entity, or falsifying or otherwise
              misrepresenting yourself or your affiliation with any person or
              entity
            </li>
          </ul>
          <h5>Fail to honor your commitments, including:</h5>
          <ul>
            <li>
              Fail, as either a guest or host, to timely deliver, make
              available, or return any vehicle and optional Extras, unless you
              have a valid reason
            </li>
            <li>
              Use the Services to find a host or guest, and then complete a
              transaction partially or wholly independent of the Services, for
              any reason including but not limited to circumventing the
              obligation to pay any fees related to the provision of the
              Services by Caradil (aka, gray market transactions, which do not
              necessarily require the exchange of money)
            </li>
            <li>
              Transfer your Caradil Account and/or user ID to another party
              without our consent
            </li>
          </ul>
          <h5>Harm or threaten to harm users of our community, including:</h5>
          <ul>
            <li>
              Harass, stalk, or defame any other Caradil user or collect or
              store any personally identifiable information about any other user
              other than for purposes of transacting as a host or guest in
              accordance with these Terms
            </li>
            <li>
              Engage in physically or verbally abusive or threatening conduct
            </li>
            <li>
              Use the Services to transmit, distribute, post, or submit any
              information concerning any other person or entity, including
              without limitation, photographs of others without their
              permission, personal contact information, payment method details,
              or account numbers
            </li>
            <li>
              Treat anyone differently based on the way they look, who they
              love, what they believe, how they self-identify, where they are
              from, or when they were born. Discrimination of any kind is not
              tolerated in the Caradil community
            </li>
            <li>
              Sue or assert legal claims against Caradil or a Caradil user in
              any manner prohibited or waived by these Terms
            </li>
          </ul>
          <h5>
            Use the Services for your own unrelated purposes, including to:
          </h5>
          <ul>
            <li>
              Contact another Caradil user for any purpose other than in
              relation to a booking, vehicle, listing, or the use of the
              Services by such user
            </li>
            <li>
              Commercialize any content found on the Services or software
              associated with the Services, including reviews
            </li>
            <li>
              Harvest or otherwise collect information about users without their
              and our consent
            </li>
            <li>
              Recruit or otherwise solicit any user to join third-party services
              or websites that are competitive to Caradil, without our prior
              written approval
            </li>
          </ul>
          <h4>Interfere with the operation of the Services, including by:</h4>
          <ul>
            <li>Interfering with any other user’s listings</li>
            <li>
              Using the Services in connection with the distribution or posting
              of unsolicited commercial messages (e.g., spam)
            </li>
            <li>
              Distributing viruses or any other technologies such as cancel
              bots, Trojan horses, harmful code, flood pings, denial-of-service
              attacks, backdoors, packet or IP spoofing, forged routing or
              e-mail address information, or similar methods or technology that
              may disrupt or interfere with the operation or provision of the
              Services, or harm Caradil or the interests or property of others
            </li>
            <li>
              Bypassing robot exclusion headers, interfering with the working of
              the Services, or imposing an unreasonable or disproportionately
              large load on our infrastructure
            </li>
            <li>
              Systematically retrieving data or other content from the Services
              to create or compile, directly or indirectly, a collection,
              compilation, database, directory, or the like, whether by manual
              methods, or through the use of bots, crawlers, spiders, or
              otherwise
            </li>
            <li>
              Using, displaying, mirroring, or framing the Services or any
              individual element within the Services, the Caradil name, any
              Caradil trademark, logo, or other proprietary information, or the
              layout and design of any page or form contained on a page in the
              Services, without the express written consent of Caradil
            </li>

            <li>
              Attempting to probe, scan, or test the vulnerability of any of our
              system or network or breach any security or authentication
              measures
            </li>
            <li>
              Avoiding, bypassing, removing, deactivating, impairing,
              descrambling, or otherwise circumventing any technological measure
              implemented by Caradil or any of our service providers or any
              other third party (including another user) to protect the Services
            </li>
            <li>
              Forging any TCP/IP packet header or any part of the header
              information in any email or newsgroup posting, or in any way using
              the Services to send altered, deceptive, or false
              source-identifying information
            </li>
            <li>
              Attempting to decipher, decompile, disassemble, or reverse
              engineer any of the software used to provide the Services
            </li>
            <li>
              Endeavoring to circumvent a suspension, termination, or closure of
              your Caradil Account or the account of another Caradil user,
              including, but not limited to, creating a new Caradil Account or
              listing vehicles affiliated with or registered to a Caradil
              Account holder that has been suspended, terminated, or closed
            </li>
          </ul>
          <br />
          <h3 className="mb-3">Other legal matters</h3>
          <p>
            <strong>Violations.</strong>&nbsp;Caradil has the right, but not the
            obligation, to investigate, pursue, and seek to prosecute, litigate,
            or refer to law enforcement, violations of the Agreement to the
            fullest extent permissible by the law.
          </p>
          <p>
            Caradil reserves the right, at any time and without prior notice, in
            accordance with applicable law, to remove or disable access to any
            content that Caradil, at its sole discretion, considers to be
            objectionable for any reason, in violation of these Terms, or
            otherwise harmful to the Services or our community. If we believe
            you are abusing Caradil, our users, or any other person in any way
            or violating the letter or spirit of any of these Terms, we may, in
            our sole discretion and without limiting other remedies, limit,
            suspend, or terminate your Caradil Account and access to the
            Services, remove hosted content, deny a damage claim, remove or
            demote your listings, reduce or eliminate any discounts, and take
            technical and/or legal steps to prevent you from using the Services.
            Additionally, we reserve the right to refuse or terminate access to
            the Services to anyone for any reason at our discretion to the full
            extent permitted under applicable law.
          </p>
          <br />
          <p>
            <strong>Communications with you.</strong>&nbsp;In order to contact
            you more efficiently, you agree that we may at times contact you
            using autodialed or prerecorded message calls or text messages at
            your phone number(s). We may place such calls or texts primarily to
            confirm your signup, provide notices regarding your Caradil Account
            or Caradil Account activity, investigate or prevent fraud, or
            communicate urgent messages. We may share your phone number(s) with
            service providers with whom we contract to assist us in pursuing
            these interests. We will not share your phone number(s) with third
            parties for their own purposes without your consent. Standard
            telephone minute and text and data charges may apply. Where Caradil
            is required to obtain your consent for such communications, you may
            choose to revoke your consent.
          </p>
          <p>
            You authorize Caradil and its service providers, without further
            notice or warning and in our discretion, to monitor or record
            telephone conversations you or anyone acting on your behalf has with
            Caradil or its agents for quality control and training purposes. You
            acknowledge and understand that your communications with Caradil may
            be overheard, monitored, or recorded without further notice or
            warning.
          </p>
          <br />
          <p>
            <strong>Non-disparagement.</strong>&nbsp;The Parties agree that they
            will not take any action that will harm the reputation of the other
            Party, or which would reasonably be expected to lead to unwanted or
            unfavorable publicity to either of the other Party.
          </p>
          <br />
          <h3>Specific terms for hosts</h3>
          <p className="mb-3">
            The following sections also apply if you share your vehicle through
            the Services:
          </p>
          <h4>Host commitments</h4>
          <p>
            As a host, you commit that you will provide a safe and legally
            registered and insured vehicle, with current license plates, with a
            clean (non-salvage/branded/written off) title, and in good
            mechanical condition. You will provide such vehicle on time but only
            to a guest who is listed on the Services. You commit that your
            listings will be complete and accurate and you will honor all
            representations made in your listings, including honoring the price
            quoted to a guest. You will not cancel a booking for the purpose of
            seeking a higher price from a guest. You will not offer any vehicle
            or optional Extra that you do not yourself own or have authority to
            share or that may not be shared for compensation pursuant to the
            terms and conditions of any agreement with a third party, including,
            but not limited to, a lease or financing agreement. You will not
            offer any Extra that is not safe, clean, and acceptable for the use
            it is intended. You will not offer any vehicle that is the subject
            of a missing or stolen vehicle report. You will not offer any
            vehicle that is the subject of a safety recall without first
            properly addressing the matter subject to the recall. You will not
            offer a vehicle that is not roadworthy (i.e., not “street legal”) in
            the location where it is shared and it will not have any illegal
            modifications to any part of the vehicle. You will remove any
            firearms or other weapons from your vehicle prior to providing it to
            a guest. You will repay loans related to your Caradil business on
            time and in full.
          </p>
          <br />
          <h4>Information given at registration</h4>
          <p>
            When you sign up for Caradil, you will identify passenger vehicle(s)
            that you want to list for sharing through the Services. You may only
            use the Services in connection with vehicles that you own or
            otherwise have all the necessary rights and permissions to share for
            compensation.
          </p>
          <br />
          <h4>Caradil photography</h4>
          <p>
            Caradil may offer hosts the option of having photographers take
            photographs of their vehicles and/or hosts with their vehicles
            (“Images”). You alone are responsible for using the Images in
            connection with your Caradil listing and you agree that you will
            cease using the Images if they no longer accurately represent your
            vehicle. You agree that Caradil is the sole and exclusive owner - or
            exclusive licensee, as allowed by applicable law - of all right,
            title, and interest in all copyrights, trademark rights, and any and
            all other intellectual property rights, including right of
            publicity, worldwide, in the Images regardless of whether you
            include them in your listing, and you shall take no action to
            challenge or object to the validity of such rights or Caradil’s
            ownership or registration thereof. You acknowledge that Caradil may
            use the Images for advertising, marketing, commercial, and other
            business purposes in any media or platform, whether in relation to
            your listing or otherwise, without further notice or compensation.
            Further, you waive any and all rights to royalties or moral rights
            you may have in the Images. If you use the Caradil photography
            program, you agree that you will not use the Images in connection
            with sharing your vehicle on any platform, website, or application
            other than Caradil. At Caradil’s request, you will execute documents
            and take such further acts as Caradil may reasonably request to
            assist Caradil to acquire, perfect, and maintain its intellectual
            property rights and other legal protection in the Images.
          </p>
          <br />
          <h4>Vehicle availability</h4>
          <p>
            Once a trip is booked, you must make the vehicle available or
            deliver the vehicle as expected by the guest.
          </p>
          <br />
          <h4>Pricing, earnings, and payments</h4>
          <p>
            You will have the ability to set and revise the vehicle’s pricing as
            you choose. Caradil will pay you the amount collected from guests
            that book your vehicle, less the applicable fees payable to Caradil.
          </p>
          <br />
          <h4>Maintenance</h4>
          <p>
            You are required to regularly check your vehicle for any defects in
            its operations or safety. You promise that, at all times, your
            vehicle will be in safe and roadworthy condition, in good mechanical
            condition, and in full compliance with all applicable inspection and
            registration requirements. You will only list vehicles with a clean,
            non-salvaged, non-written off, non-washed, and non-branded title.
            You agree to respond to any applicable recall or similar safety
            notices and to complete any recommended action before allowing your
            vehicle to be booked. In addition, if Caradil believes that your
            vehicle does not conform to reasonable standards, Caradil may notify
            you and reserves the right to remove or decline listing your vehicle
            until its concerns have been resolved. Caradil may, but does not
            commit to, undertake efforts to ensure the safety of vehicles booked
            through the Services.
          </p>
          <br />

          <h3>Termination</h3>
          <p>
            You may discontinue your use of the Services at any time and Caradil
            may terminate your access to the Services and remove any listings
            for any reason or no reason to the extent permissible under
            applicable law. Termination of access to the Services will not
            release a Party from any obligations it incurred prior to the
            termination and Caradil may retain and continue to use any
            information, including but not limited to photography, previously
            provided by you. Termination of the Agreement will not have any
            effect on the disclaimers, waiver or liability limitations, or legal
            disputes provisions under the Agreement and/or any fees due, and all
            of those terms will survive any termination of the Agreement.
          </p>
          <br />
          <h4>No vehicle transfer or assignment</h4>
          <p>
            Except as otherwise provided herein, guests and hosts agree that
            nothing in these Terms constitutes an actual or purported transfer
            or assignment of any right or interest in a vehicle or optional
            Extras shared through the Services.
          </p>
          <br />
          <h4>Disclaimers</h4>

          <h5>Not a rental car business</h5>
          <p>
            Caradil is not a rental car business. It does not own a fleet of
            vehicles, and is not in the business of renting vehicles to the
            public. Caradil provides an online platform where vehicle owners and
            those in need of a vehicle can meet and share vehicles amongst
            themselves subject to these Terms.
          </p>
          <br />
          <h5>Rounding off</h5>
          <p>
            Caradil may, in its sole discretion, round up or down amounts that
            are payable from or to hosts or guests to the nearest whole
            functional base unit in which the currency is denominated (e.g. to
            the nearest kenyan shilling or dollar ) unless explicitly prohibited
            under applicable law.
          </p>

          {/* <h4>Translations</h4>
          <p>
            Where Caradil has provided you with a translation of the English
            language version of these Terms or any Policies, in case of any
            wording discrepancies between the English and any other versions of
            the Terms and any Policies, the English language wording takes
            precedence.
          </p> */}
        </div>
      </Layout>
    </>
  );
};

export default TermsOfService;
