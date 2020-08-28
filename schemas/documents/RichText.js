import TextIcon from 'react-icons/lib/fa/font';

export default {
  type: 'document',
  name: 'richText',
  icon: TextIcon,
  title: 'Rich Text',
  fields: [
    {
      name: 'content',
      type: 'richTextData',
    },
    /* Omitted other fields */
  ],
  /* Omitted preview */
};