export default defineAppConfig({
  logo: '/images/cody.png',

  url: 'https://codort.com/',

  socials: [
    {
      name: 'newsletter',
      icon: 'fa-solid:newspaper',
      url: 'https://go.codort.com/newsletter',
    },
    {
      name: 'linkedin',
      icon: 'fa6-brands:linkedin',
      url: 'https://www.linkedin.com/company/codort/',
    },
    {
      name: 'github',
      icon: 'fa6-brands:github',
      url: 'https://github.com/codort',
    },
  ],

  menu: [
    // { name: 'Partner', path: '/partner' },
    { name: 'Articles', path: '/articles' },
    // { name: 'Contact', path: '/contact' },
  ],
});
