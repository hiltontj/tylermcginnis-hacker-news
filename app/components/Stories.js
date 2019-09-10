import React from 'react'
import { fetchMainPosts } from '../utils/hacker-news-api'
import Posts from './Posts'

export default class Stories extends React.Component {
   state = {
      type : this.props.type,
      posts : [],
      error: null
   }

   componentDidMount() {
      const { type } = this.state
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
            { ! this.isLoading() 
               ? <Posts posts={posts} />
               : <div>Loading...</div>}
         </React.Fragment>
      )
   }
}