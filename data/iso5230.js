// Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details.
import { ref } from 'vue';

export function useIso5230Data() {
  const sections5230 = ref([
    {
      title: 'Section 1: Program foundation',
      items: [
        {
          text: 'We have a documented policy governing the open source license compliance of supplied software.',
          checked: false,
        },
        {
          text: 'We have a documented procedure to communicate the existence of the open source policy to program participants.',
          checked: false,
        },
        {
          text: 'We have identified the roles and responsibilities that affect the performance and effectiveness of the program.',
          checked: false,
        },
        {
          text: 'We have identified and documented the competencies required for each role.',
          checked: false,
        },
        {
          text: 'We have documented the assessed competence for each program participant.',
          checked: false,
        },
        {
          text: 'We have documented the awareness of our program participants on the open source policy and where to find it.',
          checked: false,
        },
        {
          text: 'We have documented the awareness of our program participants on relevant open source objectives.',
          checked: false,
        },
        {
          text: 'We have documented the awareness of our program participants on contributions expected to ensure the effectiveness of the program.',
          checked: false,
        },
        {
          text: 'We have documented the awareness of our program participants on the implications of failing to follow the Program requirements.',
          checked: false,
        },
        {
          text: 'We have a process for determining the scope of our program.',
          checked: false,
        },
        {
          text: 'We have a written statement clearly defining the scope and limits of the program.',
          checked: false,
        },
        {
          text: 'We have a documented procedure to review and document open source license obligations, restrictions and rights.',
          checked: false,
        },
      ],
    },
    {
      title: 'Section 2: Relevant tasks defined and supported',
      items: [
        {
          text: 'We have a publicly visible method for any third party to make an open source license compliance inquiry (e.g. via a published contact email address).',
          checked: false,
        },
        {
          text: 'We have a documented procedure for responding to open source compliance inquiries.',
          checked: false,
        },
        {
          text: 'We have documented the persons, group or function supporting the program role(s) identified.',
          checked: false,
        },
        {
          text: 'We have ensured the identified program roles been properly staffed and adequately funded.',
          checked: false,
        },
        {
          text: 'We have identified legal expertise to address internal and external open source compliance matters.',
          checked: false,
        },
        {
          text: 'We have a documented procedure assigning internal responsibilities for open source compliance.',
          checked: false,
        },
        {
          text: 'We have a documented procedure for handling the review and remediation of non-compliant cases.',
          checked: false,
        },
      ],
    },
    {
      title: 'Section 3: Open source content review and approval',
      items: [
        {
          text: 'We have a documented procedure for identifying, tracking, reviewing, approving, and archiving information about the open source components in a supplied software release.',
          checked: false,
        },
        {
          text: 'We have open source component records for the supplied software to demonstrate the documented procedure was properly followed.',
          checked: false,
        },
        {
          text: 'We have a documented procedure that covers distribution of the supplied software in binary form.',
          checked: false,
        },
        {
          text: 'We have a documented procedure that covers distribution of the supplied software in source form.',
          checked: false,
        },
        {
          text: 'We have a documented procedure that covers integration of the supplied software with open source that may trigger additional obligations.',
          checked: false,
        },
        {
          text: 'We have a documented procedure that covers inclusion of modified open source in the supplied software.',
          checked: false,
        },
        {
          text: 'We have a documented procedure that covers inclusion of open source or other software under incompatible licenses interacting with other components in the supplied software.',
          checked: false,
        },
        {
          text: 'We have a documented procedure that covers inclusion of open source with attribution requirements in the supplied software.',
          checked: false,
        },
      ],
    },
    {
      title: 'Section 4: Compliance artifact creation and delivery',
      items: [
        {
          text: 'We have a documented procedure describing the process for preparing and distributing compliance artifacts with the supplied software as required by the identified licenses.',
          checked: false,
        },
        {
          text: 'We have a documented procedure for archiving copies of compliance artifacts for the supplied software from either the last offer of the supplied software or as required by the identified licenses, whichever is longer.',
          checked: false,
        },
      ],
    },
    {
      title: 'Section 5: Understanding open source community engagements',
      items: [
        {
          text: 'We have a documented open source contribution policy.',
          checked: false,
        },
        {
          text: 'We have a documented procedure governing open source contributions.',
          checked: false,
        },
        {
          text: 'We have a documented procedure for making all program participants aware of the open source contribution policy.',
          checked: false,
        },
      ],
    },
    {
      title: 'Section 6: Adherence to the specification requirements',
      items: [
        {
          text: 'We have documentation confirming that the program meets all the requirements of the specification.',
          checked: false,
        },
        {
          text: 'We have documentation confirming that the program conformance is reviewed at least every 18 months.',
          checked: false,
        },
      ],
    },
  ]);

  function proportionChecked5230() {
    let checkedCount = 0;
    let totalCount = 0;
    sections5230.value.forEach((section) => {
      section.items.forEach((items) => {
        totalCount++;
        if (items.checked) {
          checkedCount++;
        }
      });
    });
    return Math.round((checkedCount / totalCount) * 100);
  }

  return { sections5230, proportionChecked5230 };
}
