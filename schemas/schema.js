import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';
import * as components from './components';
import * as documents from './documents';
import * as meta from './meta';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // These objects are typically fields for components that should never be exposed as something
    // insertable. Usually commom fields that show up on multiple components.
    // These will typically not have a corresponding next-js renderable type, but may have helpers
    // defined to support the values.
    ...Object.values(meta),

    // These components can be created and inserted into components.
    ...Object.values(components),

    // These top level items can be created, inserted into, and referenced by components.
    ...Object.values(documents),
  ]),
});
