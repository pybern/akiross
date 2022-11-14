import Image from "next/image";

import { Button } from "../components/Button";
import { Container } from "../components/Container";
import backgroundImage from "../public/background.jpg";
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative pt-10 pb-20 sm:py-24">
      <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50">
        <Image
          className="absolute top-0 left-0 translate-y-[-10%] translate-x-[-55%] -scale-x-100 sm:left-1/2 sm:translate-y-[-6%] sm:translate-x-[-98%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          src={backgroundImage}
          alt=""
          width={918}
          height={1495}
          priority
          unoptimized
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-3xl lg:px-12">
          <h1 className="font-display text-2xl font-bold tracking-tighter text-blue-600 sm:text-5xl">
            <span className="sr-only">DeceptiConf - </span>Speed & Scale
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-blue-900">
            <p>
              Next-generation technology built with analytics and performance in
              mind. This build provides automation, performance, speed and
              analytics at scale. Both the front and backend frameworks are
              designed to work seamlessly and performance focused. Connect and
              extend with best in class API connectors.
            </p>
          </div>

          <div className="mt-16 space-y-6 font-display tracking-tight text-blue-900">
            <p className="font-bold text-2xl ">Did you know?</p>
            <ul className="list-disc px-5 text-xl">
              <li>
                <b>53%</b>
                <span>
                  {" "}
                  of mobile website visitors leave a site if it takes more than
                  3 seconds to load
                </span>
              </li>
              <li>
                <b>25% higher viewability</b>
                <span>
                  {" "}
                  was observed for sites that loaded in 5 seconds instead of 19
                  seconds
                </span>
              </li>
              <li>
                <b>3 out of 4</b>
                <span> top mobile sites take more than</span>
                <b>10 seconds</b>
                <span> to load</span>
              </li>
              <li>
                <b>2x more revenue</b>
                <span>
                  {" "}
                  was observed for sites that loaded in 5 seconds instead of 19
                  seconds
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-16 font-display font-bold text-2xl tracking-tigh text-blue-900">
            <p>Analytics</p>
          </div>

          <dl className="mt-1 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-6 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ["Experience Score", "97: ~2X"],
              ["Loading time", "< 1 second"],
              ["Analytics", "Track vitals and audience"],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-blue-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-bold tracking-tight text-blue-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 flex justify-center">
            <Link href="/dashboard">
            <button
              type="button"
              className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
            >
              Launch!
            </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
