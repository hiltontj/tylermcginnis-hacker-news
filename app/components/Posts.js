import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const linkStyle = {
   color: '#4f92c9',
   textDecoration: 'underline'
}

// get a date time string from an integer epoch time
function getDateFromEpoch(epoch) {
   const date = new Date(epoch * 1000)
   return date.toLocaleString()
}

function renderPost (definition) {
   const { id, url, title, by, time, kids } = definition
   return (
      <li key={id} className="post">
         <div className="post-title">
            <a href={url} target="_blank">{title}</a>
         </div>
         <div className="post-info">
            <span>by </span>
            <Link 
               to={{ pathname: `/user/${by}` }}
               style={linkStyle}
            >{by}</Link>
            <span> on {getDateFromEpoch(time)} with </span>
            <Link 
               to={{ pathname: `/comments/${id}` }}
               style={linkStyle}
            >{kids ? kids.length : 0}</Link>
            <span> comments</span>
         </div>
      </li>
   )
}

export default function Posts (props) {
   const { posts, title } = props
   return (
      <React.Fragment>
         {
            title !== null &&
            <h2 className="posts-title">{title}</h2>
         }
         <ul className="column">
            {posts.map((item) => renderPost(item))}
         </ul>
      </React.Fragment>
   )
}

Posts.propTypes = {
   posts : PropTypes.arrayOf(PropTypes.object)
}