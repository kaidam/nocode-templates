export default {
  websiteNameField: 'company_name',
  defaultLayout: 'documentation',
  initialOptions: [
    'theme',
    'color',
  ],
  sections: [
    'home',
    'footer',
  ],
  initialResources: [{
    type: 'section',
    name: 'home',
    annotation: {
      sorting: {
        type: 'date',
        direction: 'asc',
      }
    },
    children: [{
      name: 'CV',
      type: 'document',
      wordDocument: 'cv-home.docx',
      annotation: {
        initialHomepage: true,
        layout_id: 'plain',
      }
    }]
  }, {
    type: 'section',
    name: 'footer',
    children: [{
      name: 'Contact',
      type: 'document',
      wordDocument: 'contact.docx',
    }, {
      name: 'Privacy Policy',
      type: 'document',
      wordDocument: 'privacypolicy.docx',
    }]
  }],
  tabs: [{
    id: 'main',
    title: 'General',
    schema: [{
      id: 'company_name',
      title: 'Project name',
      helperText: 'Enter the name of your project',
      default: '',
      groups: ['copyright'],
    }, {
      id: 'theme',
      title: 'Theme',
      helperText: 'Choose a theme for the website',
      component: 'select',
      default: 'General',
      options: [{
        title: 'General',
        value: 'General',
      }, {
        title: 'Catering',
        value: 'Catering',
      }, {
        title: 'Accountancy',
        value: 'Accountancy',
      }, {
        title: 'Building',
        value: 'Building',
      }],
    }, {
      id: 'color',
      title: 'Color',
      helperText: 'Choose your color',
      component: 'color',
      default: {color: "#003049"},
    }, {
      id: 'accent_color',
      title: 'Accent Color',
      helperText: 'Choose your accent color',
      component: 'color',
      default: {color: "#f77f00"}
    }, {
      id: 'background_color',
      title: 'Background Color',
      helperText: 'Choose your background color',
      component: 'color',
      default: {color: "#ffffff"},
    }, {
      id: 'logo',
      title: 'Logo',
      helperText: 'Upload an image for your logo',
      component: 'image',
      providers: ['local', 'google'],
      default: null,
      groups: ['logo'],
    },
    {
      id: 'logo_text',
      title: 'Logo Text',
      helperText: 'Text that will appear next to your logos',
      default: '',
      groups: ['logo'],
    },
    {
      id: 'favicon',
      title: 'Favicon',
      helperText: 'Upload an image for your favicon',
      component: 'image',
      providers: ['local', 'google'],
      default: null,
    },
    {
      id: 'description',
      title: 'Description',
      component: 'textarea',
      rows: 3,
      helperText: 'Enter the description for your website',
      default: '',
    },
    {
      id: 'keywords',
      title: 'Keywords',
      component: 'textarea',
      rows: 3,
      helperText: 'Enter some keywords for search engines to find your website',
      default: '',
    }]
  }, {
    id: 'layout',
    title: 'Features',
    schema: [
      [
        {
          id: 'topbarHeight',
          title: 'Topbar Height',
          helperText: 'The pixel height of the top bar',
          inputProps: {
            type: 'number',
          },
          default: 180,
        },
      ],
      [
        {
          id: 'footer',
          title: 'Footer',
          helperText: 'Show a footer at the bottom of the website.',
          component: 'checkbox',
          showTitle: false,
          default: true,
        },
        {
          id: 'folderPages',
          title: 'Folder Pages',
          helperText: 'Render a page for folders with links to their contents',
          component: 'checkbox',
          showTitle: false,
          default: true,
        }
      ],
      [
        {
          id: 'imageDropshadow',
          title: 'Image Drop Shadow',
          helperText: 'Apply a drop shadow and border to any images in a google document',
          component: 'checkbox',
          showTitle: false,
          default: false,
        },
        {
          id: 'autoLineHeight',
          title: 'Auto Line Height',
          helperText: 'Auto adjust the line height of text for readability',
          component: 'checkbox',
          showTitle: false,
          default: true,
        },
      ]
    ]
  }, {
    id: 'social',
    title: 'Social Links',
    group: 'social_links',
    schema: [{
      id: 'social_links.facebook',
      title: 'Facebook URL',
      helperText: 'The url of your Facebook profile',
      default: '',
      groups: ['social_links'],
    },{
      id: 'social_links.twitter',
      title: 'Twitter URL',
      helperText: 'The url of your Twitter profile',
      default: '',
      groups: ['social_links'],
    },{
      id: 'social_links.linkedin',
      title: 'LinkedIn URL',
      helperText: 'The url of your LinkedIn profile',
      default: '',
      groups: ['social_links'],
    },{
      id: 'social_links.youtube',
      title: 'Youtube URL',
      helperText: 'The url of your Youtube profile',
      default: '',
      groups: ['social_links'],
    },{
      id: 'social_links.pinterest',
      title: 'Pinterest URL',
      helperText: 'The url of your Pinterest profile',
      default: '',
      groups: ['social_links'],
    },{
      id: 'social_links.instagram',
      title: 'Instagram URL',
      helperText: 'The url of your Instagram profile',
      default: '',
      groups: ['social_links'],
    }],
  }],
  layout: {
    plain: {
      title: 'Basic',
      description: 'Just the document content',
      layout: [
        [{
          type: 'documentContent',
        }]
      ]
    },
    title: {
      title: 'With Title',
      description: 'Show the document title above the content',
      layout: [
        [{
          type: 'documentTitle',
        }],
        [{
          type: 'documentContent',
        }]
      ]
    },
    image: {
      title: 'With Image',
      description: 'Show an image above the document content',
      layout: [
        [{
          type: 'documentTitle',
        }],
        [{
          type: 'image',
        }],
        [{
          type: 'documentContent',
        }],
      ]
    },
    documentation: {
      title: 'Full Navigation',
      description: 'Show navigation widgets around the document content',
      layout: [
        [{
          type: 'breadcrumbs',
        }],
        [{
          type: 'documentTitle',
        }],
        [{
          type: 'documentInfo',
        }],
        [{
          type: 'documentContent',
        }],
        [{
          type: 'backNextButtons',
        }]
      ]
    },
  }
}