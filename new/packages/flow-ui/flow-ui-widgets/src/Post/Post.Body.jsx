import React from 'react'
import {
  MDXProvider,
  useMDXComponents,
} from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import components from '@components/Mdx'


export const PostBody = ({ body }) => {
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(components)
  )

  return (
    <MDXProvider components={componentsWithStyles}>
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  )
}
