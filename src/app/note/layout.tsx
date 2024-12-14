export default function Notelayout({children} : {children :React.ReactNode;}) {
    return(
        <div className="bg-background bg-cover text-white h-screen flex flex-col justify-center items-center min-w-[630px]">
            {children}
        </div>
    )
}