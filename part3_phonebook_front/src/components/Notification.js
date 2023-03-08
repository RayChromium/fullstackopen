const Notification = ({message}) => {
    if(message === null) {
      return null;
    }
  
    if(message.level === 'info') {
      return (
        <div className='message'>
          {message.content}
        </div>
      )
    } else if(message.level === 'error') {
      return (
        <div className='message-error'>
          {message.content}
        </div>
      )
    }
}

export default Notification;