// Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details.
import { ref } from 'vue';

export function useIso18974Data() {
  const sections18974 = ref([
    {
      title: 'Section 1: Program foundation',
      items: [
        {
          text: 'We have a documented policy governing the open source security assurance of Supplied Software.',
          checked: false,
        },
        {
          text: 'We have a documented procedure to communicate the existence of the open source policy to all Program Participants.',
          checked: false,
        },
        {
          text: 'We have identified the roles and responsibilities that affect the performance and effectiveness of the Program.',
          checked: false,
        },
        {
          text: 'We have identified and documented the competencies required for each role.',
          checked: false,
        },
        {
          text: 'We have identified and documented a list of Program Participants and how they fill their respective roles.',
          checked: false,
        },
        {
          text: 'We have documented the assessed competence for each Program Participant.',
          checked: false,
        },
        {
          text: 'We have a way to document periodic reviews and changes made to our processes.',
          checked: false,
        },
        {
          text: 'We have a way to verify that our processes align with current company best practices and staff assignments.',
          checked: false,
        },
        {
          text: 'Our Program Participants are aware of the open source security assurance policy and where to find it;',
          checked: false,
        },
        {
          text: 'Our Program Participants are aware of relevant open source objectives;',
          checked: false,
        },
        {
          text: 'Our Program Participants are aware of contributions expected to ensure the effectiveness of the Program;',
          checked: false,
        },
        {
          text: 'Our Program Participants are aware of the implications of failing to follow the Program requirements.',
          checked: false,
        },
        {
          text: 'We have a written statement clearly defining the scope and limits of the Program.',
          checked: false,
        },
        {
          text: 'We have a set of metrics to measure Program performance.',
          checked: false,
        },
        {
          text: 'We have Documented Evidence from each review, update, or audit to demonstrate continuous improvement.',
          checked: false,
        },
        {
          text: 'We have a method to identify structural and technical threats to the Supplied Software;',
          checked: false,
        },
        {
          text: 'We have a method for detecting existence of Known Vulnerabilities in Supplied Software;',
          checked: false,
        },
        {
          text: 'We have a method for following up on identified Known Vulnerabilities;',
          checked: false,
        },
        {
          text: 'We have a method to communicate identified Known Vulnerabilities to customer base when warranted;',
          checked: false,
        },
        {
          text: 'We have a method for analyzing Supplied Software for newly published Known Vulnerabilities post release of the Supplied Software;',
          checked: false,
        },
        {
          text: 'We have a method for continuous and repeated Security Testing is applied for all Supplied Software before release;',
          checked: false,
        },
        {
          text: 'We have a method to verify that identified risks will have been addressed before release of Supplied Software;',
          checked: false,
        },
        {
          text: 'We have a method to export information about identified risks to third parties as appropriate.',
          checked: false,
        },
      ],
    },
    {
      title: 'Section 2: Relevant tasks defined and supported',
      items: [
        {
          text: 'We have a method to allow third parties to make Known Vulnerability or Newly Discovered Vulnerability enquires (e.g., via an email address or web portal that is monitored by Program Participants);',
          checked: false,
        },
        {
          text: 'We have an internal documented procedure for responding to third party Known Vulnerability or Newly Discovered Vulnerability inquiries.',
          checked: false,
        },
        {
          text: 'We have documented the people, group or functions related to the Program.',
          checked: false,
        },
        {
          text: 'We have ensured the identified Program roles have been properly staffed and adequate funding has been provided.',
          checked: false,
        },
        {
          text: 'We have ensured expertise available is to address identified Known Vulnerabilities;',
          checked: false,
        },
        {
          text: 'We have a documented procedure that assigns internal responsibilities for Security Assurance.',
          checked: false,
        },
      ],
    },
    {
      title: 'Section 3: Open source software content review and approval',
      items: [
        {
          text: 'We have a documented procedure ensuring all Open Source Software used in the Supplied Software is continuously recorded across the lifecycle of the Supplied Software. This includes an archive of all Open Source Software used in the Supplied Software.',
          checked: false,
        },
        {
          text: 'We have open source component records for the Supplied Software which demonstrate the documented procedure was properly followed.',
          checked: false,
        },
        {
          text: 'We have a documented procedure for handling detection and resolution of Known Vulnerabilities for the Open Source Software components of the Supplied Software.',
          checked: false,
        },
        {
          text: 'We have open source component records for the Supplied Software which track identified Known Vulnerabilities and action(s) taken (including even if no action was required).',
          checked: false,
        },
      ],
    },
    {
      title: 'Section 4: Adherence to the specification requirements',
      items: [
        {
          text: 'We have documentation confirming that the Program meets all the requirements of this specification.',
          checked: false,
        },
        {
          text: 'We have documentation confirming that Program conformance was reviewed within the last 18 months.',
          checked: false,
        },
      ],
    },
  ]);

  function proportionChecked18974() {
    let checkedCount = 0;
    let totalCount = 0;
    sections18974.value.forEach((section) => {
      section.items.forEach((items) => {
        totalCount++;
        if (items.checked) {
          checkedCount++;
        }
      });
    });
    return Math.round((checkedCount / totalCount) * 100);
  }

  return { sections18974, proportionChecked18974 };
}
