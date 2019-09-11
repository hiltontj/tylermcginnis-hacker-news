import React from 'react'
import Posts from './Posts';
import Loading from './Loading'
import { fetchUser, fetchPosts } from '../utils/hacker-news-api'

// get a date time string from an integer epoch time
function getDateFromEpoch(epoch) {
   const date = new Date(epoch * 1000)
   return date.toLocaleDateString()
}

function UserInfo (props) {
   const { user : { id, created, karma, about } } = props
   console.log(about)
   return (
      <div className="user-info">
         <h2>{id}</h2>
         <p>Created on {getDateFromEpoch(created)}</p>
         <p>Karma: {karma}</p>
         {
            about != null && 
            <p>About: <span dangerouslySetInnerHTML={{__html : about}}></span></p>
         }
      </div>
   )
}

export default class User extends React.Component {
   state = {
      userInfo : null,
      posts : []
   }

   componentDidMount() {
      const { match : { params : { userId } } } = this.props
      fetchUser(userId)
         .then((user) => {
            console.log(user)
            this.setState( ({userInfo}) => ({ userInfo : user }) )
            return user.submitted
         })
         .then((ids) => fetchPosts(ids))
         .then((results) => {
            this.setState( ({posts}) => ({posts : posts.concat(results)}) )
         })
   }

   isLoadingUser() {
      const { userInfo } = this.state
      return userInfo === null
   }

   isLoadingPosts() {
      const { posts } = this.state
      return posts.length === 0
   }

   render() {
      const { userInfo, posts } = this.state
      return (
         <React.Fragment>
            <div className="column">
            {
               this.isLoadingUser()
                  ? <Loading text="Loading User Info" />
                  : <UserInfo user={userInfo}/> 
            }
            </div>
            <div className="column"> 
            {
               this.isLoadingPosts()
                  ? <Loading text="Loading User Posts" />
                  : <Posts posts={posts}/>
            }
            </div>
         </React.Fragment>
      )
   }
}