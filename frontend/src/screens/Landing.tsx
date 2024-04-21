import { useNavigate } from "react-router"
import { Button } from "../components/Button";

export const Landing = ()=> {
    const navigate = useNavigate();
    return <div>
        <div className="pt-8">
         <div className="grid grid-cols-1 gap-4 md:grid-col2-2">
           <div className="flex justify-center">
             <img src={"/chessboard.jpeg"} className="max-w-96"/>
           </div>
           <div className="flex justify-center">
            <div>
             <h1 className="text-4xl font-bold">Play chess with your friends</h1>
            </div>
             <div className="mt-4 flex justify-center">
               <Button onClick={()=> {
        navigate("/game")
    }}>Play Online</Button>
             </div>
           </div>
         </div>
        </div>
    </div>
}