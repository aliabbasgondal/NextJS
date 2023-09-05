import Wrapper from "./Wrapper";

const NewsLetter =({newsletterData}:{newsletterData:any})=>{
    return(
        <Wrapper>
        <div className="pt-24 pb-24 pl-8 pr-8 lg:pt-40 lg:pb-40  relative items-center text-center justify-center z-10  flex-col">
            <div className="-z-10 absolute text-[#f2f3f7] leading-[151px] font-extrabold text-6xl md:text-7xl lg:text-9xl  w-full text-center">
            {newsletterData.backdropText}
            </div>
            <h1 className="mb-2 text-3xl tracking-wide leading-10 text-[#212121] ">
            {newsletterData.subHdeading}
            </h1>
            <p className="mb-4 font-light text-base leading-6 text-[#212121]">{newsletterData.text}</p>
            <form>
            <input placeholder="Input email address" className="pl-3 pr-28 pt-5 pb-5 bg-[#fcfcfc] border-solid border-2 mr-3  border-gray-500"></input>
            <button className="pr-5 pl-5 pt-3 pb-3 bg-black text-white font-semibold text-sm leading-4">Get Started</button>
            </form>
        </div>
        </Wrapper>
    );
}

export default NewsLetter;