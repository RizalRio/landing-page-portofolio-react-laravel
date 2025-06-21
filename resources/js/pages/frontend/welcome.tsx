import CardSimple from '@/components/frontend/card-simple';
import Hero from '@/components/frontend/hero';
import MasterLayout from '@/layouts/frontend/master-layout';
import SectionLayout from '@/layouts/frontend/section-layout';

import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({ features, posts }: { features: SharedData; posts: SharedData }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome" />
            <MasterLayout>
                <Hero></Hero>
                <section className="body-font bg-base-300 px-12" id="stats">
                    <SectionLayout>
                        <div className="-m-4 flex flex-wrap text-center">
                            <div className="w-1/2 p-4 sm:w-1/4">
                                <h2 className="title-font text-primary text-3xl font-medium sm:text-4xl">4</h2>
                                <p className="leading-relaxed">Website</p>
                            </div>
                            <div className="w-1/2 p-4 sm:w-1/4">
                                <h2 className="title-font text-primary text-3xl font-medium sm:text-4xl">2</h2>
                                <p className="leading-relaxed">Puas</p>
                            </div>
                            <div className="w-1/2 p-4 sm:w-1/4">
                                <h2 className="title-font text-primary text-3xl font-medium sm:text-4xl">1+</h2>
                                <p className="leading-relaxed">Tahun</p>
                            </div>
                            <div className="w-1/2 p-4 sm:w-1/4">
                                <h2 className="title-font text-primary text-3xl font-medium sm:text-4xl">24/7</h2>
                                <p className="leading-relaxed">Support</p>
                            </div>
                        </div>
                    </SectionLayout>
                </section>
                <section className="body-font bg-base-100 px-12" id="features">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-col text-center">
                            <h2 className="title-font text-primary mb-1 text-xs font-medium tracking-widest">KENAPA MEMILIH KAMI?</h2>
                            <h1 className="title-font mb-4 text-2xl font-medium sm:text-3xl">Website Hebat Adalah Investasi Masa Depan</h1>
                            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                                Kami tidak hanya menciptakan website yang memukau, tetapi juga membangun fondasi digital untuk pertumbuhan bisnis
                                Anda. Dengan desain yang menarik dan fitur yang tepat sasaran, kami membantu Anda mengubah pengunjung menjadi
                                pelanggan setia.
                            </p>
                        </div>
                        <div className="-mx-4 -mt-4 -mb-10 flex flex-wrap space-y-6 sm:-m-4 md:space-y-0">
                            {features.map((feature, index) => (
                                <div className="p-4 md:w-1/3">
                                    <CardSimple
                                        key={index}
                                        data={{
                                            title: feature.title,
                                            description: feature.description,
                                            image: feature.image,
                                        }}
                                    ></CardSimple>
                                </div>
                            ))}
                        </div>
                    </SectionLayout>
                </section>
                <section className="body-font bg-primary px-12" id="cta">
                    <SectionLayout>
                        <div className="mx-auto flex flex-col items-start sm:flex-row sm:items-center lg:w-2/3">
                            <h1 className="title-font text-primary-accent flex-grow text-2xl font-medium sm:pr-16">
                                Slow-carb next level shoindxgoitch ethical authentic, scenester sriracha forage.
                            </h1>
                            <button className="btn btn-accent mt-10 w-50 flex-shrink-0">Button</button>
                        </div>
                    </SectionLayout>
                </section>
                <section className="body-font bg-base-100 px-12" id="portofolio">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-wrap">
                            <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
                                <h2 className="title-font text-primary mb-1 text-xs font-medium tracking-widest">ROOF PARTY POLAROID</h2>
                                <h1 className="title-font mb-2 text-2xl font-medium sm:text-3xl">Pitchfork Kickstarter Taxidermy</h1>
                                <div className="bg-primary h-1 w-20 rounded"></div>
                            </div>
                            <p className="w-full text-base leading-relaxed lg:w-1/2">
                                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you
                                probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.
                            </p>
                        </div>
                        <div className="-m-4 flex flex-wrap">
                            <div className="p-4 md:w-1/2 xl:w-1/4">
                                <div className="bg-base-300 rounded-lg p-6">
                                    <img
                                        className="mb-6 h-40 w-full rounded object-cover object-center"
                                        src="https://dummyimage.com/720x400"
                                        alt="content"
                                    />
                                    <h2 className="title-font text-primary mb-4 text-lg font-medium">Chichen Itza</h2>
                                    <p className="text-base leading-relaxed">
                                        Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SectionLayout>
                </section>
                <section className="body-font bg-base-100 overflow-hidden px-12" id="pricing">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-col text-center">
                            <h2 className="title-font text-primary mb-1 text-xs font-medium tracking-widest">ROOF PARTY POLAROID</h2>
                            <h1 className="title-font mb-2 text-3xl font-medium sm:text-4xl">Pricing</h1>
                            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.
                            </p>
                        </div>
                        <div className="-m-4 flex flex-wrap">
                            <div className="bg-base-300 w-full rounded-lg p-4 md:w-1/2 xl:w-1/4">
                                <div className="relative flex h-full flex-col overflow-hidden p-6">
                                    <h2 className="title-font text-primary mb-1 text-sm font-medium tracking-widest">START</h2>
                                    <h1 className="mb-4 border-b border-gray-800 pb-4 text-5xl leading-none">Free</h1>
                                    <p className="my-3 flex items-center">
                                        <span className="bg-accent text-accent-content mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Vexillologist pitchfork
                                    </p>
                                    <p className="my-3 flex items-center">
                                        <span className="bg-accent text-accent-content mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Vexillologist pitchfork
                                    </p>
                                    <p className="my-3 flex items-center">
                                        <span className="bg-accent text-accent-content mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Vexillologist pitchfork
                                    </p>
                                    <div className="mt-6">
                                        <button className="btn btn-secondary mt-auto flex w-full items-center rounded border-0">
                                            Button
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="ml-auto h-4 w-4"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                        <p className="mt-3 text-xs text-gray-400">Literally you probably haven't heard of them jean shorts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionLayout>
                </section>
                <section className="body-font bg-base-300 overflow-hidden px-12" id="blog">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-wrap">
                            <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
                                <h2 className="title-font text-primary mb-1 text-xs font-medium tracking-widest">ROOF PARTY POLAROID</h2>
                                <h1 className="title-font mb-2 text-2xl font-medium sm:text-3xl">Pitchfork Kickstarter Taxidermy</h1>
                                <div className="bg-primary h-1 w-20 rounded"></div>
                            </div>
                        </div>
                        <div className="-my-8 divide-y-2 divide-gray-700">
                            {posts.map((post, index) => (
                                <div key={post.id} className="flex flex-wrap py-8 md:flex-nowrap">
                                    <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
                                        <span className="title-font text-secondary font-semibold">TIPS & TRIK</span>
                                        <span className="mt-1 text-sm text-gray-400">
                                            {new Date(post.published_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="md:flex-grow">
                                        <h2 className="title-font mb-2 text-2xl font-medium">{post.title}</h2>
                                        <p className="leading-relaxed">{post.excerpt}</p>
                                        <Link href={`/blog/${post.slug}`} className="text-accent mt-4 inline-flex items-center">
                                            Baca Selengkapnya
                                            <svg
                                                className="ml-2 h-4 w-4"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionLayout>
                </section>
                <section className="body-font bg-base-100 px-12" id="team">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-col text-center">
                            <h2 className="title-font text-primary mb-1 text-xs font-medium tracking-widest">ROOF PARTY POLAROID</h2>
                            <h1 className="title-font mb-4 text-2xl font-medium sm:text-3xl">Master Cleanse Reliac Heirloom</h1>
                            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you
                                probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.
                            </p>
                        </div>
                        <div className="-m-4 flex flex-wrap">
                            <div className="bg-base-300 rounded-lg p-8 lg:w-1/2">
                                <div className="flex h-full flex-col items-center justify-center text-center sm:flex-row sm:justify-start sm:text-left">
                                    <img
                                        alt="team"
                                        className="mb-4 h-48 w-48 flex-shrink-0 rounded-lg object-cover object-center sm:mb-0"
                                        src="https://dummyimage.com/200x200"
                                    />
                                    <div className="flex-grow sm:pl-8">
                                        <h2 className="title-font text-secondary text-lg font-medium">Holden Caulfield</h2>
                                        <h3 className="mb-3">UI Developer</h3>
                                        <p className="mb-4 font-light">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                        <span className="inline-flex">
                                            <a className="text-gray-500 transition duration-200 ease-in-out hover:text-white">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-3 text-gray-500 transition duration-200 ease-in-out hover:text-white">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-3 text-gray-500 transition duration-200 ease-in-out hover:text-white">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                </svg>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionLayout>
                </section>
                <section className="body-font bg-base-200 relative px-12" id="contact">
                    <div className="container mx-auto flex flex-wrap px-5 py-24 sm:flex-nowrap">
                        <div className="bg-base-300 relative flex items-end justify-start overflow-hidden rounded-lg p-10 sm:mr-10 md:w-1/2 lg:w-2/3">
                            <iframe
                                width="100%"
                                height="100%"
                                title="map"
                                className="absolute inset-0"
                                frameBorder="0"
                                marginHeight={0}
                                marginWidth={0}
                                scrolling="no"
                                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                                style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.45)' }}
                            ></iframe>
                            <div className="bg-base-300 relative flex flex-wrap rounded py-6 shadow-md">
                                <div className="px-6 lg:w-1/2">
                                    <h2 className="title-font text-xs font-semibold tracking-widest">ADDRESS</h2>
                                    <p className="mt-1 font-thin">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                                </div>
                                <div className="mt-4 px-6 lg:mt-0 lg:w-1/2">
                                    <h2 className="title-font text-xs font-semibold tracking-widest">EMAIL</h2>
                                    <a className="text-primary leading-relaxed">example@email.com</a>
                                    <h2 className="title-font mt-4 text-xs font-semibold tracking-widest">PHONE</h2>
                                    <p className="leading-relaxed font-thin">123-456-7890</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex w-full flex-col md:mt-0 md:ml-auto md:w-1/2 md:py-8 lg:w-1/3">
                            <h2 className="title-font mb-1 text-lg font-medium">Feedback</h2>
                            <p className="mb-5 leading-relaxed font-light">Post-ironic portland shabby chic echo park, banjo fashion axe</p>
                            <div className="relative mb-4">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm">Nama Lengkap</legend>
                                    <input type="text" id="name" name="name" className="input w-full" />
                                </fieldset>
                            </div>
                            <div className="relative mb-4">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm">Email</legend>
                                    <input type="text" id="email" name="email" className="input w-full" />
                                </fieldset>
                            </div>
                            <div className="relative mb-4">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm">Pesan</legend>
                                    <textarea className="textarea h-24 w-full" id="message" name="message"></textarea>
                                </fieldset>
                            </div>
                            <button className="btn btn-primary">Button</button>
                            <p className="text-opacity-90 mt-3 text-xs text-gray-400">
                                Chicharrones blog helvetica normcore iceland tousled brook viral artisan.
                            </p>
                        </div>
                    </div>
                </section>
                {/* <section className="body-font bg-base-200 px-12" id="testimonials">
                <div className="container mx-auto px-5 py-24">
                    <div className="-m-4 flex flex-wrap">
                        <div className="mb-6 p-4 lg:mb-0 lg:w-1/3">
                            <div className="h-full text-center">
                                <img
                                    alt="testimonial"
                                    className="bg-opacity-10 mb-8 inline-block h-20 w-20 rounded-full border-2 border-gray-800 bg-gray-800 object-cover object-center"
                                    src="https://dummyimage.com/302x302"
                                />
                                <p className="leading-relaxed">
                                    Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk.
                                    Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack
                                    vaporware.
                                </p>
                                <span className="text-primary mt-6 mb-4 inline-block h-1 w-10 rounded"></span>
                                <h2 className="title-font text-sm font-medium tracking-wider">HOLDEN CAULFIELD</h2>
                                <p className="text-info">Senior Product Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            </MasterLayout>
        </>
    );
}
