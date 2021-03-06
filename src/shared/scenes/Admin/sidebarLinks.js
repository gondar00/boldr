const sidebarLinks = [
  {
    id: 1,
    label: 'Content',
    icon: 'fa-book',
    items: [
      {
        id: 11,
        label: 'View Posts',
        icon: 'fa-list-alt',
        link: '/admin/posts',
      },
      {
        id: 12,
        label: 'New Post',
        icon: 'fa-file-text',
        link: '/admin/new-post',
      },
      {
        label: 'Tags',
        icon: 'fa-tags',
        id: 13,
        link: '/admin/tags',
      },
    ],
  },
  {
    label: 'File Manager',
    icon: 'fa-file-code-o',
    id: 2,
    link: '/admin/filemanager',
  },
  {
    label: 'Media Gallery',
    icon: 'fa-picture-o',
    id: 3,
    link: '/admin/media',
  },
  {
    label: 'Upload Media',
    icon: 'fa-cloud-upload',
    id: 4,
    link: '/admin/media/upload',
  },
  {
    label: 'Edit Navigation',
    icon: 'fa-link',
    id: 5,
    link: '/admin/navigation',
  },
  {
    label: 'Members List',
    icon: 'fa-users',
    id: 6,
    link: '/admin/members',
  },
  {
    label: 'Site Settings',
    icon: 'fa-gear',
    id: 7,
    exact: true,
    link: '/admin/settings',
  },
];
export default sidebarLinks;
