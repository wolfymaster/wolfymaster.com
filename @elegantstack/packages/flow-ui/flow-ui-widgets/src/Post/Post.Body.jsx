import React from 'react'
import {
  MDXProvider,
  useMDXComponents,
} from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import components from '@components/Mdx'

export const PostBody = ({ body }) => {
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(components)
  );

  return (
    <MDXProvider components={componentsWithStyles}>{body}</MDXProvider>
  )
}
