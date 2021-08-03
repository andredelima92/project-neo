import React from 'react'
import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            )
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </>
        )
      }
    } finally {
      styledComponentSheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />

          <link rel="icon" href="https://cefis.com.br/favicon.ico" />

          <meta property="fb:app_id" content="230245913798544" />
          <meta
            name="google-site-verification"
            content="fSSNMSKBub4jt04SRQFpwiyQa03Kl7PeMWJrgQbDZ5U"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Organization',
                url: 'https://cefis.com.br',
                logo: 'https://cefis.com.br/assets/images/site/svg/logo-cefis-new.svg'
              })
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
