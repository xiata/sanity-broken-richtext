import Icon from 'react-icons/lib/md/web-asset';

export default {
  name: 'fooBar',
  title: 'Foo Bar',
  type: 'document',
  icon: Icon,
  /* Omitted fieldsets */
  fields: [
    {
      name: 'content',
      title: 'Text Content',
      type: 'richTextData',
    },
    /* Omitted other fields */
  ],
  /* Omitted preview */
};