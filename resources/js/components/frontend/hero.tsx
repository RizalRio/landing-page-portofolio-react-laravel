export default function Hero() {
    return (
        <section className="body-font bg-base-100 px-10" id="hero">
            <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
                <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
                    <h1 className="title-font text-primary mb-4 text-3xl font-medium sm:text-4xl">
                        Membuat website yang bagus <br />
                        bukan hanya soal tampilan
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        Kami percaya bahwa website yang bagus bukan hanya soal tampilan yang menarik, tapi juga soal kemampuan untuk meningkatkan
                        bisnis Anda. Kami siap membantu Anda membuat website yang sesuai dengan kebutuhan bisnis Anda.
                    </p>
                    <div className="flex justify-center">
                        <button className="btn btn-lg btn-primary inline-flex">Konsultasi Sekarang</button>
                    </div>
                </div>
                <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
                    <img
                        className="rounded object-cover object-center"
                        alt="hero"
                        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=720&q=80"
                    />
                </div>
            </div>
        </section>
    );
}
