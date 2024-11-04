import { useParams } from "react-router-dom"

export default function HomePage(){
    const {userName} = useParams();

    return <h1>home page {userName}</h1>
}