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

export default class Loading extends React.Component {
   state = {
      content: this.props.text
   }

   componentDidMount() {
      const { text, speed } = this.props
      this.interval = window.setInterval(() => {
         this.state.content === text + '...'
            ? this.setState( { content : text } )
            : this.setState( ({ content }) => ({ content : content + '.' }) )
      }, speed)
   }

   componentWillUnmount() {
      window.clearInterval(this.interval)
   }

   render() {
      return (
         <div style={styles.content}>{this.state.content}</div>
      )
   }
}

Loading.propTypes = {
   text : PropTypes.string,
   speed : PropTypes.number
}

Loading.defaultProps = {
   text : "Loading",
   speed : 300
}