import PostCard from "./PostCard";

export default function ListOfPostsSidebar() {
    return (
        <div style={{ width: "100%" }}>
            <PostCard instructor={false} unread={false} />
            <PostCard instructor={true} unread={false}/>
            <PostCard instructor={false} unread={true}/>
            <PostCard instructor={true} unread={true}/>
        </div>
    );
}