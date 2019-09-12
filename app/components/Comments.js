import React from 'react'
import { Link } from 'react-router-dom'
import { fetchItem, fetchComments } from '../utils/hacker-news-api'
import Loading from './Loading';
import { ThemeConsumer } from '../contexts/theme';


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

function CommentHeader({post}) {
   const { title, url, by, time, kids } = post
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

function Comment({definition}) {
   const { id, by, time, text } = definition
   console.log(definition)
   return (
      <ThemeConsumer>
         {({theme}) => (
            <div className={`comment${theme === 'dark' ? " comment-dark" : ""}`}>
               <p>
                  <span>by </span>
                  <Link to={`/user/${by}`} style={linkStyle}>{by}</Link>
                  <span>, {getDateFromEpoch(time)}</span>
               </p>
               <p>{text}</p>
            </div>
         )}
      </ThemeConsumer>
      
   )
}

export default class Comments extends React.Component {
   state = {
      post : null,
      comments : []
   }

   componentDidMount() {
      const { match : { params : { postId } } } = this.props
      fetchItem(postId)
         .then((item) => {
            this.setState({
               post : item
            })
            return fetchComments(item.kids)
         })
         .then((results) => {
            this.setState( ({comments}) => ({ comments : comments.concat(results)}))
         })
   }

   isLoadingPost() {
      const { post } = this.state
      return post === null
   }

   isLoadingComments() {
      const { comments } = this.state
      return comments.length === 0
   }

   render() {
      const { post, comments } = this.state
      console.log(comments)
      return (
         <React.Fragment>
            {
               this.isLoadingPost()
                  ? <Loading />
                  : <CommentHeader post={post} />
            }
            {
               this.isLoadingComments()
                  ? <Loading text="Loading Comments" />
                  : (
                     <ul className="comments-list">
                        {comments.map((item) => (
                           <li key={item.id}><Comment definition={item}/></li>
                        ))}
                     </ul>
                  )
                  
            }
         </React.Fragment>
      )
   }
}