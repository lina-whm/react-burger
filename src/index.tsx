import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './services/store/store'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<InitialLoader />
	</React.StrictMode>
)

function InitialLoader() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 800)
		return () => clearTimeout(timer)
	}, [])

	if (isLoading) {
		return (
			<div style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #0f0f1a 100%)',
				zIndex: 9999,
				overflow: 'hidden',
			}}>
				<svg width="200" height="200" viewBox="0 0 200 200">
					<defs>
						<radialGradient id="planet" cx="30%" cy="30%">
							<stop offset="0%" stopColor="#7c4dff"/>
							<stop offset="100%" stopColor="#311b92"/>
						</radialGradient>
						<radialGradient id="ring" cx="50%" cy="50%">
							<stop offset="0%" stopColor="#b388ff" stopOpacity="0.8"/>
							<stop offset="100%" stopColor="#7c4dff" stopOpacity="0.3"/>
						</radialGradient>
					</defs>
					
					<circle cx="100" cy="100" r="2" fill="#fff">
						<animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
					</circle>
					<circle cx="30" cy="50" r="1" fill="#fff">
						<animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
					</circle>
					<circle cx="170" cy="40" r="1.5" fill="#fff">
						<animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/>
					</circle>
					<circle cx="150" cy="170" r="1" fill="#fff">
						<animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite"/>
					</circle>
					<circle cx="25" cy="160" r="1.2" fill="#fff">
						<animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.3s" repeatCount="indefinite"/>
					</circle>
					<circle cx="80" cy="25" r="0.8" fill="#fff">
						<animate attributeName="opacity" values="0.4;1;0.4" dur="1.7s" repeatCount="indefinite"/>
					</circle>
					
					<ellipse cx="100" cy="100" rx="50" ry="18" fill="none" stroke="url(#ring)" strokeWidth="8" transform="rotate(-25 100 100)">
						<animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
					</ellipse>
					
					<circle cx="100" cy="100" r="55" fill="url(#planet)">
						<animate attributeName="r" values="55;58;55" dur="2s" repeatCount="indefinite"/>
					</circle>
					<ellipse cx="75" cy="85" rx="15" ry="8" fill="#5e35b1" opacity="0.3"/>
				</svg>
				<p style={{ 
					marginTop: 32, 
					color: '#b388ff', 
					fontFamily: 'JetBrains Mono, monospace', 
					fontSize: 18,
					letterSpacing: 4,
					textTransform: 'uppercase',
				}}>
					Stellar Burgers
				</p>
				<p style={{ 
					marginTop: 8, 
					color: '#673ab7', 
					fontFamily: 'JetBrains Mono, monospace', 
					fontSize: 12,
					letterSpacing: 2,
				}}>
					Загрузка вселенной...
				</p>
			</div>
		)
	}

	return (
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	)
}
