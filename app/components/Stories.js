import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/hacker-news-api'
import Posts from './Posts'
import Loading from './Loading';

export default function Stories({ type }) {
   const [posts, setPosts] = React.useState(null)

   React.useEffect(() => {
      setPosts(null)
      fetchMainPosts(type)
         .then((result) => setPosts(result))
   }, [type])

   return (
      <React.Fragment>
         {
            posts === null
               ? <Loading text="Loading Stories" />
               : <Posts posts={posts} />
         }
      </React.Fragment>
   )
}

Stories.propTypes = {
   type : PropTypes.string.isRequired
}