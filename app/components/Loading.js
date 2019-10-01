import React from 'react'
import PropTypes from 'prop-types'

const styles = {
   content : {
      fontSize : '24px',
      fontWeight : 'bold',
      marginTop : '20px',
      right : 0,
      left : 0,
      textAlign : 'center'
   }
}

export default function Loading({ text="Loading", speed=300 }) {
   const [content, setContent] = React.useState(text)

   React.useEffect(() => {
      const id = window.setInterval(() => {
         setContent(
            (c) => c === text + '...' 
               ? text 
               : c + '.'
         )
      }, speed)

      return () => window.clearInterval(id)
   })

   return <div style={styles.content}>{content}</div>
}

Loading.propTypes = {
   text : PropTypes.string,
   speed : PropTypes.number
}

Loading.defaultProps = {
   text : "Loading",
   speed : 300
}