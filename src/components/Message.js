import classes from './Message.module.css';

const Message = (props) => {
    return (
        <p className={classes.text}>
            {props.text}
        </p>
    )
}

export default Message;
