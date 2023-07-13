import { useRouter } from "next/navigation"
import { FC } from "react";

interface TeleportMessageProps {
    url?: string;
    useWorld?: any;
  }
const TeleportMessage: FC<TeleportMessageProps> = ({ url, useWorld }) => {
    const router = useRouter()
    const restart = useWorld((state: any) => state.restart)
    const teleportTo = (event: any) => {
        event.preventDefault();
        window.location.href = url ? `/${url}` : '/';
    }
    const phase = useWorld((state: any) => state.phase)
    return <div className="fixed font-bold top-0 left-0 w-full h-full pointer-events-none font-bebas z-10">
        <div onClick={restart} className=" absolute pointer-events-auto cursor-pointer">
            Reset
        </div>
        {phase === 'teleport' && <div onClick={teleportTo}  className="flex justify-center absolute w-full text-white text-[80px] pointer-events-auto cursor-pointer pt-2.5 left-0 top-[40%] bg-[#00000033] ">
            Teleport
        </div> }
    </div>
}

export default TeleportMessage;