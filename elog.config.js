module.exports = {
  write: {
    platform: 'notion',
    notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter:false, // {property: 'status', select: {equals: 'published'}}
      sorts: true, 
      // [{timestamp: 'created_time', direction: 'descending'}],
      catalog: false,
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './docs',
      filename: 'title',
      format: 'markdown',
      catalog: false,
      formatExt: '',
    },
    confluence: {
      user: process.env.CONFLUENCE_USER,
      password: process.env.WORDPRESS_PASSWORD,
      endpoint: process.env.WORDPRESS_ENDPOINT,
      spaceKey: process.env.CONFLUENCE_SPACE_KEY,
      rootPageId: process.env.CONFLUENCE_ROOT_PAGE_ID, // 可选
      formatExt: '', // 可选
    },
    wordpress: {
      username: process.env.WORDPRESS_USERNAME,
      password: process.env.WORDPRESS_PASSWORD,
      endpoint: process.env.WORDPRESS_ENDPOINT,
      keyMap: {
        tags: 'tags',
        categories: 'categories',
        cover: 'cover',
        description: 'description',
      },
      formatExt: ''
    },
  },
  image: {
    enable: false,
    platform: 'local',
    local: {
      outputDir: './docs/images',
      prefixKey: '/images',
    },
    oss: {
      secretId: process.env.OSS_SECRET_ID,
      secretKey: process.env.OSS_SECRET_KEY,
      bucket: process.env.OSS_BUCKET,
      region: process.env.OSS_REGION,
      host: process.env.OSS_HOST,
      prefixKey: '',
      secretExt: '', // 可选
    },
    cos: {
      secretId: process.env.COS_SECRET_ID,
      secretKey: process.env.COS_SECRET_KEY,
      bucket: process.env.COS_BUCKET,
      region: process.env.COS_REGION,
      host: process.env.COS_HOST,
      prefixKey: '',
      secretExt: '', // 可选
    },
    qiniu: {
      secretId: process.env.QINIU_SECRET_ID,
      secretKey: process.env.QINIU_SECRET_KEY,
      bucket: process.env.QINIU_BUCKET,
      region: process.env.QINIU_REGION,
      host: process.env.QINIU_HOST,
      prefixKey: '',
      secretExt: '', // 可选
    },
    upyun: {
      user: process.env.UPYUN_USER,
      password: process.env.UPYUN_PASSWORD,
      bucket: process.env.UPYUN_BUCKET,
      host: process.env.UPYUN_HOST,
      prefixKey: '',
      secretExt: '', // 可选
    },
    github: {
      user: process.env.GITHUB_USER,
      token: process.env.GITHUB_TOKEN,
      repo: process.env.GITHUB_REPO,
      branch: '',
      host: '',
      prefixKey: '',
      secretExt: '', // 可选
    },
  },
}
