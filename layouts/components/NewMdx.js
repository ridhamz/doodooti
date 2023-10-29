/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import PostSingle from '@layouts/PostSingle'

export const MDXComponents = {
  wrapper: ({ components, ...rest }) => {
    //const Layout = require(`../layouts/${layout}`).default
    return <PostSingle {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
