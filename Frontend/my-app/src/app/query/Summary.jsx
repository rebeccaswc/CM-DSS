import React, {useEffect, useState} from "react";
import axios from 'axios';
import { remark } from 'remark';
import html from 'remark-html';

function Summary({index}) {

  const [contentHtml, setContentHtml] = useState('');

  //test 
  var text = {
    "alertID": "1",
    "report": "# Threat Report\n\n## Overview\n- **Alert ID:** 1\n- **Threat Name:** Incident Report for Rule ID: 5710\n- **Date of Occurrence:** April 11, 14:04:27\n- **Industries Affected:** All Industries\n- **Impact:** \n  - **Severity Level:** 5 (Critical)\n  - **Fired Times:** 349\n\n## Key Point\n- **Rule Description:** sshd: Attempt to login using a non-existent user\n- **Source IP:** 170.64.161.109\n- **MITRE ATT&CK Techniques:** \n  - **Technique:** Password Guessing\n  - **Tactic:** SSH Brute Force Attack\n\n## Analysis\nThe alert indicates a significant number of login attempts (349) from a single source IP address (170.64.161.109) targeting SSH services. The attempts were made using non-existent usernames, suggesting a brute-force attack aimed at compromising SSH access. Given the severity level of 5, this incident poses a critical risk to the affected systems, potentially leading to unauthorized access if successful.\n\n## Mitigation Recommendations\n1. **Review and Update Authentication Mechanisms:**\n   - Implement strong password policies, including complexity requirements and regular password changes.\n   - Consider using multi-factor authentication (MFA) for SSH access to add an additional layer of security.\n   - Disable password-based authentication and enforce the use of SSH keys where possible.\n\n2. **Enhance Monitoring for Abnormal Login Attempts:**\n   - Set up alerts for multiple failed login attempts from the same IP address within a short time frame.\n   - Utilize intrusion detection systems (IDS) to monitor and log SSH access attempts.\n   - Regularly review logs for unusual patterns or repeated access attempts from suspicious IP addresses.\n\n3. **Block Malicious IP Addresses:**\n   - Implement firewall rules to block the source IP address (170.64.161.109) and any other known malicious IPs.\n   - Consider using geo-blocking to restrict access from regions that do not require SSH access.\n\n4. **Conduct a Security Audit:**\n   - Perform a thorough audit of SSH configurations and access controls.\n   - Ensure that only necessary services are exposed to the internet and that they are properly secured.\n\n5. **User Education and Awareness:**\n   - Train staff on recognizing phishing attempts and the importance of secure password practices.\n   - Encourage reporting of any suspicious activity"
  }


  useEffect(() => {

    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/solution', {
          params:  {index}
        });
        console.log(response.data);
        text = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    // fetchSummary();


    markdown_text();
  },[]);

  async function markdown_text(){
    const processedContent = await remark()
      .use(html)
      .process(text.report);

    const contentHtml = processedContent.toString();
    console.log("report:", text.report);
    setContentHtml(contentHtml);
  }

  const p = () => {
    print(contentHtml);
  }

  // return (
  //   <article className="flex flex-col px-8 py-6 w-full rounded-3xl max-md:px-5 max-md:max-w-full bg-gradient-to-br from-neutral-950 via-[#120d50] to-[#1a1095] rounded-[20px]">
  //     <div className="flex flex-wrap gap-5 justify-between mr-3 w-full max-md:mr-2.5 max-md:max-w-full">
  //       <div className="flex gap-3">
  //         <img
  //           loading="lazy"
  //           src="https://cdn.builder.io/api/v1/image/assets/TEMP/eee8e6c76ed6bf6d117a2f0c912c05bcd3b648b281aea4b3f2c4aba71bac4bb9?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
  //           alt=""
  //           className="object-contain shrink-0 aspect-square rounded-[30px] w-[41px]"
  //         />
  //         <div className="flex flex-col my-auto">
  //           <h2 className="text-xs font-bold">SUMMARY</h2>
  //           <p className="self-start mt-2 text-xs font-medium">
  //             Power by OpenAI
  //           </p>
  //         </div>
  //       </div>
  //       <img
  //         loading="lazy"
  //         src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc88d54b7de616c9cddbbc81fd85d2beabce7441758ca9a74292faecfb0c1239?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
  //         alt=""
  //         className="object-contain shrink-0 my-auto w-3.5 aspect-[0.87]"
  //       />
  //     </div>
  //     <hr className="shrink-0 mt-3 h-0 border border-solid border-neutral-400 max-md:max-w-full" />
  //     <div className="mt-3.5 mr-5 ml-6 text-xs font-bold max-md:mr-2.5 max-md:max-w-full">
  //       <h3 className="text-xl">{`Incident ${index} Assessment`}</h3>
  //       <h4 className="text-base">Summary</h4>
  //       <p className="font-light">
  //         {/* Incident 29088, titled "SAP - (Preview) File Downloaded From a
  //         Malicious IP Address," involves a high severity event where a user
  //         downloaded a file from an SAP system using a malicious IP address. The
  //         incident is related to the "Exfiltration" tactic and is currently in
  //         "New" status. */}
  //         `{text['report']}`
  //       </p>
  //       <h4 className="text-base">Entities Involved</h4>
  //       <p className="font-light">
  //         The entities involved in this incident are:
  //       </p>
  //       <ul className="font-light list-disc list-inside">
  //         <li>Host CPC-mscot-SOCOS (Windows)</li>
  //         <li>IP: 185.82.217.3</li>
  //         <li>Account: mscott@woodgrovems (AzureAD)</li>
  //       </ul>
  //       <h4 className="text-base">Supporting Evidence</h4>
  //       <p className="font-light">
  //         The IP address 185.82.217.3 has a reputation score of 100, classifying
  //         it as malicious. It is associated with known cyber threat intelligence
  //         profiles, such as Cobalt Strike an Silk Typhoon, and has exhibited
  //         suspicious behavior.
  //       </p>
  //       <h4 className="text-base">Confidence Level</h4>
  //       <p className="font-light">
  //         Based on the available evidence, the confidence level in the
  //         assessment of this incident is high.
  //       </p>
  //       <h4 className="text-base">Recommendations</h4>
  //       <ol className="font-light list-decimal list-inside">
  //         <li>
  //           Investigate the user's activities and the file downloaded from the
  //           malicious IP address to determine if any sensitive data was
  //           exfiltrated or if the user's account was compromised.
  //         </li>
  //         <li>
  //           Review the security policies and access controls for the user and
  //           their devices to ensure they are in line with the organization's
  //           security requirements.
  //         </li>
  //       </ol>
  //     </div>
  //   </article>
  // );

  return (
    <article className="flex flex-col px-8 py-6 w-full rounded-3xl max-md:px-5 max-md:max-w-full bg-gradient-to-br from-neutral-950 via-[#120d50] to-[#1a1095] rounded-[20px]">
      <div className="flex flex-wrap gap-5 justify-between mr-3 w-full max-md:mr-2.5 max-md:max-w-full">
        <div className="flex gap-3">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/eee8e6c76ed6bf6d117a2f0c912c05bcd3b648b281aea4b3f2c4aba71bac4bb9?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
            alt=""
            className="object-contain shrink-0 aspect-square rounded-[30px] w-[41px]"
          />
          <div className="flex flex-col my-auto">
            <h2 className="text-xs font-bold">SUMMARY</h2>
            <p className="self-start mt-2 text-xs font-medium">
              Power by OpenAI
            </p>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc88d54b7de616c9cddbbc81fd85d2beabce7441758ca9a74292faecfb0c1239?placeholderIfAbsent=true&apiKey=bae4f78d557141349e757a6705679bd5"
          alt=""
          className="object-contain shrink-0 my-auto w-3.5 aspect-[0.87]"
        />
      </div>
      <hr className="shrink-0 mt-3 h-0 border border-solid border-neutral-400 max-md:max-w-full" />
      <div className="mt-3.5 mr-5 ml-6 max-md:mr-2.5 max-md:max-w-full">
        <h3 className="text-xl">Incident Assessment</h3>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </article>

  );
}

export default Summary;
