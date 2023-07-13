import { UIbutton } from "@/components/uibutton";

const UI = () => {

    return <div className="fixed font-bold top-0 w-full h-full pointer-events-none font-bebas z-10">
        <div  className="absolute top-0 right-0 pr-4 pt-4 pointer-events-auto cursor-pointer">
            <UIbutton/>
        </div>
    </div>
}

export default UI;
