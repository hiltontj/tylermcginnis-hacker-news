import React from 'react'
import PropTypes from 'prop-types'
import { fetchMainPosts } from '../utils/hacker-news-api'
import Posts from './Posts'
import Loading from './Loading';

export default class Stories extends React.Component {
   state = {
      posts : [],
      error: null // todo - currently not used
   }

   componentDidMount() {
      const { type } = this.props
      this.updatePosts(type)
   }

   componentDidUpdate(prevProps) {
      const { type } = this.props
      if ( prevProps.type !== type ) {
         this.setState({
            posts : []
         })
         this.updatePosts(type)
      }
   }

   updatePosts = (storyType) => {
      fetchMainPosts(storyType)
         .then((result) => {
            this.setState(({posts}) => ({
               posts : posts.concat(result)
            }))
         })
   }

   isLoading = () => {
      const { posts, error } = this.state
      return posts.length === 0 || error !== null
   }

   render() {
      const { posts } = this.state
      return (
         <React.Fragment>
            {
               this.isLoading() 
                  ? <Loading text="Loading Stories" />
                  : <Posts posts={posts} />
            }
         </React.Fragment>
      )
   }
}

Stories.propTypes = {
   type : PropTypes.string.isRequired
}