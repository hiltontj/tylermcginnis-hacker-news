import React from 'react'
import { Link } from 'react-router-dom'
import { fetchItem, fetchComments } from '../utils/hacker-news-api'
import Loading from './Loading';
import ThemeContext from '../contexts/theme';

const linkStyle = {
   color: '#4f92c9',
   textDecoration: 'underline'
}

// get a date time string from an integer epoch time
function getDateFromEpoch(epoch) {
   const date = new Date(epoch * 1000)
   return date.toLocaleString()
}

const aStyle = {
   color: '#20838a'
}

function CommentHeader({ title, url, by, time, kids }) {
   return (
      <div className="comment-header">
         <div className="comments-title"><a style={aStyle} href={url} target="_blank">{title}</a></div>
         <h4>
            <span>by </span>
            <Link 
               to={{ pathname: `/user/${by}` }}
               style={linkStyle}
            >{by}</Link>
            <span> on {getDateFromEpoch(time)} with </span>
            <span style={linkStyle}>{kids ? kids.length : 0}</span>
            <span> comments</span>
         </h4>
      </div>
   )
}

function Comment({ by, time, text }) {
   const theme = React.useContext(ThemeContext)

   return (
      <div className={`comment${theme === 'dark' ? " comment-dark" : ""}`}>
         <p>
            <span>by </span>
            <Link to={`/user/${by}`} style={linkStyle}>{by}</Link>
            <span>, {getDateFromEpoch(time)}</span>
         </p>
         <p dangerouslySetInnerHTML={{__html : text}} />
      </div>
   )
}

export default function Comments({ match : { params : { postId } } }) {
   const [post, setPost] = React.useState(null)
   const [comments, setComments] = React.useState(null)

   React.useEffect(() => {
      fetchItem(postId)
         .then((item) => {
            setPost(item)
            return fetchComments(item.kids)
         })
         .then((result) => setComments(result))
   }, [postId])

   return (
      <React.Fragment>
         {
            post === null
               ? <Loading />
               : <CommentHeader {...post} />
         }
         {
            comments === null
               ? <Loading text="Loading Comments" />
               : (
                  <ul className="comments-list">
                     {comments.map((item) => (
                        <li key={item.id}><Comment {...item}/></li>
                     ))}
                  </ul>
               )
               
         }
      </React.Fragment>
   )
}
