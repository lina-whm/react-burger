import clsx from 'clsx';
import { useState } from 'react';
import s from './app.module.scss';
import reactLogo from './assets/react.svg';
import { ReactComponent as TypescriptLogo } from './assets/typescript.svg';

export const App = () => {
	// const num = 0
	const [count, setCount] = useState(0);
	return (
		<div className='page'>
			<div className='logo-wrapper'>
				<a href='https://reactjs.org' target='_blank' rel='noreferrer'>
					<img
						src={reactLogo}
						className={clsx(s.logo, s.react)}
						alt='React logo'
					/>
				</a>
				<a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
					<TypescriptLogo className={s.logo} />
				</a>
			</div>
			<h1>React + TS</h1>
			<div className={s.card}>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
		</div>
	);
};
