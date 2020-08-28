import React from 'react';
import TextShadowIcon from 'react-icons/lib/md/blur-on';
import TextColorIcon from 'react-icons/lib/md/format-color-text';

// Unfortunately due to limitations of the portable text editor, this was a nasty hack job for a POC
// Yes, this is a complete bungled mess. It's on my TODO list to change over to classes.
//
// Since you're here:
// Why can't annotations have anything other than `type: 'object'`? Any given schema type throws.
// I had to duplicate the type as an annotation type to get it to work. Made me sad, you know.
//
// My personal wishlist improvement for the marks.decorators property so I wouldn't have to make
// styles permutations you'll see below (which as you can guess is a horrible UX experience).
// -- Again, I know, make it use css classes, but that doesn't improve the ugly dropdown ux --
// {
//   decorators: [
//     // Note, no name implies same as value
//     { title: "Bold", value: "strong" }, // name = "strong"
//     { title: "Emphasis", value: "emphasis" } // name = "emphasis"
//
//     // Decorators would be mutually exclusive on the `name` property.
//     // Current matching name-value pair be marked active like currently does.
//     { title: "Left Align", icon: "text-left", name: "align", value: "left" },
//     { title: "Center Align", icon: "text-center", name: "align", value: "center" },
//     { title: "Right Align", icon: "text-right", name: "align", value: "center" },
//
//     // If given an object, render a modal editor for the type.
//     // Require a `name` property if value is an object since you can't imply a proper name.
//     { title: "Background Color", icon: "color-bg", name: "color_bg", value: { type: "color" } },
//     { title: "Text Color", icon: "color-fg", name: "color_fg", value: { type: "color" } },
//   ],
// }

const alignedStyles = {
  left: [],
  center: [],
  right: [],
};

// Throw away Left (covered by Normal)
alignedStyle('%s', 'normal', {});
alignedStyles.left.pop();

// Generate the other headerings for left, center, and right variants.
alignedStyle('Heading 1 (%s)', 'h1', { fontWeight: 700, fontSize: '24px', margin: '0 0 12px 0' });
alignedStyle('Heading 2 (%s)', 'h2', { fontWeight: 700, fontSize: '18px', margin: '0 0 12px 0' });
alignedStyle('Heading 3 (%s)', 'h3', { fontWeight: 700, fontSize: '15px', margin: '0 0 12px 0' });
alignedStyle('Heading 4 (%s)', 'h4', { fontWeight: 700, fontSize: '12px', margin: '0 0 12px 0' });
alignedStyle('Heading 5 (%s)', 'h5', { fontWeight: 700, fontSize: '10.5px', margin: '0 0 12px 0' });
alignedStyle('Heading 6 (%s)', 'h6', { fontWeight: 700, fontSize: '9px', margin: '0 0 12px 0' });

export default {
  name: 'richTextBlock',
  title: 'Freeform Text Editor',
  type: 'block',
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Number', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
      { title: "Underline", value: "underline" },
      { title: "Strike", value: "strike-through" },
      {
        title: "Shadow",
        value: "shadow",
        blockEditor: {
          icon: TextShadowIcon,
          render ({ children }) {
            return <span style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>{children}</span>;
          },
        },
      },
    ],
    annotations: [
      {
        title: 'Text Color',
        name: 'style',
        type: 'object',
        icon: TextColorIcon,
        fields: [
          {
            title: 'Text Color',
            name: 'color',
            type: 'color',
          },
        ],
        blockEditor: {
          render ({ color, children }) {
            return <span style={{ color: color?.hex }}>{children}</span>;
          },
        },
      },
      {
        title: 'Create Link',
        name: 'link',
        // WHY NOT JUST LET ME USE `type: 'betterLink'`?! GRRRR
        type: 'object',
        fields: [
          {
            title: 'URL',
            name: 'href',
            type: 'url',
            validation: rule => rule.uri({
              allowRelative: true,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
          },
          {
            description: 'Default: Button: White',
            name: 'type',
            title: 'Link Style',
            type: 'string',
            options: {
              // list: getLinkStyles(),
              list: [ { title: 'Omitted styles', value: 'omitted' }],
            },
          },
          {
            description: 'Default: buttons are upper case, links are normal. * exceptions apply',
            name: 'uppercase',
            type: 'boolean',
            title: 'Upper Case',
          },
        ],
        blockEditor: {
          render ({ color, children, href }) {
            const { platform } = global.navigator;
            const key = platform === 'MacIntel' ? 'Command' : 'Ctrl';
            return (
              <span title={`${key} + Click to visit:\n${href}`} onClick={visit}
                style={{ textDecoration: 'underline', color: color?.hex }}>
                {children}
              </span>
            );

            function visit (e) {
              if (platform === 'MacIntel' ? e.metaKey : e.ctrlKey) {
                global.open(href, '_blank');
                e.preventDefault();
                e.stopPropagation();
              }
            }
          },
        },
      },
    ],
  },
  styles: [
    { title: 'Links as Blocks', value: 'link-block' },

    // Pull the normal values out so they are in the front
    alignedStyles.center.shift(),
    alignedStyles.right.shift(),

    // Permutations suck, sorry.
    ...alignedStyles.left,
    ...alignedStyles.center,
    ...alignedStyles.right,
  ],
};

function alignedStyle (baseTitle, baseValue, styles) {
  alignedStyles.left.push(make('Left', 'left', { ...styles, textAlign: 'left' }));
  alignedStyles.center.push(make('Center', 'center', { ...styles, textAlign: 'center' }));
  alignedStyles.right.push(make('Right', 'right', { ...styles, textAlign: 'right' }));

  function make (title, value, style) {
    return {
      title: baseTitle.replace('%s', title),
      value: `${baseValue} ${value}`,
      blockEditor: {
        render ({ children }) {
          return <div style={style}>{children}</div>;
        },
      },
    };
  }
}