import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const linkStyle = {
   color: '#3b3b3b',
   textDecoration: 'underline'
}

// get a date time string from an integer epoch time
function getDateFromEpoch(epoch) {
   const date = new Date(epoch * 1000)
   return date.toLocaleString()
}

function renderPost (definition) {
   return (
      <li key={definition.id} className="post">
         <div className="post-title">
            <a href={definition.url}>{definition.title}</a>
         </div>
         <div className="post-info">
            <span>by </span>
            <Link 
               to={{ pathname: `/user/${definition.by}` }}
               style={linkStyle}
            >{definition.by}</Link>
            <span> on {getDateFromEpoch(definition.time)} with </span>
            <Link 
               to={{ pathname: `/comments/${definition.id}` }}
               style={linkStyle}
            >{definition.kids ? definition.kids.length : 0}</Link>
            <span> comments</span>
         </div>
      </li>
   )
}

export default function Posts (props) {
   const { posts } = props
   return (
      <ul className="column">
         {posts.map((item) => renderPost(item))}
      </ul>
   )
}

Posts.propTypes = {
   posts : PropTypes.arrayOf(PropTypes.object)
}