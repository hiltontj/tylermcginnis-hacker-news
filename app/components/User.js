import React from 'react'
import Posts from './Posts';
import Loading from './Loading'
import { fetchUser, fetchPosts } from '../utils/hacker-news-api'

// get a date time string from an integer epoch time
function getDateFromEpoch(epoch) {
   const date = new Date(epoch * 1000)
   return date.toLocaleDateString()
}

function UserInfo ({ id, created, karma, about }) {
   return (
      <div className="user-info">
         <h2>{id}</h2>
         <h4>
            <span>joined on {getDateFromEpoch(created)}</span>
            <span>, has {karma} karma</span>
         </h4>
         {
            about != null && 
            <p>
               <span><strong>About:</strong> </span>
               <span dangerouslySetInnerHTML={{__html : about}}></span>
            </p>
         }
      </div>
   )
}

export default function User({ match : { params : { userId } } }) {
   const [userInfo, setUserInfo] = React.useState(null)
   const [userPosts, setUserPosts] = React.useState(null)

   React.useEffect(() => {
      fetchUser(userId)
         .then((user) => {
            setUserInfo(user)
            return user.submitted
         })
         .then((ids) => fetchPosts(ids))
         .then((results) => setUserPosts(results))
         .catch(() => {
            throw new Error("an error happened when fetching user info")
         })
   }, [userId])

   return (
      <React.Fragment>
         <div className="column">
         {
            userInfo === null
               ? <Loading text="Loading User Info" />
               : <UserInfo {...userInfo}/> 
         }
         </div>
         <div className="column"> 
         {
            userPosts === null
               ? <Loading text="Loading User Posts" />
               : <Posts posts={userPosts} title="Posts"/>
         }
         </div>
      </React.Fragment>
   )
}