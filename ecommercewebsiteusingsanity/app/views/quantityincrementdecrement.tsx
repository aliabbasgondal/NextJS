"use client"

const IncrementDecrementNum =({ num, setNum }: { num: number; setNum: React.Dispatch<React.SetStateAction<number>> })=>{
   
    let incNum = () => {

        setNum(Number(num) + 1);

    };
    let decNum = () => {
        if (num > 0) {
            setNum(num - 1);
        }
    }
    let handleChange = (e: any) => {
        setNum(e.target.value);
    }
    return(
        <div>
                    <button onClick={decNum} ><span id='minus' className='mr-3 border-solid bg-[#f1f1f1] border-r-2 pl-2 pr-2 pt-2 pb-2 rounded-full cursor-pointer'>-</span></button>

                    <input type="text" className="form-control w-8 h-8 text-center border-2 border-solid border-black" value={num} onChange={handleChange}></input>
                    <button onClick={incNum} > <span id='plus' className='ml-3 border-solid bg-[#f1f1f1] border-r-2 pl-2 pr-2 pt-2 pb-2  rounded-full cursor-pointer'>+</span></button>
                </div>
    );
}
export default IncrementDecrementNum