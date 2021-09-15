import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormHelperText } from '@material-ui/core';
import clsx from 'clsx';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'flex',
		padding: '20px',
	},
	bigFont: {
		fontSize: '1.85rem',
	},
	radios: {
		flexDirection: 'row',
	},
	disabled: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	icon: {
		borderRadius: '50%',
		width: 16,
		height: 16,
		boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
		backgroundColor: '#f5f8fa',
		backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
		'$root.Mui-focusVisible &': {
			outline: '2px auto rgba(19,124,189,.6)',
			outlineOffset: 2,
		},
		'input:hover ~ &': {
			backgroundColor: '#ebf1f5',
		},
		'input:disabled ~ &': {
			boxShadow: 'none',
			background: 'rgba(206,217,224,.5)',
		},
	},
	checkedIcon: {
		backgroundColor: '#137cbd',
		backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
		'&:before': {
			display: 'block',
			width: 16,
			height: 16,
			backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
			content: '""',
		},
		'input:hover ~ &': {
			backgroundColor: '#106ba3',
		},
	},
}));

const SearchForm = () => {
	const classes = useStyles();
	const [value, setValue] = useState('none');

	const handleRadioChange = (event) => {
		setValue(event.target.value);
	};

	function StyledRadio(props) {
		const classes = useStyles();

		return <Radio className={classes.disabled} disableRipple color="default" checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />} icon={<span className={classes.icon} />} {...props} />;
	}

	return (
		<>
			<FormControl className={classes.root}>
				<Input placeholder="🔍 Search our incredible users" inputProps={{ 'aria-label': 'description' }} className={classes.bigFont} />
				<FormHelperText id="my-helper-text">Optional search filtered by :</FormHelperText>
				<RadioGroup aria-label="search-by" name="search-radio" value={value} onChange={handleRadioChange} className={classes.radios}>
					<FormControlLabel value="goals" control={<Checkbox />} label="Goals" />
					<FormControlLabel value="experience" control={<Checkbox />} label="Experience" />
					<FormControlLabel value="radius" control={<Checkbox />} label="Radius" />
				</RadioGroup>
			</FormControl>
		</>
	);
};

export default SearchForm;
