export default function UnreadIndicator(props: { unread: boolean; }) {
    const circleStyle = {
        width: '12px',
        height: '12px',
        borderRadius: "50%",
        //backgroundColor: '#3a73a1'
    };

    const blankStyle = {
        width: '12px',
        height: '12px',
    };
    
    return (
        props.unread ?
        <div className="pazza-blue-background" style={circleStyle} /> :
        <div style={blankStyle} />
    );
}