export default {
  websiteNameField: 'company_name',
  tabs: [{
    id: 'main',
    title: 'General',
    schema: [{
      id: 'company_name',
      title: 'Project name',
      helperText: 'Enter the name of your project',
      default: '',
    }, {
      id: 'color',
      title: 'Color',
      helperText: 'Choose your color',
      component: 'color',
      default: {color: "#3f51b5"},
    },{
      id: 'logo',
      title: 'Logo',
      helperText: 'Upload an image for your logo',
      component: 'image',
      providers: ['local', 'google'],
      default: null,
    },
    {
      id: 'logo_text',
      title: 'Logo Text',
      helperText: 'Text that will appear next to your logos',
      default: '',
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
          id: 'sidebarWidth',
          title: 'Sidebar Width',
          helperText: 'The pixel width of the side bars',
          inputProps: {
            type: 'number',
          },
          default: 280,
        },
        {
          id: 'topbarHeight',
          title: 'Topbar Height',
          helperText: 'The pixel height of the top bar',
          inputProps: {
            type: 'number',
          },
          default: 80,
        },
      ],
      [
        {
          id: 'leftNavigation',
          title: 'Left Navigation',
          helperText: 'Show a navigation bar on the left hand side.',
          component: 'checkbox',
          showTitle: false,
          default: true,
        },
        {
          id: 'rightNavigation',
          title: 'Right Navigation',
          helperText: 'Show a navigation bar on the right hand side.',
          component: 'checkbox',
          showTitle: false,
          default: false,
        }
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
    ]
  }, {
    id: 'social',
    title: 'Social Links',
    schema: [{
      id: 'facebookUrl',
      title: 'Facebook URL',
      helperText: 'The url of your Facebook profile',
      default: '',
    },{
      id: 'twitterUrl',
      title: 'Twitter URL',
      helperText: 'The url of your Twitter profile',
      default: '',
    },{
      id: 'linkedinUrl',
      title: 'LinkedIn URL',
      helperText: 'The url of your LinkedIn profile',
      default: '',
    },{
      id: 'youtubeUrl',
      title: 'Youtube URL',
      helperText: 'The url of your Youtube profile',
      default: '',
    },{
      id: 'pinterestUrl',
      title: 'Pinterest URL',
      helperText: 'The url of your Pinterest profile',
      default: '',
    },{
      id: 'instagramUrl',
      title: 'Instagram URL',
      helperText: 'The url of your Instagram profile',
      default: '',
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
      title: 'Title',
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
      title: 'Image',
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
      title: 'Documentation',
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