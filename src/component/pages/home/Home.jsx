import React from 'react'
import Navbar from '../navbar/Navbar'
import Hero from '../../ui/hero/Hero'
import About from '../../ui/about/About'
import Testimonials from '../../ui/Testimonial/Testimonials'
import Footer from '../../ui/footer/Footer'
import Gallery from '../../ui/gallery/Gallery'
import FaqSection from '../../ui/faq/FaqSection'
import MarbleCollections from '../../ui/collection/MarbleCollections'
import ExoticGraniteCollection from '../../ui/collection/ExoticGraniteCollection'
import CounterTops from '../../ui/countertops/CounterTops'

const Home = () => {
  return (
    <div className='mt-16'>
	<Hero />
	<About />
	<MarbleCollections />
	<ExoticGraniteCollection />
	<CounterTops />
	<Gallery />
	<Testimonials />
	<FaqSection />
    </div>
  )
}

export default Home