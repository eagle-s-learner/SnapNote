import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../UserContext";
import NavBar from "./NavBar";

export default function HomePage() {
    const { userName } = useParams();

    const userCtx = useContext(AuthContext);

    return (
        <div className="bg-black min-w-fit min-h-screen">
            <NavBar />
            <div>
            <h1 className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo rerum eligendi doloremque. Ex aliquam cum assumenda illo at sit veritatis numquam repudiandae architecto suscipit, ea nihil magnam dolorem, necessitatibus voluptate voluptatum. Magnam, doloremque aspernatur. Sed fugiat ducimus officiis atque soluta?</h1>
            </div>
        </div>
    );
}
