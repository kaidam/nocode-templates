export default {
  websiteNameField: 'blog_name',
  sections: [
    'topbar',
    'blogposts',
  ],
  initialResources: [{
    type: 'section',
    name: 'topbar',
    annotation: {
      sorting: {
        type: 'date',
        direction: 'asc',
      }
    },
    children: [{
      name: 'About',
      type: 'document',
      wordDocument: 'homepage.docx',
      annotation: {
        
      }
    }]
  },{
    type: 'section',
    name: 'blogposts',
    children: [{
      name: 'My FIrst Blog Post',
      type: 'document',
      wordDocument: 'homepage.docx',
      annotation: {
        
      }
    }]
  }],
  tabs: [{
    id: 'main',
    title: 'General',
    schema: [{
      id: 'blog_name',
      title: 'Blog name',
      helperText: 'Enter the name of your blog',
      default: '',
    }, {
      id: 'color',
      title: 'Color',
      helperText: 'Choose your color',
      component: 'color',
      default: {color: "#3f51b5"},
    },{
      id: 'topbar_background',
      title: 'Topbar Background',
      helperText: 'Upload an image for your topbar',
      component: 'image',
      providers: ['local', 'google', 'unsplash'],
      default: null,
      groups: ['logo'],
    },{
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
          id: 'imageDropshadow',
          title: 'Image Drop Shadow',
          helperText: 'Apply a drop shadow and border to any images in a google document',
          component: 'checkbox',
          showTitle: false,
          default: true,
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