import { useState } from 'react'
import LoginModal from '@/components/LoginModal'
import TravelHeader from '@/components/TravelHeader'
import TravelServices from '@/components/TravelServices'
import FlightBookingForm from '@/components/FlightBookingForm'
import HotelBookingForm from '@/components/HotelBookingForm'
import HeroSection from '@/components/HeroSection'
import { VillaHomeSearchBar } from '@/components/VillaHomeSearchBar'

const flightOffers = [
	{
		title: '20% Off on Domestic Flights',
		description: 'Book now and save on all major airlines. Limited time offer!',
		code: 'FLY20',
		image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
	},
	{
		title: 'Student Special Fares',
		description: 'Extra baggage and discounts for students. Valid student ID required.',
		code: 'STUDENT600',
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
	},
	{
		title: 'Weekend Getaway Deals',
		description: 'Special prices for round-trip flights this weekend.',
		code: 'WEEKEND',
		image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
	},
]

const topHotels = [
	{
		name: 'The Taj Mahal Palace',
		location: 'Mumbai',
		description: 'Iconic luxury hotel with sea views and world-class amenities.',
		rating: 4.8,
		image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb21092?auto=format&fit=crop&w=400&q=80',
	},
	{
		name: 'Leela Palace',
		location: 'New Delhi',
		description: 'Elegant rooms, fine dining, and a central location.',
		rating: 4.7,
		image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80',
	},
	{
		name: 'Oberoi Udaivilas',
		location: 'Udaipur',
		description: 'Stunning lakeside property with royal architecture.',
		rating: 4.9,
		image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80',
	},
]

const villasAndHomestays = [
	{
		name: 'Casa Sol Villa',
		location: 'Goa, India',
		description: 'A luxury villa with private pool and garden, perfect for families and groups.',
		image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
		type: 'Villa',
	},
	{
		name: 'Mountain View Homestay',
		location: 'Manali, India',
		description: 'Cozy homestay with stunning mountain views and home-cooked meals.',
		image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
		type: 'Homestay',
	},
	{
		name: 'Beachfront Bliss',
		location: 'Alibaug, India',
		description: 'Modern villa right on the beach, with all amenities and beautiful sunsets.',
		image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
		type: 'Villa',
	},
	{
		name: 'Heritage Homestay',
		location: 'Jaipur, India',
		description: 'Experience royal living in this heritage homestay with traditional decor.',
		image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=400&q=80',
		type: 'Homestay',
	},
	{
		name: 'Forest Retreat Villa',
		location: 'Coorg, India',
		description: 'Secluded villa surrounded by lush forest, ideal for nature lovers.',
		image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
		type: 'Villa',
	},
]

const Index = () => {
	 const [activeService, setActiveService] = useState('Flights')
	 const [showExplore, setShowExplore] = useState(false)
	 const [showLogin, setShowLogin] = useState(false)
	 const [user, setUser] = useState(null)

		 // Dummy login/signup handlers (replace with backend API call)
		 const handleLogin = async (email, password) => {
			try {
				const response = await fetch('http://localhost:5000/api/users/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				});
				const data = await response.json();
				if (response.ok) {
					setUser({ email: data.email });
					setShowLogin(false);
				} else {
					alert(data.message);
				}
			} catch (error) {
				console.error('Login failed:', error);
				alert('Login failed. Please try again.');
			}
		};

		const handleSignup = async (name, email, password) => {
			try {
				const response = await fetch('http://localhost:5000/api/users/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ name, email, password }),
				});
				const data = await response.json();
				if (response.ok) {
					setUser({ email: data.email });
					setShowLogin(false);
				} else {
					alert(data.message);
				}
			} catch (error) {
				console.error('Signup failed:', error);
				alert('Signup failed. Please try again.');
			}
		};

		return (
					<div className="min-h-screen">
						 <LoginModal
							 isOpen={showLogin}
							 onClose={() => setShowLogin(false)}
							 onLogin={handleLogin}
							 onSignup={handleSignup}
						 />
						 <TravelHeader onLoginClick={() => setShowLogin(true)} user={user} />
						 <HeroSection />
			<section className="bg-gradient-to-br from-background to-muted/30 py-8">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<TravelServices activeService={activeService} setActiveService={setActiveService} />
						{activeService === 'Flights' && <FlightBookingForm />}
						{activeService === 'Hotels' && <HotelBookingForm />}
						{activeService === 'Homestays & Villas' && <VillaHomeSearchBar />}
						{/* Explore More Section */}
						{showExplore && (
							<div className="mt-8">
								{activeService === 'Flights' && (
									<div className="bg-card rounded-xl shadow p-6">
										<h2 className="text-xl font-bold mb-4 text-primary">Flight Offers</h2>
										<ul className="space-y-4">
											{flightOffers.map((offer, idx) => (
												<li key={idx} className="border-b pb-4 last:border-b-0 flex flex-col md:flex-row items-center gap-6">
													<img
														src={offer.image}
														alt={offer.title}
														className="w-32 h-24 object-cover rounded-lg shadow"
													/>
													<div className="flex-1 text-left">
														<div className="font-semibold text-lg">{offer.title}</div>
														<div className="text-muted-foreground mb-1">{offer.description}</div>
														<span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
															Use Code: {offer.code}
														</span>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
								{activeService === 'Hotels' && (
									<div className="bg-card rounded-xl shadow p-6">
										<h2 className="text-xl font-bold mb-4 text-primary">Top Hotels</h2>
										<ul className="space-y-4">
											{topHotels.map((hotel, idx) => (
												<li key={idx} className="border-b pb-4 last:border-b-0 flex flex-col md:flex-row items-center gap-6">
													<img
														src={hotel.image}
														alt={hotel.name}
														className="w-32 h-24 object-cover rounded-lg shadow"
													/>
													<div className="flex-1 text-left">
														<div className="font-semibold text-lg">{hotel.name}</div>
														<div className="text-muted-foreground mb-1">{hotel.location}</div>
														<div className="mb-1">{hotel.description}</div>
														<span className="inline-block bg-success/10 text-success px-2 py-1 rounded text-xs font-medium">
															Rating: {hotel.rating}
														</span>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
								{activeService === 'Homestays & Villas' && (
									<div className="bg-card rounded-xl shadow p-6">
										<h2 className="text-xl font-bold mb-4 text-primary">Beautiful Villas & Homestays</h2>
										<ul className="space-y-4">
											{villasAndHomestays.map((stay, idx) => (
												<li key={idx} className="border-b pb-4 last:border-b-0 flex flex-col md:flex-row items-center gap-6">
													<img
														src={stay.image}
														alt={stay.name}
														className="w-32 h-24 object-cover rounded-lg shadow"
													/>
													<div className="flex-1 text-left">
														<div className="font-semibold text-lg">{stay.name}</div>
														<div className="text-muted-foreground mb-1">{stay.location}</div>
														<div className="mb-1">{stay.description}</div>
														<span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
															{stay.type}
														</span>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						)}
						<div className="mt-8 text-center">
							<button
								className="px-6 py-2 rounded bg-gradient-primary text-primary-foreground font-semibold shadow hover:bg-primary-hover transition"
								onClick={() => setShowExplore((prev) => !prev)}
							>
								Explore More
							</button>
							<div className="text-xs text-muted-foreground mt-2">▼</div>
						</div>
					</div>
				</div>
			</section>
			{/* Why Choose BookKaroIndia Section */}
			<section className="bg-background py-16 mt-12">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Why Choose BookKaroIndia?</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
						<div>
							<div className="flex justify-center mb-4">
								<span className="text-5xl">✅</span>
							</div>
							<h3 className="text-xl font-semibold mb-2">Verified Experiences</h3>
							<p className="text-muted-foreground">All our experiences are verified and reviewed by our quality team</p>
						</div>
						<div>
							<div className="flex justify-center mb-4">
								<span className="text-5xl">👥</span>
							</div>
							<h3 className="text-xl font-semibold mb-2">Local Experts</h3>
							<p className="text-muted-foreground">Connect with authentic local guides who know the real India</p>
						</div>
						<div>
							<div className="flex justify-center mb-4">
								<span className="text-5xl">💰</span>
							</div>
							<h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
							<p className="text-muted-foreground">We guarantee the best prices with no hidden fees or charges</p>
						</div>
					</div>
				</div>
			</section>
			{/* Main Footer Section */}
			<footer className="bg-card border-t border-border pt-12 pb-4 mt-0">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
						<div>
							<div className="text-2xl font-bold mb-2">
								<span className="font-bold" style={{ color: '#ff8800' }}>BookKaro</span><span className="font-bold text-black">India</span>
							</div>
							<p className="text-muted-foreground mb-4">Discover the incredible diversity of India through authentic experiences. From adventure tours to cultural immersions, we connect you with unforgettable journeys.</p>
							<div className="space-y-2 text-muted-foreground text-sm">
								<div className="flex items-center gap-2"><span>📞</span> +91 98765 43210</div>
								<div className="flex items-center gap-2"><span>✉️</span> hello@bookkaroindia.com</div>
								<div className="flex items-center gap-2"><span>📍</span> Mumbai, Maharashtra, India</div>
							</div>
						</div>
						<div>
							<h4 className="font-semibold mb-3">Company</h4>
							<ul className="space-y-2 text-muted-foreground">
								<li>About Us</li>
								<li>How it Works</li>
								<li>Safety</li>
								<li>Trust & Safety</li>
								<li>Help Center</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-3">Experiences</h4>
							<ul className="space-y-2 text-muted-foreground">
								<li>Adventure Tours</li>
								<li>Cultural Experiences</li>
								<li>Wildlife Safaris</li>
								<li>Beach Activities</li>
								<li>Mountain Treks</li>
							</ul>
						</div>
						<div>
							<h4 className="font-semibold mb-3">Destinations</h4>
							<ul className="space-y-2 text-muted-foreground">
								<li>Goa</li>
								<li>Kerala</li>
								<li>Rajasthan</li>
								<li>Himachal Pradesh</li>
								<li>Tamil Nadu</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-border pt-8 mt-8 text-center">
						<h4 className="font-semibold mb-2">Stay Updated</h4>
						<p className="text-muted-foreground mb-4">Get the latest travel deals and destination guides delivered to your inbox.</p>
						<form className="flex justify-center items-center gap-2 max-w-md mx-auto mb-4">
							<input type="email" placeholder="Enter your email" className="border border-border rounded px-4 py-2 w-full" />
							<button type="submit" className="bg-primary text-white px-4 py-2 rounded font-semibold">Subscribe</button>
						</form>
						<div className="flex justify-center gap-6 text-2xl text-muted-foreground mb-4">
							<span>📘</span>
							<span>🐦</span>
							<span>📸</span>
							<span>▶️</span>
						</div>
						<div className="flex justify-center gap-6 text-sm text-muted-foreground mb-2">
							<span>Privacy Policy</span>
							<span>Terms of Service</span>
						</div>
						<div className="text-xs text-muted-foreground">© 2024 BookKaroIndia. All rights reserved.</div>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Index
