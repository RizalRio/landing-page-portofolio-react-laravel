export default function CardSimple({ data }: { data: { title: string; description: string; image: string } }) {
    return (
        <div className="bg-base-300 flex h-full flex-col rounded-lg p-8 transition duration-200 ease-in-out hover:scale-105 hover:shadow-md">
            <div className="mb-3 flex items-center">
                <div className="bg-accent text-accent-content mr-3 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule={'evenodd'} clipRule={'evenodd'} d={data.image} />
                    </svg>
                </div>
                <h2 className="title-font text-base-content text-lg font-medium">{data.title}</h2>
            </div>
            <div className="flex-grow">
                <p className="text-base-content leading-relaxed">{data.description}</p>
            </div>
        </div>
    );
}
