import type { RequiredDataFromCollectionSlug } from 'payload'

export const homePageData = (
  locale: 'en' | 'ge' | 'ja',
): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'mainImpact',
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label:
            locale === 'en' ? 'Discover now' : locale === 'ge' ? 'აღმოაჩინე ახლა' : 'いま発見する',
          url: '/products',
        },
      },
    ],
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text:
                  locale === 'en'
                    ? 'No Brands, Just Quality'
                    : locale === 'ge'
                      ? 'ბრენდები არა, მხოლოდ ხარისხი'
                      : 'ブランドではなく、品質だけ',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text:
                  locale === 'en'
                    ? 'Supporting local businesses'
                    : locale === 'ge'
                      ? 'ადგილობრივი ბიზნესის მხარდაჭერა'
                      : '地元企業を支援する',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text:
                  locale === 'en'
                    ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has beenLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been'
                    : locale === 'ge'
                      ? 'ლორემ იპსუმ უბრალოდ დამაკავშირებელი ტექსტია ბეჭდვისა და ტიპოგრაფიის ინდუსტრიაში. ლორემ იპსუმი იყო ლორემ იპსუმ უბრალოდ დამაკავშირებელი ტექსტია ბეჭდვისა და ტიპოგრაფიის ინდუსტრიაში. ლორემ იპსუმი იყო'
                      : 'Lorem Ipsumは印刷と植字業界のダミーテキストです。Lorem Ipsumは単なる印刷と植字業界のダミーテキストです。Lorem Ipsumはこれまでありました',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text:
                    locale === 'en'
                      ? 'Available Grape Wines'
                      : locale === 'ge'
                        ? 'ხელმისაწვდომი ყურძნის ღვინოები'
                        : '利用可能なぶどうワイン',
                  version: 2,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h1',
              version: 2,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text:
                    locale === 'en'
                      ? 'Georgia, Country of Tastes'
                      : locale === 'ge'
                        ? 'საქართველო, გემოვნების ქვეყანა'
                        : 'ジョージア、味の国',
                  version: 2,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 2,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 2,
        },
      },
      populateBy: 'collection',
      relationTo: 'grapes',
    },
  ],
  meta: {
    description:
      locale === 'en' ? 'ecommerce' : locale === 'ge' ? 'ელექტრონული კომერცია' : 'eコマース',
    title: locale === 'en' ? 'Ecommerce' : locale === 'ge' ? 'ელექტრონული კომერცია' : 'eコマース',
  },
  title: locale === 'en' ? 'Home' : locale === 'ge' ? 'მთავარი' : 'ホーム',
})
