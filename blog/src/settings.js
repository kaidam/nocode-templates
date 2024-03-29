export default {
  websiteNameField: 'blog_name',
  defaultLayout: 'title',
  initialOptions: [
    'color',
  ],
  sections: [
    'topbar',
    'blogposts',
  ],
  injectRoutes: {
    '/': {
      item: 'home',
      externals: [],
      location: 'section:home',
    },
    '/tag': {
      item: 'tag',
      externals: [],
      location: 'section:tag',
    }
  },
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
      wordDocument: 'about.docx',
      annotation: {
        
      }
    },
    {
      name: 'Contact',
      type: 'document',
      wordDocument: 'contact.docx',
      annotation: {
        
      }
    }]
  },{
    type: 'section',
    name: 'blogposts',
    annotation: {
      sorting: {
        type: 'date',
        direction: 'desc',
      }
    },
    children: [{
      name: 'My First Blog Post',
      type: 'document',
      wordDocument: 'blog.docx',
      annotation: {
        initialBlogPost: true,
        form: 'drive.blogpost',
        type: 'drive.document',
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
      groups: ['copyright'],
    }, {
      id: 'color',
      title: 'Color',
      helperText: 'Choose your color',
      component: 'color',
      default: {color: "#003049"},
    },
    {
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
          default: 80,
        },
        {
          id: 'footerHeight',
          title: 'Footer Height',
          helperText: 'The pixel height of the footer',
          inputProps: {
            type: 'number',
          },
          default: 60,
        },
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
      title: 'With Info',
      description: 'Show the document info above the content',
      layout: [
        [{
          type: 'documentInfo',
        }],
        [{
          type: 'documentContent',
        }]
      ]
    },
  }
}