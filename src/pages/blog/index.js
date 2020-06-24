import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/93fa7d96b0e3d2254a7998eae1f19041.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
     
              color: 'white',
              padding: '1rem',
            }}
          >
            VisionPlayMedia Blog
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
